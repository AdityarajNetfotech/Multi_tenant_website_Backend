import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    by: { type: String, enum: ["admin", "superadmin"], required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  },
  { _id: false }
);

const ticketSchema = new mongoose.Schema(
  {
    adminId: { type: String, required: true },
    adminName: { type: String, required: true },
    adminEmail: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved", "closed"],
      default: "open"
    },
    replies: [replySchema]
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);
