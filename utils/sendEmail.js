// utils/sendEmail.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// ✅ Create reusable transporter (Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // e.g. aarogyamcentre1@gmail.com
    pass: process.env.GMAIL_PASS, // your 16-char App Password
  },
});

// ✅ Send consultation email to site owner
export const sendConsultationEmail = async ({ name, email, phone, address, description }) => {
  try {
    const mailOptions = {
      from: `"Consultation Booking" <${process.env.GMAIL_USER}>`,
      to: process.env.OWNER_RECEIVER_EMAIL, // site owner’s email
      subject: "New Consultation Booking",
      html: `
        <h2>New Consultation Submitted</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Description:</strong> ${description}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Consultation email sent");
  } catch (err) {
    console.error("❌ Consultation Email Error:", err);
  }
};

// ✅ Send referral invite email to friend
export const sendReferralEmail = async ({ referrerEmail, friendEmail, referralCode }) => {
  try {
    const mailOptions = {
      from: `"Referral Program" <${process.env.GMAIL_USER}>`,
      to: friendEmail,
      subject: "You’ve Been Invited!",
      html: `
        <h2>You've Been Referred!</h2>
        <p>Your friend <strong>${referrerEmail}</strong> has invited you to join our platform.</p>
        <p>Use this referral code when signing up: <strong>${referralCode}</strong></p>
        <p>Click below to get started:</p>
        <a href="${process.env.CLIENT_URL}/signup?ref=${referralCode}"
           style="display:inline-block;padding:10px 15px;background:#007bff;color:#fff;text-decoration:none;border-radius:4px;">
           Join Now
        </a>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Referral email sent");
  } catch (err) {
    console.error("❌ Referral Email Error:", err);
  }
};
