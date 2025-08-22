// utils/sendOrderEmail.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // or smtp config
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

/**
 * Send styled order emails to both customer & owner
 */
export async function sendOrderEmail({ order, ownerEmail }) {
  const { email, fullName, totalAmount, items, appointmentDate, appointmentTime } = order;

  // Format items
  const itemsHtml = items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px;border:1px solid #eee;">${item.name}</td>
          <td style="padding:8px;border:1px solid #eee;">${item.quantity}</td>
          <td style="padding:8px;border:1px solid #eee;">₹${item.price}</td>
        </tr>
      `
    )
    .join("");

  // Common styled HTML
  const htmlContent = (recipientType) => `
  <div style="font-family: Arial, sans-serif; color: #333; line-height:1.5;">
    <h2 style="background:#007BFF;color:#fff;padding:15px;border-radius:5px;">
      ${recipientType === "user" ? "Order Confirmation" : "New Order Received"}
    </h2>
    <p>Hi ${recipientType === "user" ? fullName : "Admin"},</p>
    <p>
      ${recipientType === "user"
        ? "Thank you for your order! Here are your details:"
        : "A new order has been placed on your platform."}
    </p>
    <h3>Order Summary</h3>
    <table style="border-collapse: collapse; width:100%;margin-bottom:20px;">
      <thead>
        <tr>
          <th style="padding:8px;border:1px solid #eee;background:#f7f7f7;">Item</th>
          <th style="padding:8px;border:1px solid #eee;background:#f7f7f7;">Qty</th>
          <th style="padding:8px;border:1px solid #eee;background:#f7f7f7;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>
    <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
    <p><strong>Appointment Date:</strong> ${appointmentDate || "N/A"}</p>
    <p><strong>Appointment Time:</strong> ${appointmentTime || "N/A"}</p>
    
    <br/>
    <p style="font-size:13px;color:#777;">
      ${recipientType === "user"
        ? "Our team will contact you soon for confirmation."
        : "Please check the admin dashboard for full details."}
    </p>
  </div>
  `;

  // Send to customer
  await transporter.sendMail({
    from: `"MyApp Orders" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Your Order Confirmation",
    html: htmlContent("user"),
  });

  // Send to owner
  await transporter.sendMail({
    from: `"MyApp Orders" <${process.env.GMAIL_USER}>`,
    to: ownerEmail,
    subject: "New Order Received",
    html: htmlContent("owner"),
  });
}
