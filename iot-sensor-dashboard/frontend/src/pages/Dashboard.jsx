import { useEffect, useMemo, useState } from "react";

import Navbar from "../components/Navbar";
import SensorCard from "../components/SensorCard";
import SensorChart from "../components/SensorChart";
import AlertBanner from "../components/AlertBanner";
import DeviceStatus from "../components/DeviceStatus";
import ThresholdConfig from "../components/ThresholdConfig";

import useSocket from "../hooks/useSocket";

import {
  fetchSensorHistory,
  fetchAlertConfig,
  updateAlertConfig
} from "../api/sensorApi";

import { formatTimestamp } from "../utils/formatters";

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [latestReading, setLatestReading] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [alertConfig, setAlertConfig] = useState(null);

  const [savingThresholds, setSavingThresholds] = useState(false);

  const [deviceStatus, setDeviceStatus] = useState({
    online: false,
    lastSeen: null
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [historyData, configData] = await Promise.all([
        fetchSensorHistory(),
        fetchAlertConfig()
      ]);

      setHistory(historyData);
      setAlertConfig(configData);

      if (historyData.length > 0) {
        setLatestReading(historyData[historyData.length - 1]);
      }
    } catch (error) {
      console.error("Dashboard load failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleThresholdSave = async (payload) => {
    try {
      setSavingThresholds(true);

      const updated = await updateAlertConfig(payload);

      setAlertConfig(updated);
    } catch (error) {
      console.error("Threshold save failed:", error);
    } finally {
      setSavingThresholds(false);
    }
  };

  const socketHandlers = useMemo(
    () => ({
      "sensor:update": (reading) => {
        setLatestReading(reading);

        setHistory((prev) => {
          const updated = [...prev, reading];

          if (updated.length > 50) {
            updated.shift();
          }

          return updated;
        });
      },

      "sensor:alert": (incomingAlerts) => {
        setAlerts(incomingAlerts);

        setTimeout(() => {
          setAlerts([]);
        }, 5000);
      },

      "device:status": (status) => {
        setDeviceStatus({
          online: status.online,
          lastSeen: formatTimestamp(status.lastSeen)
        });
      }
    }),
    []
  );

  useSocket(socketHandlers);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl p-8">
        <div className="space-y-6">
          <AlertBanner alerts={alerts} />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <SensorCard
              title="Temperature"
              value={latestReading?.temperature}
              unit="°C"
            />

            <SensorCard
              title="Humidity"
              value={latestReading?.humidity}
              unit="%"
            />

            <DeviceStatus
              online={deviceStatus.online}
              lastSeen={deviceStatus.lastSeen}
            />
          </div>

          <SensorChart history={history} />

          <ThresholdConfig
            config={alertConfig}
            onSave={handleThresholdSave}
            saving={savingThresholds}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;