// models/superAdmin.model.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const superAdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false
    },
    role: {
      type: String,
      default: "superadmin"
    }
  },
  { timestamps: true }
);

// Hash password
superAdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
superAdminSchema.methods.correctPassword = function (candidate, actual) {
  return bcrypt.compare(candidate, actual);
};

export default mongoose.model("SuperAdmin", superAdminSchema);
