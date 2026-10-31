const express = require('express');
const router = express.Router();

const {
authenticateToken,
requireAdmin
} = require("../middleware/authMiddleware");

const { getAboutContent, updateAboutContent } = require('../controllers/aboutController');

router.get('/', getAboutContent);

// Apply authentication and admin authorization.
router.use(authenticateToken, requireAdmin);

router.put('/', updateAboutContent);

module.exports = router; 