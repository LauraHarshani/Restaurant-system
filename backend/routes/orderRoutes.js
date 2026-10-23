const express = require("express");
const router = express.Router();

const { createOrder, getAllOrders } = require("../controllers/orderController");

//create a customer order
router.post("/", createOrder);

//get all order details
router.get("/", getAllOrders);



module.exports = router;
