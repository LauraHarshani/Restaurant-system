const express = require('express');
const router = express.Router();
const { getAboutContent, updateAboutContent } = require('../controllers/aboutController');

router.get('/', getAboutContent);
router.put('/', updateAboutContent);

module.exports = router; 