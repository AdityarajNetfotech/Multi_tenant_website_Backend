import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  companyType: { type: String, required: true },
  gstNumber: { type: String, required: true },
  typeOfStaffing: { type: String, enum: ["contract", "permanent", "both"], required: true },
  panNumber: { type: String, required: true },
  phoneNo: { type: String, required: true },
  numberOfEmployees: { type: Number, required: true },
  address1: { type: String, required: true },
  address2: { type: String, default: "" },
  city: { type: String, required: true },
  state: { type: String, required: true },
  logo: { type: String, default: "" }, 
});

export default mongoose.model("Company", CompanySchema);
