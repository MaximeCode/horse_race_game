"use client";

import React, { useState, useEffect } from "react";
import useSocket from "../utils/useSocket";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";

export default function PlayerInLobby({ gameStarted, setGameStarted }) {
  const [player, setPlayer] = useState({
    name: "Player 3",
    color: "black",
  }); // State to manage player in the lobby

  const [playerIsReady, setPlayerIsReady] = useState(false);
  const [playersList, setPlayersList] = useState([]); // State to manage players list

  const socketRef = useSocket(); // Custom hook to manage WebSocket connection

  useEffect(() => {
    if (!socketRef.current) return;
    const socket = socketRef.current;

    socket.on("updatePlayers", (playersList) => {
      console.log("Tous les joueurs :", playersList);
      setPlayersList(playersList);
    });

    // Nettoyage à la déconnexion du composant
    return () => {
      socket.off("updatePlayers");
    };
  }, [socketRef]);

  // Start the game when all players are ready
  const startNewGame = () => {
    setGameStarted(true);
  };

  const takenColors = playersList.map((player) => player.color); // Get all colors taken by players
  const colors = ["red", "blue", "green", "yellow"];
  const availableColors = colors.filter((color) => !takenColors.includes(color)); // Get all available colors

  return (
    <div className="min-h-screen bg-green-800 flex flex-col items-center py-8 px-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        {/* When the player arrives, he chooses his name and color */}
        {!playerIsReady ? (
          <div className="max-w-lg space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl text-amber-600">Entrez votre nom</h3>
              <input
                type="text"
                className={`w-full p-2 border border-${player.color}-300 rounded-md focus:outline-none focus:ring-2 focus:ring-${player.color}-500 text-${player.color}-600`}
                placeholder={player.name}
                onChange={(e) => {
                  console.log("Name selected:", e.target.value);
                  setPlayer({ ...player, name: e.target.value });
                }}
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl text-amber-600">
                Sélectionnez votre couleur
              </h3>
              {/* Radio buttons */}
              <div className="flex items-center justify-center space-x-4">
                {availableColors.map((color) => (
                  <button
                    key={color}
                    className={`relative size-12 bg-${color}-600 aspect-square rounded-sm cursor-pointer ${
                      player.color === color
                        ? "outline-4 outline-green-800"
                        : ""
                    }`}
                    onClick={() => {
                      console.log("Color selected:", color);
                      setPlayer({ ...player, color: color });
                    }}>
                    {player.color === color && (
                      <div className="absolute -top-0.5 right-0">
                        <FontAwesomeIcon
                          icon={faSquareCheck}
                          className={`text-green-300 text-2xl`}
                        />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            {/* Button to enter in a game */}
            <button
              className="w-full bg-green-600 text-white py-2 px-4 mt-5 rounded-md hover:bg-green-700 transition duration-200"
              onClick={() => {
                console.log("Player is ready:", player);
                setPlayerIsReady(true);
                socketRef.current.emit("joinGame", {
                  name: player.name,
                  color: player.color,
                });
                console.log(
                  "Player joined the game:",
                  player.name,
                  player.color
                );
              }}>
              Prêt à jouer !
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">
              En attente de l'arrivée des joueurs...
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {playersList.map((player) => (
                <div
                  key={player.id}
                  className={`flex justify-center items-center bg-${player.color}-600 text-white p-6 rounded-md`}>
                  <span>{player.name}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
