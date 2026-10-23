const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");

// Task 26: Get all chefs
router.get("/", async (req, res) => {
  try {
    const chefs = await prisma.chef.findMany();
    res.json(chefs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Task 27: Get chef by ID
router.get("/:id", async (req, res) => {
  try {
    const chef = await prisma.chef.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!chef) return res.status(404).json({ error: "Chef not found" });
    res.json(chef);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Task 25: Create chef
router.post("/", async (req, res) => {
  try {
    const newChef = await prisma.chef.create({ data: req.body });
    res.status(201).json(newChef);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Task 28: Update chef
router.put("/:id", async (req, res) => {
  try {
    const updatedChef = await prisma.chef.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.json(updatedChef);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Task 29: Delete chef
router.delete("/:id", async (req, res) => {
  try {
    await prisma.chef.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Chef deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;