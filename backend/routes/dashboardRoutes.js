const express = require('express');
const router = express.Router();

const {
authenticateToken,
requireAdmin
} = require("../middleware/authMiddleware");

const { getDashboardStats } = require('../controllers/dashboardController');

// Apply authentication and admin authorization.
router.use(authenticateToken, requireAdmin);

// GET dashboard summary/stats
router.get('/summary', getDashboardStats);

module.exports = router;