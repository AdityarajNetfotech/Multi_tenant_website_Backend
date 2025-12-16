// routes/superAdmin.routes.js
import express from "express";
import {
  registerSuperAdmin,
  loginSuperAdmin,
  getSuperAdminProfile,
  deleteSuperAdmin,
  updateSuperAdminProfile  
} from "../controllers/superAdmin.controller.js";

import {
  protect,
  superAdminOnly
} from "../middleware/auth.middleware.js";

const router = express.Router();

// Public Routes
router.post("/register", registerSuperAdmin);
router.post("/login", loginSuperAdmin);

// Protected SuperAdmin Route
router.get("/dashboard", protect, superAdminOnly, (req, res) => {
  res.json({ message: "Welcome SuperAdmin Dashboard!" });
});

router.get("/profile", protect, superAdminOnly, getSuperAdminProfile);
router.get("delete-superadmin", protect, superAdminOnly, deleteSuperAdmin);
router.put("update-superadmin", protect, superAdminOnly, updateSuperAdminProfile);
export default router;
