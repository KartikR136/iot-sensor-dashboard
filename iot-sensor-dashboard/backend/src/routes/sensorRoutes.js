import express from "express";
import {
  fetchSensorHistory,
  fetchAlertConfig,
  saveAlertConfig
} from "../controllers/sensorController.js";

const router = express.Router();

router.get("/history", fetchSensorHistory);

router.get("/alerts", fetchAlertConfig);

router.put("/alerts", saveAlertConfig);

export default router;