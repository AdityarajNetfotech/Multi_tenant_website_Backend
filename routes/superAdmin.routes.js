// routes/superAdmin.routes.js
import express from "express";
import {
  registerSuperAdmin,
  loginSuperAdmin,
  getSuperAdminProfile,
  deleteSuperAdmin,
  updateSuperAdminProfile, 
  getallRegisteredAdmins,
  getCompanyForSync
} from "../controllers/superAdmin.controller.js";

import { receiveTicket, getAllTickets, replyToTicket, receiveAdminReply } from "../controllers/ticketController.js";

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
router.post("/receiveTickets", receiveTicket);
router.get("/allTickets",  getAllTickets);
router.post("/reply-to-ticket/:ticketId", replyToTicket);
router.post("/reply-from-admin", receiveAdminReply);
router.get("/getAllAdmins", getallRegisteredAdmins);
router.get(
  "/companies/:companyId", // optional
  getCompanyForSync
);


export default router;
