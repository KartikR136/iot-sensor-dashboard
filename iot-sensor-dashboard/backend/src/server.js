import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app.js";
import connectDatabase from "./config/db.js";
import initializeSocket from "./socket/socketHandler.js";
import initializeMQTT from "./config/mqtt.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDatabase();

    const server = http.createServer(app);

    const io = initializeSocket(server);

    initializeMQTT(io);

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();