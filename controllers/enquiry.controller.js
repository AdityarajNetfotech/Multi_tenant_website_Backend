// controllers/enquiry.controller.js
import Enquiry from "../models/enquiry.model.js";
import nodemailer from "nodemailer";

// ---- Nodemailer Transport (Render Safe) ----
const createTransporter = () => {
  return nodemailer.createTransport({
   service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // APP PASSWORD
    },
  });
};

// ---- Create Enquiry ----
export const createEnquiry = async (req, res) => {
  try {
    const { companyName, emailid, message, phone } = req.body;

    // 1️⃣ Save enquiry to DB
    const newEnquiry = await Enquiry.create({
      companyName,
      emailid,
      message,
      phone,
    });

    // 2️⃣ Respond immediately (VERY IMPORTANT)
    res.status(201).json({
      status: "success",
      message: "Enquiry submitted successfully.",
      data: newEnquiry,
    });

    // 3️⃣ Send email in background (NON-BLOCKING)
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // admin email
      subject: "New Enquiry Received",
      html: `
        <h3>You have a new enquiry!</h3>
        <p><strong>Company Name:</strong> ${companyName}</p>
        <p><strong>Email ID:</strong> ${emailid}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    transporter
      .sendMail(mailOptions)
      .then(() => console.log("📧 Enquiry email sent"))
      .catch((err) =>
        console.error("❌ Enquiry email failed:", err.message)
      );

  } catch (err) {
    console.error("❌ Enquiry controller error:", err.message);

    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// ---- Get All Enquiries (Admin) ----
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      results: enquiries.length,
      data: enquiries
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};
