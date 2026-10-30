
const bcrypt = require("bcryptjs");
const { prisma } = require("../lib/prisma.ts");

// GET /api/admin/profile
// Retrieve the profile of the currently authenticated admin.
const getAdminProfile = async (req, res) => {
  try {
    const admin = await prisma.user.findUnique({
      where: { id: Number(req.user.id) },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!admin || admin.role !== "ADMIN") {
      return res.status(404).json({
        success: false,
        message: "Administrator account not found.",
      });
    }

    return res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    console.error("Get admin profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve admin profile.",
    });
  }
};

// PATCH /api/admin/profile
// Update the admin's name and email address.
const updateAdminProfile = async (req, res) => {
  try {
    const { name, email } = req.body || {};

    // Validate the submitted profile information.
    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !email.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid name and email are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Update only the authenticated admin's account.
    const updatedAdmin = await prisma.user.update({
      where: { id: Number(req.user.id) },
      data: {
        name: name.trim(),
        email: normalizedEmail,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      admin: updatedAdmin,
    });
  } catch (error) {
    // Prisma P2002 means a unique field (such as email) already exists.
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "This email address is already in use.",
      });
    }

    console.error("Update admin profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update admin profile.",
    });
  }
};

// PATCH /api/admin/change-password
// Verify the current password before saving a new password.
const changeAdminPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body || {};

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please complete all password fields.",
      });
    }

    if (typeof currentPassword !== "string" ||
        typeof newPassword !== "string" ||
        typeof confirmPassword !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid password values.",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "The new password must contain at least 8 characters.",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "The new passwords do not match.",
      });
    }

    // Find the currently authenticated admin.
    const admin = await prisma.user.findUnique({
      where: { id: Number(req.user.id) },
    });

    if (!admin || admin.role !== "ADMIN") {
      return res.status(404).json({
        success: false,
        message: "Administrator account not found.",
      });
    }

    // Confirm the current password before allowing a change.
    const passwordMatches = await bcrypt.compare(
      currentPassword,
      admin.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Your current password is incorrect.",
      });
    }

    // Hash the new password before storing it.
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id: admin.id },
      data: { password: hashedPassword },
    });

    return res.status(200).json({
      success: true,
      message: "Password updated successfully. Please log in again.",
    });
  } catch (error) {
    console.error("Change admin password error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update password.",
    });
  }
};

module.exports = {
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
};
