// controllers/enquiry.controller.js
import Enquiry from "../models/enquiry.model.js";
import nodemailer from "nodemailer";

// ---- Nodemailer Transport ----
const transporter = nodemailer.createTransport({
  host: "gmail",
  port: 465,  
  secure: true,
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD
  }
});
// ---- Create Enquiry ----
export const createEnquiry = async (req, res) => {
  try {
    const { companyName, emailid, message, phone } = req.body;

    // Save to DB
    const newEnquiry = await Enquiry.create({
      companyName,
      emailid,
      message,
      phone
    });

    console.log("Email:", process.env.ADMIN_EMAIL);
console.log("Password:", process.env.ADMIN_EMAIL_PASSWORD ? "LOADED" : "NOT LOADED");


    // ---- Send Email to Admin ----
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL, // admin's email
      subject: "New Enquiry Received",
      html: `
        <h3>You have a new enquiry!</h3>
        <p><strong>Company Name:</strong> ${companyName}</p>
        <p><strong>Email ID:</strong> ${emailid}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      status: "success",
      message: "Enquiry submitted and email sent to admin.",
      data: newEnquiry
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
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
