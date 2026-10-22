require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
const chefRoutes = require("./routes/chefRoutes");
const menuRoutes = require("./routes/menuRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

app.use("/api/chefs", chefRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/categories", categoryRoutes);

app.get("/", (req, res) => {
  res.send("Flame & Crust API is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});