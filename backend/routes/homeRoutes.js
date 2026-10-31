const express = require('express');
const router = express.Router();

const {
authenticateToken,
requireAdmin
} = require("../middleware/authMiddleware");

const { getHomeContent, updateHomeContent } = require('../controllers/homeController');

router.get('/', getHomeContent);

// Apply authentication and admin authorization.
router.use(authenticateToken, requireAdmin);

router.put('/', updateHomeContent);

module.exports = router; 