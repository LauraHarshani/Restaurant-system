const express = require("express");
const router = express.Router();

const {createMessage,
    getMessages
} = require("../controllers/contactController");

//send messages
router.post("/messages", createMessage);

//get all messages
router.get("/messages", getMessages)

module.exports = router;