const express = require("express");
const router = express.Router();

const {createMessage,
    getMessages
} = require("../controllers/contactController");

//send messages
router.post("/messages", createMessage);

//get all messages
router.get("/messages", getMessages)

//mark message as read
router.patch("/messages/:id/read", markMessageAsRead);

module.exports = router;