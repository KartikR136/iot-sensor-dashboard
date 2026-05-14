import { Server } from "socket.io";

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true
    }import { Server } from "socket.io";
import { SOCKET_EVENTS } from "../utils/constants.js";

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    console.log(`WebSocket client connected: ${socket.id}`);

    socket.emit(SOCKET_EVENTS.DEVICE_STATUS, {
      online: false,
      lastSeen: null
    });

    socket.on("disconnect", () => {
      console.log(`WebSocket client disconnected: ${socket.id}`);
    });
  });

  return io;
};

export default initializeSocket;
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

export default initializeSocket;