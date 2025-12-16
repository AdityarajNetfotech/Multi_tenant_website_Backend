import Ticket from "../models/Ticket.js";
import axios from "axios";

export const receiveTicket = async (req, res) => {
  try {
    const { adminId, adminName, adminEmail, subject, message } = req.body;

    const ticket = await Ticket.create({
      adminId,
      adminName,
      adminEmail,
      subject,
      message
    });

    res.status(201).json({
      message: "Ticket received successfully",
      ticket
    });

  } catch (error) {
    res.status(500).json({ message: "Error receiving ticket", error: error.message });
  }
};


export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tickets" });
  }
};


export const receiveAdminReply = async (req, res) => {
  try {
    const { ticketId, reply } = req.body;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.replies.push(reply);
    await ticket.save();

    res.status(200).json({
      message: "Reply synced successfully",
      ticket
    });

  } catch (error) {
    res.status(500).json({ message: "Error syncing admin reply", error: error.message });
  }
};


export const replyToTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { message } = req.body;

    // 1️⃣ Save in superadmin DB
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    const reply = {
      by: "superadmin",
      message,
      timestamp: new Date()
    };

    ticket.replies.push(reply);
    await ticket.save();

    // 2️⃣ Send reply to admin backend
    await axios.post(
      "http://localhost:4000/api/tickets/receive-superadmin-reply",
      {
        ticketId,
        reply
      }
    );

    res.status(200).json({
      message: "Reply added successfully",
      ticket
    });

  } catch (error) {
    res.status(500).json({
      message: "Error sending reply",
      error: error.message
    });
  }
};
