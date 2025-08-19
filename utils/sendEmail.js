// utils/sendEmail.js
import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Send consultation email to site owner
export const sendConsultationEmail = async ({ name, email, phone, address, description }) => {
  try {
    const { error } = await resend.emails.send({
      from: `Consultation Booking <${process.env.OWNER_EMAIL}>`,
      to: [process.env.OWNER_RECEIVER_EMAIL],
      subject: "New Consultation Booking",
      html: `
        <h2>New Consultation Submitted</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Description:</strong> ${description}</p>
      `,
    });

    if (error) console.error("Error sending consultation email:", error);
  } catch (err) {
    console.error("Consultation Email Exception:", err);
  }
};

// ✅ Send referral invite email to friend
export const sendReferralEmail = async ({ referrerEmail, friendEmail, referralCode }) => {
  try {
    const { error } = await resend.emails.send({
      from: `Referral Program <${process.env.OWNER_EMAIL}>`,
      to: [friendEmail],
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
    });

    if (error) console.error("Error sending referral email:", error);
  } catch (err) {
    console.error("Referral Email Exception:", err);
  }
};
