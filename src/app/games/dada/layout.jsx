"use client";

import DadaHeader from "./components/DadaHeader";
import PropTypes from "prop-types";

import { socket } from "./utils/socket";
import React, { useEffect } from "react";
import { showToast } from "@/app/Components/ToastAlert";

export default function DadaLayout({ children }) {
  const [errorMessage, setErrorMessage] = React.useState(null);

  useEffect(() => {
    console.log("🔌 SOCKET INSTANCE :", socket);
    if (socket.connected) {
      console.log("✅ Connecté au websocket Dada");
    } else {
      console.log("❌ Erreur de connexion au websocket Dada");
    }

    socket.on("error", (error) => {
      console.log("❌ Erreur socket :", error);
      setErrorMessage(error);
    });
  }, []);

  useEffect(() => {
    showToast(errorMessage, true);
  }, [errorMessage]);

  return (
    <>
      <DadaHeader />

      {/* Fond vert prenant toute la page sauf le header */}
      <div className="bg-green-600 min-h-[calc(100vh-108px)] flex flex-col items-center py-12 px-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-max shadow-lg">
          {children}
        </div>
      </div>
    </>
  );
}

DadaLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
