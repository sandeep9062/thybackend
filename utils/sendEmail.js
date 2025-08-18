import nodemailer from "nodemailer";

// ✅ Already working consultation mailer
export const sendConsultationEmail = async ({ name, email, phone, address, description }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.OWNER_EMAIL,
        pass: process.env.OWNER_EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Consultation Booking" <${process.env.OWNER_EMAIL}>`,
      to: process.env.OWNER_RECEIVER_EMAIL, // owner's email
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
  } catch (error) {
    console.error("Error sending consultation email:", error);
  }
};

// ✅ NEW: Referral invite mailer
export const sendReferralEmail = async ({ referrerEmail, friendEmail, referralCode }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.OWNER_EMAIL,
        pass: process.env.OWNER_EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Referral Program" <${process.env.OWNER_EMAIL}>`,
      to: friendEmail, // 👈 friend gets the mail
      subject: "You’ve Been Invited!",
      html: `
        <h2>You've Been Referred!</h2>
        <p>Your friend <strong>${referrerEmail}</strong> has invited you to join our platform.</p>
        <p>Use this referral code when signing up: <strong>${referralCode}</strong></p>
        <p>Click below to get started:</p>
        <a href="${process.env.CLIENT_URL || "http://localhost:3000"}/signup?ref=${referralCode}"
           style="display:inline-block;padding:10px 15px;background:#007bff;color:#fff;text-decoration:none;border-radius:4px;">
           Join Now
        </a>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending referral email:", error);
  }
};
