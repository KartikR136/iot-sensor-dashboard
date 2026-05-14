import mongoose from "mongoose";

const alertConfigSchema = new mongoose.Schema(
  {
    maxTemperature: {
      type: Number,
      default: 35,
      min: -50,
      max: 150
    },

    minTemperature: {
      type: Number,
      default: 10,
      min: -50,
      max: 150
    },

    maxHumidity: {
      type: Number,
      default: 80,
      min: 0,
      max: 100
    },

    minHumidity: {
      type: Number,
      default: 20,
      min: 0,
      max: 100
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model("AlertConfig", alertConfigSchema);