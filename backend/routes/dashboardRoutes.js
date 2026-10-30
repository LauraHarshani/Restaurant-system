const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboardController');

// GET dashboard summary/stats
router.get('/summary', getDashboardStats);

module.exports = router;