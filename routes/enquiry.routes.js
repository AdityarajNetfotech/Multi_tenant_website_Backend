// routes/enquiry.routes.js
import express from "express";
import {
  createEnquiry,
  getAllEnquiries
} from "../controllers/enquiry.controller.js";

import { protect, superAdminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

// User can submit enquiry
router.post("/submit", createEnquiry);

// Admin can view all enquiries
router.get("/all", protect, superAdminOnly, getAllEnquiries);

export default router;
