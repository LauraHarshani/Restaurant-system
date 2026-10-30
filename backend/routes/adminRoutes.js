const express = require("express");
const router = express.Router();

const {
  authenticateToken,
  requireAdmin,
} = require("../middleware/authMiddleware");

const {
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
} = require("../controllers/adminProfileController");

// All routes below require a valid admin JWT.
router.use(authenticateToken, requireAdmin);

// Get the logged-in admin's profile.
router.get("/profile", getAdminProfile);

// Update the logged-in admin's name and email.
router.patch("/profile", updateAdminProfile);

// Change the logged-in admin's password.
router.patch("/change-password", changeAdminPassword);

module.exports = router;
