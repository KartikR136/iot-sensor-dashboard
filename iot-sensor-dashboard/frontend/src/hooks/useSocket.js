import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const useSocket = (handlers = {}) => {
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ["websocket"]
    });

    socketRef.current = socket;

    Object.entries(handlers).forEach(([event, callback]) => {
      socket.on(event, callback);
    });

    return () => {
      Object.entries(handlers).forEach(([event, callback]) => {
        socket.off(event, callback);
      });

      socket.disconnect();
    };
  }, [handlers]);

  return socketRef.current;
};

export default useSocket;