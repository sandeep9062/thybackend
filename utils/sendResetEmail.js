// utils/sendResetEmail.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// ✅ Create reusable transporter using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // your Gmail (e.g. aarogyamcentre1@gmail.com)
    pass: process.env.GMAIL_PASS, // your 16-character App Password
  },
});

// ✅ Send Reset Email
export const sendResetEmail = async (email, resetLink) => {
  try {
    const mailOptions = {
      from: `"Thyrocare" <${process.env.GMAIL_USER}>`, // must match authenticated Gmail
      to: email,
      subject: "Reset Your Password!",
      html: `
        <div style="font-family: sans-serif; padding: 10px;">
          <h2>Reset Password Request</h2>
          <p>Click the button below to reset your password:</p>
          <a href="${resetLink}" 
             style="display:inline-block;background:#000;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;">
             Reset Password
          </a>
          <p style="margin-top: 10px;">This link will expire in 15 minutes.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Reset email sent successfully!");
    return true;
  } catch (err) {
    console.error("❌ SendResetEmail error:", err);
    return false;
  }
};
