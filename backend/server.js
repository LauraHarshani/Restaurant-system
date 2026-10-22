const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes Integration 
const homeRoutes = require('./routes/homeRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const authRoutes = require('./routes/authRoutes');
// const chefRoutes = require("./routes/chefRoutes");
// const menuRoutes = require("./routes/menuRoutes");
// const categoryRoutes = require("./routes/categoryRoutes");

app.use('/api/content/home', homeRoutes);
app.use('/api/content/about', aboutRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/auth', authRoutes);
// app.use("/api/chefs", chefRoutes);
// app.use("/api/menu", menuRoutes);
// app.use("/api/categories", categoryRoutes);

// Testing Route
app.get('/', (req, res) => {
  res.send('🔥 Flame & Crust Restaurant Backend Server is Running!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});