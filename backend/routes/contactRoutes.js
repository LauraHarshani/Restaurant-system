const express = require("express");
const router = express.Router();

const {
authenticateToken,
requireAdmin
} = require("../middleware/authMiddleware");

const {createMessage,
    getMessages,
    markMessageAsRead,
    replyToMessage,
    deleteMessage,
    getContactDetails,
    updateContactDetails
} = require("../controllers/contactController");

//send messages
router.post("/messages", createMessage);

//get contact details
router.get("/details", getContactDetails)

// Apply authentication and admin authorization.
router.use(authenticateToken, requireAdmin);

//get all messages
router.get("/messages", getMessages)

//mark message as read
router.patch("/messages/:id/read", markMessageAsRead);

//reply message
router.patch("/messages/:id/reply", replyToMessage)

//delete message
router.delete("/messages/:id", deleteMessage)

//update contact details
router.patch('/details', updateContactDetails)

module.exports = router;