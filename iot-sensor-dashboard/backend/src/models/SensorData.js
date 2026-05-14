import mongoose from "mongoose";

const sensorDataSchema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      default: "esp32-room-01"
    },

    temperature: {
      type: Number,
      required: true,
      min: -50,
      max: 150
    },

    humidity: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },

    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  {
    versionKey: false
  }
);

sensorDataSchema.index({ timestamp: -1 });

export default mongoose.model("SensorData", sensorDataSchema);