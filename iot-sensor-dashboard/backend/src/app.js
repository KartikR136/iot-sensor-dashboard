import express from "express";
import cors from "cors";
import sensorRoutes from "./routes/sensorRoutes.js";
import express from "express";
import cors from "cors";
import sensorRoutes from "./routes/sensorRoutes.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);

app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "IoT dashboard backend is running"
  });
});

app.use("/api/sensors", sensorRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

export default app;
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "IoT dashboard backend is running"
  });
});

app.use("/api/sensors", sensorRoutes);

export default app;