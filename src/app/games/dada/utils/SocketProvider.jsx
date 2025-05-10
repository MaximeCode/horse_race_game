import { io } from "socket.io-client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false); // pour usage optionnel

  useEffect(() => {
    // Si déjà connecté, ne pas re-créer
    if (!socketRef.current) {
      const socket = io("http://localhost:5000", {
        transports: ["websocket"],
      });

      socketRef.current = socket;

      socket.on("connect", () => {
        console.log("✅ Socket connecté :", socket.id);
        setIsConnected(true);
      });

      socket.on("disconnect", () => {
        console.log("❌ Socket déconnecté :", socket.id);
        setIsConnected(false);
      });
    }

    return () => {
      // NE PAS déconnecter ici pour garder la connexion persistante
    };
  }, []);

  return (
    <SocketContext.Provider value={socketRef}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
