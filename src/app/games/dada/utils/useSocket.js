import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const useSocket = () => {
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Connecté au WebSocket :", socket.id);
    });

    // Événement de mise à jour des joueurs
    socket.on("updatePlayers", (players) => {
      console.log("📡 Joueurs connectés :", players);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return socketRef;
};

export default useSocket;
