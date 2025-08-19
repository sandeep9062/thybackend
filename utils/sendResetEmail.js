// utils/sendResetEmail.js
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetEmail = async (email, resetLink) => {
  try {
    const { error } = await resend.emails.send({
      from: 'Thyrocare <noreply@thyrocare.com>',
      to: [email],
      subject: 'Reset Your Password!',
      html: `
        <div style="font-family: sans-serif; padding: 10px;">
          <h2>Reset Password Request</h2>
          <p>Click the button below to reset your password:</p>
          <a href="${resetLink}" style="display: inline-block; background: #000; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none;">Reset Password</a>
          <p style="margin-top: 10px;">This link will expire in 15 minutes.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Email send error:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('SendResetEmail exception:', err);
    return false;
  }
};
