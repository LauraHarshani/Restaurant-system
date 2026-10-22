const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Task 24: Get categories
router.get("/", async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Task 23: Create category
router.post("/", async (req, res) => {
  try {
    const newCategory = await prisma.category.create({
      data: { name: req.body.name },
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;