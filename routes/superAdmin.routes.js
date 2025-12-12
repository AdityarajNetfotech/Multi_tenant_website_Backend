// routes/superAdmin.routes.js
import express from "express";
import {
  registerSuperAdmin,
  loginSuperAdmin,
  getallRegisteredAdmins
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

router.post("/receiveTickets", receiveTicket);
router.get("/allTickets",  getAllTickets);
router.post("/reply-to-ticket/:ticketId", replyToTicket);
router.post("/reply-from-admin", receiveAdminReply);
router.get("/getAllAdmins", getallRegisteredAdmins);


export default router;
