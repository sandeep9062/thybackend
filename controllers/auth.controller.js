import crypto from "crypto";
import User from "../models/User.js";
import { sendResetEmail } from "../utils/sendResetEmail.js";

// Forgot Password → Generate reset token & send email
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate reset token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 15 * 60 * 1000; // 15 minutes

    user.resetToken = token;
    user.resetTokenExpiry = expires;
    await user.save();

    // Send reset email
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    const emailSent = await sendResetEmail(user.email, resetLink);

    if (!emailSent) {
      return res.status(500).json({ message: "Failed to send email" });
    }

    return res.status(200).json({ message: "Reset email sent successfully" });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Reset Password → Verify token & update password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }, // check expiry
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    // Update password (will trigger bcrypt hashing in pre-save hook)
    user.password = newPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
