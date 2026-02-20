import express from "express";
import cors from "cors";
import "dotenv/config";
import pool from "./config/db.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import metaRoutes from "./routes/meta.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.status(200).send("Teacher Insights API is running");
});

// Health check
app.get("/health", async (req, res) => {
  console.log(process.env.DATABASE_URL);
  try {
    const result = await pool.query("SELECT NOW()");
    res.status(200).json({ status: "ok", time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "DB connection failed" });
  }
});

// Analytics routes
app.use("/api/analytics", analyticsRoutes);
app.use("/api/meta", metaRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;