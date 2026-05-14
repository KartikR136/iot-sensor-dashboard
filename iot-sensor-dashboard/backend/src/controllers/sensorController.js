import {
  getRecentSensorHistory,
  getAlertConfig,
  updateAlertConfig
} from "../services/sensorService.js";

export const fetchSensorHistory = async (req, res) => {
  try {
    const history = await getRecentSensorHistory(req.query.limit);

    res.status(200).json({
      success: true,
      data: history
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch sensor history"
    });
  }
};

export const fetchAlertConfig = async (req, res) => {
  try {
    const config = await getAlertConfig();

    res.status(200).json({
      success: true,
      data: config
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch alert configuration"
    });
  }
};

export const saveAlertConfig = async (req, res) => {
  try {
    const updated = await updateAlertConfig(req.body);

    res.status(200).json({
      success: true,
      data: updated,
      message: "Alert configuration updated successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update alert configuration"
    });
  }
};