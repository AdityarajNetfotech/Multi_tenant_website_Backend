// middleware/auth.middleware.js
import jwt from "jsonwebtoken";
import SuperAdmin from "../models/superAdmin.model.js";

// Protect Route (JWT)
export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token)
      return res.status(401).json({ message: "Not logged in" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentAdmin = await SuperAdmin.findById(decoded.id);
    if (!currentAdmin)
      return res.status(401).json({ message: "User no longer exists" });

    req.user = currentAdmin;

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Only SuperAdmin Access
export const superAdminOnly = (req, res, next) => {
  if (req.user.role !== "superadmin") {
    return res.status(403).json({ message: "Access denied. SuperAdmin only." });
  }
  next();
};
