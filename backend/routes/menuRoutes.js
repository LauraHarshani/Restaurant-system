const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Task 19: Get menu (all items)
router.get("/", async (req, res) => {
  try {
    const menu = await prisma.menuItem.findMany();
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Task 20: Get menu by ID
router.get("/:id", async (req, res) => {
  try {
    const item = await prisma.menuItem.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!item) return res.status(404).json({ error: "Menu item not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Task 18: Create menu
router.post("/", async (req, res) => {
  try {
    const newItem = await prisma.menuItem.create({ data: req.body });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Task 21: Update menu
router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await prisma.menuItem.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Task 22: Delete menu
router.delete("/:id", async (req, res) => {
  try {
    await prisma.menuItem.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;