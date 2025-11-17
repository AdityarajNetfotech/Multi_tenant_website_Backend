// routes/superAdmin.routes.js
import express from "express";
import {
  registerSuperAdmin,
  loginSuperAdmin
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

export default router;
