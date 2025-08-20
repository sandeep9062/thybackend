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
export const sendConsultationEmail = async ({
  name,
  email,
  phone,
  address,
  description,
}) => {
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

export const sendReferralEmail = async ({
  referrerEmail,
  friendEmail,
  referralCode,
}) => {
  try {
    const mailOptions = {
      from: `"Referral Program" <${process.env.GMAIL_USER}>`,
      to: friendEmail,
      subject: "🎉 You’ve Been Invited to Join!",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
            
            <div style="background: linear-gradient(135deg,#007bff,#0056d2); padding: 20px; text-align: center; color: #fff;">
              <h1 style="margin: 0; font-size: 24px;">🚀 You've Been Referred!</h1>
            </div>
            
            <div style="padding: 25px; color: #333; line-height: 1.6;">
              <p style="font-size: 16px;">Hi there,</p>
              <p style="font-size: 16px;">
                Your friend <strong style="color:#007bff;">${referrerEmail}</strong> has invited you to join our platform.  
              </p>
              
              <p style="font-size: 16px;">
                Use the referral code below during sign-up to unlock your rewards:
              </p>
              
              <div style="text-align: center; margin: 20px 0;">
                <span style="display: inline-block; background: #f3f4f6; border: 2px dashed #007bff; padding: 12px 24px; font-size: 20px; font-weight: bold; border-radius: 6px; letter-spacing: 2px; color:#007bff;">
                  ${referralCode}
                </span>
              </div>
              
              <p style="font-size: 16px; text-align:center;">
                Click below to join and start your journey:
              </p>
              
              <div style="text-align: center; margin-top: 20px;">
                <a href="${process.env.CLIENT_URL}/signup?ref=${referralCode}"
                   style="background: #007bff; color: #fff; padding: 14px 24px; font-size: 16px; text-decoration: none; border-radius: 6px; font-weight: bold; display:inline-block;">
                   ✨ Join Now
                </a>
              </div>
            </div>
            
            <div style="background: #f3f4f6; text-align: center; padding: 15px; font-size: 12px; color: #555;">
              <p style="margin: 0;">You received this email because your friend referred you. If this wasn’t you, you can safely ignore it.</p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Referral email sent");
  } catch (err) {
    console.error("❌ Referral Email Error:", err);
  }
};
