const express = require("express");
const router = express.Router();

const {
authenticateToken,
requireAdmin
} = require("../middleware/authMiddleware");

const { createOrder, getAllOrders, getOrderById, updateOrderStatus } = require("../controllers/orderController");

//create a customer order
router.post("/", createOrder);

// Apply authentication and admin authorization.
router.use(authenticateToken, requireAdmin);

//get all order details
router.get("/", getAllOrders);

//get order details by id
router.get("/:id", getOrderById)

//update order status
router.patch("/:id/status", updateOrderStatus);


module.exports = router;
