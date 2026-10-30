
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


// Retrieve all customer messages together with their reply history.
const getMessages = async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      // Show newest customer messages first.
      orderBy: {
        createdAt: "desc",
      },

      // Include all replies belonging to each message.
      include: {
        replies: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error("Get messages error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve messages.",
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
    const messageId = Number(req.params.id);
    const { reply } = req.body;

    // Validate the message ID.
    if (!Number.isInteger(messageId) || messageId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid message ID.",
      });
    }

    // Validate the reply content.
    if (!reply || !reply.trim()) {
      return res.status(400).json({
        success: false,
        message: "Reply cannot be empty.",
      });
    }

    // Check whether the original customer message exists.
    const existingMessage = await prisma.contactMessage.findUnique({
      where: { id: messageId },
    });

    if (!existingMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    // Save the new reply as a separate database record.
    const newReply = await prisma.contactReply.create({
      data: {
        messageId,
        reply: reply.trim(),
      },
    });

    // Mark the original customer message as read.
    await prisma.contactMessage.update({
      where: { id: messageId },
      data: { isRead: true },
    });

    return res.status(201).json({
      success: true,
      message: "Reply saved successfully.",
      reply: newReply,
    });
  } catch (error) {
    console.error("Reply error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to save reply.",
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

//get restaurant contact details
const getContactDetails = async (req, res) => {
  try {
    const details = await prisma.contactDetails.findFirst({
      orderBy: { id: "asc" },
    });

    if (!details) {
      return res.status(404).json({
        success: false,
        message: "Restaurant contact details have not been configured yet.",
      });
    }

    return res.status(200).json({
      success: true,
      details,
    });
  } catch (error) {
    console.error("Get contact details error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve restaurant contact details.",
    });
  }
};

//update contact details
const updateContactDetails = async (req, res) => {
  try {
    const {
      address,
      phone,
      email,
      googleMapsLocation,
    } = req.body || {};

    const allowedFields = {
      address,
      phone,
      email,
      googleMapsLocation,
    };

    const updates = {};

    for (const [key, value] of Object.entries(allowedFields)) {
      if (value !== undefined) {
        if (typeof value !== "string" || !value.trim()) {
          return res.status(400).json({
            success: false,
            message: `${key} must be a non-empty string.`,
          });
        }

        updates[key] = value.trim();
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one contact field to update.",
      });
    }

    if (updates.email) {
      updates.email = updates.email.toLowerCase();

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(updates.email)) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid email address.",
        });
      }
    }

    const existingDetails = await prisma.contactDetails.findFirst({
      orderBy: { id: "asc" },
    });

    let details;

    if (!existingDetails) {
      const requiredFields = [
        "address",
        "phone",
        "email",
        "googleMapsLocation",
      ];

      const missingFields = requiredFields.filter(
        (field) => !updates[field]
      );

      if (missingFields.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Provide all four contact fields to configure the initial details.",
          missingFields,
        });
      }

      details = await prisma.contactDetails.create({
        data: updates,
      });
    } else {
      details = await prisma.contactDetails.update({
        where: { id: existingDetails.id },
        data: updates,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Restaurant contact details saved successfully.",
      details,
    });
  } catch (error) {
    console.error("Update contact details error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save restaurant contact details.",
    });
  }
};


module.exports = {
  createMessage,
  getMessages,
  markMessageAsRead,
  replyToMessage,
  deleteMessage,
  getContactDetails,
  updateContactDetails
};
