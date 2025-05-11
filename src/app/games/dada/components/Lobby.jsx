"use client";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faWebAwesome } from "@fortawesome/free-solid-svg-icons";

export default function Lobby({ gameStarted, setGameStarted, room, socket }) {
  const [player, setPlayer] = useState({});

  const [playerIsReady, setPlayerIsReady] = useState(false);
  const allColors = ["red", "green", "blue", "yellow"];
  const [availableColors, setAvailableColors] = useState(allColors); // State to manage available colors

  // Start the game when all players are ready
  const startNewGame = () => {
    setGameStarted(true);
  };

  useEffect(() => {
    console.log("Room updated:", room);
    if (room.players) {
      const takenColors = Object.values(room.players).map(
        (player) => player.color
      );
      setAvailableColors(
        allColors.filter((color) => !takenColors.includes(color))
      );
    }

    if (room.players) {
      const playerId = Object.keys(room.players).find(
        (key) => room.players[key].id === socket.id
      );
      setPlayer({
        id: room.players[playerId]?.id || socket.id,
        name: room.players[playerId]?.name || "Joueur 1",
        color: room.players[playerId]?.color || "black",
        leader: room.players[playerId]?.leader || false,
      });
      console.log("Player updated:", player);
    }
  }, [room]);

  const isNameTaken = (name) => {
    const takenNames = Object.values(room.players).map((player) => player.name);
    return takenNames.includes(name);
  };

  function readyToPlay() {
    console.log("Colour taken : ", !availableColors.includes(player.color));
    console.log("Name taken : ", isNameTaken(player.name));

    if (isNameTaken(player.name)) {
      alert("Ce nom est déjà pris ! Choisissez-en un autre.");
    } else if (!availableColors.includes(player.color)) {
      alert("Cette couleur est déjà prise ! Choisissez-en une autre.");
    } else {
      console.log("Player is ready:", player);
      setPlayerIsReady(true);

      socket.emit("joinRoomToPlay", room.roomName, player);
      console.log(
        "Player joined the romm: " +
          room +
          " | ID: " +
          player.id +
          " | Name: " +
          player.name +
          " | Color: " +
          player.color
      );
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold italic text-center mb-4">
        {room.roomName}
      </h1>
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
            onClick={() => readyToPlay()}>
            Prêt à jouer !
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center">
            En attente de l'arrivée des joueurs...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.values(room.players).map((player) => (
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

Lobby.propTypes = {
  gameStarted: PropTypes.bool.isRequired,
  setGameStarted: PropTypes.func.isRequired,
  room: PropTypes.string.isRequired,
};
