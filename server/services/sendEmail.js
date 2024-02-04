import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_ACCOUNT,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export const sendOtpToEmail = async (email, otp) => {
  const mailOptions = {
    from: '"Exclusive-shop 👻" <exclusive-shop99@gmail.com>',
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP for password reset is`,
    html: `<h1>${otp}</h1>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Failed to send email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

export const sendEmailCompletePurchase = async (orderItems, email, total) => {
  const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            margin: 20px;
          }

          h2 {
            color: #4CAF50;
          }

          ul {
            list-style-type: none;
            padding: 0;
          }

          li {
            margin-bottom: 10px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
            display: flex;
            align-items: center;
          }

          img {
            margin-right: 10px;
          }

          p {
            line-height: 1.6;
          }

          strong {
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <h1>Thank you for your purchase!</h1>
        <p>Hello, We are thrilled to let you know that your order has been successfully placed. Below are the details of your purchase:</p>
        
        <ul>
          ${orderItems
            .map(
              (item) => `
            <li>
              <img src="${item?.image}" alt="${item?.name}" style="max-width: 100px; max-height: 100px;">
              <strong>${item?.name} - $${item?.price}</strong> 
            </li>
          `
            )
            .join("")}
        </ul>

        <h2>Total: $${total}</h2>
        
        <p>Thank you for choosing our products. If you have any questions or concerns, feel free to contact us.</p>
        
        <p>Best Regards,<br>Your E-Commerce Shop Team</p>
      </body>
    </html>
  `;

  await transporter.sendMail({
    from: '"Fred Foo 👻" <shop-e-commerce@gmail.com>',
    to: email,
    subject: "Order Confirmation",
    text: "Thank you for your purchase! Your order details are attached.",
    html: htmlContent,
  });
};
