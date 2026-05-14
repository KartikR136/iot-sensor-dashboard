import SensorData from "../models/SensorData.js";
import AlertConfig from "../models/AlertConfig.js";

export const saveSensorReading = async (payload) => {
  const reading = await SensorData.create({
    deviceId:
      typeof payload.deviceId === "string"
        ? payload.deviceId.trim()
        : "esp32-room-01",

    temperature: payload.temperature,
    humidity: payload.humidity
  });

  return reading;
};

export const getRecentSensorHistory = async (limit = 50) => {
  const safeLimit = Math.min(Math.max(Number(limit), 1), 500);

  const history = await SensorData.find()
    .sort({ timestamp: -1 })
    .limit(safeLimit)
    .lean();

  return history.reverse();
};

export const getAlertConfig = async () => {
  let config = await AlertConfig.findOne();

  if (!config) {
    config = await AlertConfig.create({});
  }

  return config;
};

export const updateAlertConfig = async (payload) => {
  const nextConfig = {
    maxTemperature: Number(payload.maxTemperature),
    minTemperature: Number(payload.minTemperature),
    maxHumidity: Number(payload.maxHumidity),
    minHumidity: Number(payload.minHumidity)
  };

  if (nextConfig.minTemperature >= nextConfig.maxTemperature) {
    throw new Error("Invalid temperature range");
  }

  if (nextConfig.minHumidity >= nextConfig.maxHumidity) {
    throw new Error("Invalid humidity range");
  }

  let config = await AlertConfig.findOne();

  if (!config) {
    config = await AlertConfig.create(nextConfig);
    return config;
  }

  Object.assign(config, nextConfig);

  await config.save();

  return config;
};