
const { prisma } = require("../lib/prisma.ts");

// Customer sends a message
const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {};

    if (
      typeof name !== "string" || !name.trim() ||
      typeof email !== "string" || !email.trim() ||
      typeof subject !== "string" || !subject.trim() ||
      typeof message !== "string" || !message.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, email, subject, and message are required.",
      });
    }

    const newMessage = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
      },
    });

    return res.status(201).json({
      success: true,
      message: "Your message has been sent successfully.",
      data: newMessage,
    });
  } catch (error) {
    console.error("Create contact message error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send your message.",
    });
  }
};

//get all messages by admin
const getMessages = async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    console.error("Get contact messages error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve contact messages.",
    });
  }
};

//mark as read

const markMessageAsRead = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid message ID.",
      });
    }

    const existingMessage = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!existingMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    const message = await prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    });

    return res.status(200).json({
      success: true,
      message: "Message marked as read.",
      data: message,
    });
  } catch (error) {
    console.error("Mark message as read error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to mark message as read.",
    });
  }
};

//reply message

const replyToMessage = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { reply } = req.body || {};

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid message ID.",
      });
    }

    if (typeof reply !== "string" || !reply.trim()) {
      return res.status(400).json({
        success: false,
        message: "Reply is required.",
      });
    }

    const existingMessage = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!existingMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    const updatedMessage = await prisma.contactMessage.update({
      where: { id },
      data: {
        reply: reply.trim(),
        repliedAt: new Date(),
        isRead: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Reply saved successfully.",
      data: updatedMessage,
    });
  } catch (error) {
    console.error("Reply to message error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save reply.",
    });
  }
};

//delete message

const deleteMessage = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid message ID.",
      });
    }

    const existingMessage = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!existingMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    await prisma.contactMessage.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Contact message deleted successfully.",
    });
  } catch (error) {
    console.error("Delete contact message error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete contact message.",
    });
  }
};


module.exports = {
  createMessage,
  getMessages,
  markMessageAsRead,
  replyToMessage,
  deleteMessage
};
