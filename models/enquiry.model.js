// models/enquiry.model.js
import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true
    },
    emailid: {
      type: String,
      required: true,
      lowercase: true
    },
    message: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);
