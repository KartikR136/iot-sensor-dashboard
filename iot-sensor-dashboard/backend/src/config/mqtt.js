const initializeMQTT = () => {
  console.log("MQTT initialization pending...");
};import mqtt from "mqtt";
import {
  saveSensorReading,
  getAlertConfig
} from "../services/sensorService.js";
import { evaluateAlerts } from "../services/alertService.js";
import {
  SOCKET_EVENTS,
  DEVICE_TIMEOUT_MS
} from "../utils/constants.js";

let lastSeenTimestamp = null;
let offlineTimer = null;

const initializeMQTT = (io) => {
  const client = mqtt.connect(process.env.MQTT_BROKER_URL);

  client.on("connect", () => {
    console.log("Connected to MQTT broker");

    client.subscribe(process.env.MQTT_TOPIC, (error) => {
      if (error) {
        console.error("MQTT subscription failed:", error.message);
        return;
      }

      console.log(`Subscribed to topic: ${process.env.MQTT_TOPIC}`);
    });
  });

  client.on("message", async (_, message) => {
    try {
      const payload = JSON.parse(message.toString());

      if (
  typeof payload.temperature !== "number" ||
  typeof payload.humidity !== "number"
) {
  console.warn("MQTT payload rejected: invalid numeric data");
  return;
}

if (
  payload.temperature < -50 ||
  payload.temperature > 150 ||
  payload.humidity < 0 ||
  payload.humidity > 100
) {
  console.warn("MQTT payload rejected: values out of range");
  return;
}

      const savedReading = await saveSensorReading(payload);

      const config = await getAlertConfig();

      const alerts = evaluateAlerts(savedReading, config);

      io.emit(SOCKET_EVENTS.SENSOR_UPDATE, savedReading);

      io.emit(SOCKET_EVENTS.DEVICE_STATUS, {
        online: true,
        lastSeen: new Date()
      });

      if (alerts.length > 0) {
        io.emit(SOCKET_EVENTS.SENSOR_ALERT, alerts);
      }

      lastSeenTimestamp = Date.now();

      if (offlineTimer) {
        clearTimeout(offlineTimer);
      }

      offlineTimer = setTimeout(() => {
        io.emit(SOCKET_EVENTS.DEVICE_STATUS, {
          online: false,
          lastSeen: new Date(lastSeenTimestamp)
        });
      }, DEVICE_TIMEOUT_MS);
    } catch (error) {
      console.error("MQTT message processing failed:", error.message);
    }
  });

  client.on("error", (error) => {
    console.error("MQTT client error:", error.message);
  });

  client.on("reconnect", () => {
    console.log("Reconnecting to MQTT broker...");
  });

  return client;
};

export default initializeMQTT;

export default initializeMQTT;