"use client";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useSocket from "../utils/useSocket";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faWebAwesome } from "@fortawesome/free-solid-svg-icons";

export default function PlayerInLobby({ gameStarted, setGameStarted, room }) {
  const [player, setPlayer] = useState({
    name: "Player name",
    color: "black",
    leader: false,
  }); // State to manage player in the lobby

  const [playerIsReady, setPlayerIsReady] = useState(false);
  const [playersList, setPlayersList] = useState([]); // State to manage players list

  const socketRef = useSocket(); // Custom hook to manage WebSocket connection

  useEffect(() => {
    console.log("WebSocket connection established with socketRef");
    if (!socketRef.current) return;
    const socket = socketRef.current;

    socket.on("updatePlayers", (playersList) => {
      console.log("Tous les joueurs :", playersList);
      setPlayersList(playersList);
      if (playersList.length > 0) {
        const playerInLobby = playersList.find(
          (player) => player.id === socket.id
        );
        if (playerInLobby) {
          setPlayer(playerInLobby);
          console.log("Player in lobby:", playerInLobby);
        }
      }
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

  const takenNames = playersList.map((player) => player.name); // Get all names taken by players
  const isNameTaken = (name) => takenNames.includes(name);

  const takenColors = playersList.map((player) => player.color); // Get all colors taken by players
  const colors = ["red", "blue", "green", "yellow"];
  const availableColors = colors.filter(
    (color) => !takenColors.includes(color)
  ); // Get all available colors

  return (
    <div>
      {/* When the player arrives, he chooses his name and color */}
      {!playerIsReady ? (
        <div className="max-w-lg space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl text-amber-600">Entrez votre nom</h3>
            <input
              type="text"
              className={`w-100 p-2 border border-${player.color}-300 rounded-md focus:outline-none focus:ring-2 focus:ring-${player.color}-500 text-${player.color}-600`}
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
                    player.color === color ? "outline-4 outline-green-800" : ""
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
              if (isNameTaken(player.name)) {
                alert("Ce nom est déjà pris ! Choisissez-en un autre.");
              } else if (takenColors.includes(player.color)) {
                alert(
                  "Cette couleur est déjà prise ! Choisissez-en une autre."
                );
              } else {
                console.log("Player is ready:", player);
                setPlayerIsReady(true);
                socketRef.current.emit("joinRoom", {
                  roomId: room, // récupéré depuis useParams()
                  name: player.name, // champ saisi par le joueur
                  color: player.color, // couleur choisie
                });

                console.log(
                  "Player joined the romm:",
                  room,
                  "Name:",
                  player.name,
                  "Color:",
                  player.color
                );
              }
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
                className={`relative flex justify-center items-center bg-${player.color}-600 text-white p-6 rounded-md`}>
                {player.leader && (
                  <div className="absolute -top-3 -left-4 -rotate-45">
                    <FontAwesomeIcon
                      icon={faWebAwesome}
                      className="text-yellow-300 text-2xl"
                    />
                  </div>
                )}
                <span>{player.name}</span>
              </div>
            ))}
          </div>
          {/* Seul le leader peut lancer la game */}
          {player.leader && (
            <button
              className="w-full bg-green-600 text-white py-2 px-4 mt-5 rounded-md hover:bg-green-700 transition duration-200"
              onClick={startNewGame}>
              Démarrer la partie
            </button>
          )}
        </>
      )}
    </div>
  );
}

PlayerInLobby.propTypes = {
  gameStarted: PropTypes.bool.isRequired,
  setGameStarted: PropTypes.func.isRequired,
  room: PropTypes.string.isRequired,
};
