// controllers/superAdmin.controller.js
import jwt from "jsonwebtoken";
import SuperAdmin from "../models/superAdmin.model.js";

const signToken = (id) => {
  return jwt.sign({ id, role: "superadmin" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register SuperAdmin
export const registerSuperAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newAdmin = await SuperAdmin.create({ name, email, password });

    const token = signToken(newAdmin._id);

    res.status(201).json({
      status: "success",
      token,
      data: { id: newAdmin._id, name: newAdmin.name, email: newAdmin.email },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// Login SuperAdmin
export const loginSuperAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await SuperAdmin.findOne({ email }).select("+password");
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const correct = await admin.correctPassword(password, admin.password);
    if (!correct)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = signToken(admin._id);

    res.status(200).json({
      status: "success",
      token,
      data: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
