const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./src/modules/auth/auth.routes");
const rfpRoutes = require("./src/modules/rfp/rfp.routes");
const proposalRoutes = require("./src/modules/proposal/proposal.routes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Proposal Management API Running",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "UP",
    port: process.env.PORT,
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/rfp", rfpRoutes);
app.use("/api/proposals", proposalRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});