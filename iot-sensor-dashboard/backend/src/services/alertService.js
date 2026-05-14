export const evaluateAlerts = (reading, config) => {
  const alerts = [];

  if (reading.temperature > config.maxTemperature) {
    alerts.push({
      type: "temperature",
      severity: "high",
      message: `Temperature exceeded limit (${reading.temperature}°C)`
    });
  }

  if (reading.temperature < config.minTemperature) {
    alerts.push({
      type: "temperature",
      severity: "low",
      message: `Temperature below limit (${reading.temperature}°C)`
    });
  }

  if (reading.humidity > config.maxHumidity) {
    alerts.push({
      type: "humidity",
      severity: "high",
      message: `Humidity exceeded limit (${reading.humidity}%)`
    });
  }

  if (reading.humidity < config.minHumidity) {
    alerts.push({
      type: "humidity",
      severity: "low",
      message: `Humidity below limit (${reading.humidity}%)`
    });
  }

  return alerts;
};