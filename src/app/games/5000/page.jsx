"use client";

import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faPlus,
  faMinus,
  faDiamondTurnRight,
} from "@fortawesome/free-solid-svg-icons";

// Les valeurs possibles des dés
const DICE_VALUES = [1, 2, 3, 4, 5, 6];

// Le jeu de 5000
export default function Game5000() {
  // États du jeu
  const [players, setPlayers] = useState([
    { id: 1, name: "Joueur 1", score: 0 },
    { id: 2, name: "Joueur 2", score: 0 },
  ]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [dice, setDice] = useState([1, 1, 1]);
  const [tempScore, setTempScore] = useState(0);
  const [rolling, setRolling] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState(null);
  const [rollHistory, setRollHistory] = useState([]);
  const [gameMessage, setGameMessage] = useState("Bienvenue au jeu de 5000!");

  // Fonction pour lancer les dés
  const rollDice = () => {
    setRolling(true);
    setGameMessage("Lancement des dés...");

    // Animation des dés qui défilent
    const rollInterval = setInterval(() => {
      setDice([
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ]);
    }, 50);

    // Après 1 seconde, arrêter l'animation et calculer le score
    setTimeout(() => {
      clearInterval(rollInterval);
      setRolling(false);

      const finalDice = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ];
      setDice(finalDice);

      // Calculer les points
      const points = calculatePoints(finalDice);

      if (points === 0) {
        // Si aucun point, passer au joueur suivant
        setGameMessage("Aucun point! Tour terminé.");
        setTempScore(0);
        setRollHistory([]);
        nextPlayer();
      } else {
        // Si des points, les ajouter au score temporaire
        const newTempScore = tempScore + points;
        setTempScore(newTempScore);

        // Ajouter ce lancer à l'historique
        setRollHistory([...rollHistory, { dice: finalDice, points }]);

        setGameMessage(
          `Vous avez obtenu ${points} points! Score temporaire: ${newTempScore}`
        );
      }
    }, 1000);
  };

  // Calculer les points selon les règles du 5000
  const calculatePoints = (dice) => {
    let points = 0;

    // Vérifier si c'est un 4-2-1 (1500 pts)
    if (
      dice.includes(1) &&
      dice.includes(2) &&
      dice.includes(4) &&
      dice.sort().join("") === "124"
    ) {
      return 1500;
    }

    // Compter les occurrences de chaque valeur
    const counts = {};
    dice.forEach((value) => {
      counts[value] = (counts[value] || 0) + 1;
    });

    // Vérifier les triplets
    for (const [value, count] of Object.entries(counts)) {
      const numValue = parseInt(value);

      if (count === 3) {
        // Triplet
        points += numValue === 1 ? 1000 : numValue * 100;
      } else {
        // Points individuels (As et 5)
        if (numValue === 1) {
          points += count * 100;
        } else if (numValue === 5) {
          points += count * 50;
        }
      }
    }

    return points;
  };

  // Passer au joueur suivant
  const nextPlayer = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
    setTempScore(0);
    setRollHistory([]);
  };

  // Garder le score
  const keepScore = () => {
    if (tempScore === 0) {
      setGameMessage("Vous devez avoir des points pour les conserver!");
      return;
    }

    const updatedPlayers = [...players];
    const currentPlayer = updatedPlayers[currentPlayerIndex];

    // Vérifier si le joueur dépasse 5000
    const newScore = currentPlayer.score + tempScore;
    if (newScore > 5000) {
      setGameMessage(
        `Score dépassé! Vous restez à ${currentPlayer.score} points.`
      );
    } else {
      currentPlayer.score = newScore;

      // Vérifier si le joueur a gagné
      if (newScore === 5000) {
        setWinner(currentPlayer);
        setGameMessage(`${currentPlayer.name} a gagné avec 5000 points!`);
      } else {
        setGameMessage(
          `${currentPlayer.name} marque ${tempScore} points! Total: ${newScore}`
        );
      }
    }

    // Mettre à jour les joueurs et passer au suivant
    setPlayers(updatedPlayers);
    nextPlayer();
  };

  // Ajouter ou retirer un joueur
  const addPlayer = () => {
    if (players.length < 5) {
      setPlayers([
        ...players,
        {
          id: players.length + 1,
          name: `Joueur ${players.length + 1}`,
          score: 0,
        },
      ]);
    }
  };

  const removePlayer = () => {
    if (players.length > 2) {
      setPlayers(players.slice(0, -1));
      if (currentPlayerIndex >= players.length - 1) {
        setCurrentPlayerIndex(0);
      }
    }
  };

  // Changer le nom d'un joueur
  const changePlayerName = (id, newName) => {
    const updatedPlayers = players.map((player) =>
      player.id === id ? { ...player, name: newName } : player
    );
    setPlayers(updatedPlayers);
  };

  // Commencer une nouvelle partie
  const startNewGame = () => {
    setPlayers(players.map((player) => ({ ...player, score: 0 })));
    setCurrentPlayerIndex(0);
    setTempScore(0);
    setDice([1, 1, 1]);
    setGameStarted(true);
    setWinner(null);
    setRollHistory([]);
    setGameMessage("Nouvelle partie! Lancez les dés pour commencer.");
  };

  // Afficher un dé avec le nombre spécifié
  const Dice = ({ value }) => {
    const dotPositions = {
      1: ["center"],
      2: ["top-left", "bottom-right"],
      3: ["top-left", "center", "bottom-right"],
      4: ["top-left", "top-right", "bottom-left", "bottom-right"],
      5: ["top-left", "top-right", "center", "bottom-left", "bottom-right"],
      6: [
        "top-left",
        "top-right",
        "middle-left",
        "middle-right",
        "bottom-left",
        "bottom-right",
      ],
    };

    return (
      <div
        className={`w-16 h-16 bg-white rounded-lg shadow-md border-2 border-gray-300 relative ${
          rolling ? "animate-bounce" : ""
        }`}>
        {dotPositions[value].map((position, index) => {
          let positionClass = "";

          switch (position) {
            case "center":
              positionClass =
                "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
              break;
            case "top-left":
              positionClass = "top-2 left-2";
              break;
            case "top-right":
              positionClass = "top-2 right-2";
              break;
            case "middle-left":
              positionClass = "top-1/2 left-2 transform -translate-y-1/2";
              break;
            case "middle-right":
              positionClass = "top-1/2 right-2 transform -translate-y-1/2";
              break;
            case "bottom-left":
              positionClass = "bottom-2 left-2";
              break;
            case "bottom-right":
              positionClass = "bottom-2 right-2";
              break;
            default:
              positionClass = "";
          }

          return (
            <div
              key={index}
              className={`absolute ${positionClass} w-3 h-3 bg-black rounded-full`}
            />
          );
        })}
      </div>
    );
  };

  // Page principale du jeu
  return (
    <div className="min-h-screen bg-green-800 flex flex-col items-center py-8 px-4">
      <h1 className="text-4xl font-bold text-white mb-6">Jeu de 5000</h1>

      {!gameStarted ? (
        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Configuration</h2>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">
                Joueurs ({players.length})
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={removePlayer}
                  disabled={players.length <= 2}
                  className={`aspect-square p-1 rounded ${
                    players.length <= 2
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-red-500 text-white cursor-pointer"
                  }`}>
                  <FontAwesomeIcon
                    icon={faMinus}
                    className="text-white"
                    size="md"
                  />
                </button>
                <button
                  onClick={addPlayer}
                  disabled={players.length >= 5}
                  className={`aspect-square p-1 rounded ${
                    players.length >= 5
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-green-500 text-white cursor-pointer"
                  }`}>
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="text-white"
                    size="md"
                  />
                </button>
              </div>
            </div>

            {players.map((player) => (
              <div
                key={player.id}
                className="flex items-center mb-2">
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) => changePlayerName(player.id, e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
          </div>

          <button
            onClick={startNewGame}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
            Commencer la partie
          </button>
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          {/* Message du jeu */}
          <div className="bg-white rounded-lg p-4 mb-6 text-center shadow-lg">
            <p className="text-xl font-medium">{gameMessage}</p>
          </div>

          {/* Affichage du vainqueur */}
          {winner && (
            <div className="bg-yellow-300 rounded-lg p-6 mb-6 text-center shadow-lg flex flex-col items-center">
              <FontAwesomeIcon
                icon={faTrophy}
                size="3x"
                className="text-yellow-600 mb-4"
              />
              <h2 className="text-2xl font-bold">{winner.name} a gagné!</h2>
              <button
                onClick={startNewGame}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition">
                Nouvelle partie
              </button>
            </div>
          )}

          {/* Tableau des scores */}
          <div className="bg-white rounded-lg p-4 mb-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Tableau des scores
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {players.map((player, index) => (
                <div
                  key={player.id}
                  className={`p-3 rounded-lg ${
                    index === currentPlayerIndex
                      ? "bg-blue-100 border-2 border-blue-500"
                      : "bg-gray-100"
                  }`}>
                  <div className="font-semibold">{player.name}</div>
                  <div className="text-2xl font-bold">{player.score}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Zone de jeu */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Tour de {players[currentPlayerIndex].name}
            </h2>

            {/* Dés */}
            <div className="flex justify-center space-x-4 mb-6">
              {dice.map((value, index) => (
                <Dice
                  key={index}
                  value={value}
                />
              ))}
            </div>

            {/* Score temporaire */}
            <div className="mb-6 text-center">
              <p className="text-lg">Score temporaire</p>
              <p className="text-3xl font-bold">{tempScore}</p>
            </div>

            {/* Historique des lancers */}
            {rollHistory.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Lancers de ce tour:</h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {rollHistory.map((roll, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-100 p-2 rounded">
                      <div className="flex space-x-2">
                        {roll.dice.map((value, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 bg-white rounded flex items-center justify-center border border-gray-300">
                            {value}
                          </div>
                        ))}
                      </div>
                      <span className="font-semibold">{roll.points} pts</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bouton d'actions */}
            <div className="flex space-x-4">
              <button
                onClick={rollDice}
                disabled={rolling || winner !== null}
                className={`flex-1 py-3 rounded-lg font-bold flex items-center justify-center space-x-2 ${
                  rolling || winner !== null
                    ? "bg-gray-400"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white transition`}>
                <FontAwesomeIcon
                  icon={faArrowsRotate}
                  className="animate-spin"
                  size="lg"
                />
                <span>Lancer les dés</span>
              </button>

              <button
                onClick={keepScore}
                disabled={tempScore === 0 || rolling || winner !== null}
                className={`flex-1 py-3 rounded-lg font-bold ${
                  tempScore === 0 || rolling || winner !== null
                    ? "bg-gray-400"
                    : "bg-green-600 hover:bg-green-700"
                } text-white transition`}>
                Garder les points
              </button>
            </div>

            {/* Nouvelle partie */}
            <div className="mt-6 text-center">
              <button
                onClick={startNewGame}
                className="text-blue-600 hover:underline font-medium">
                Nouvelle partie
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Règles du jeu */}
      <div className="mt-8 bg-white rounded-lg p-6 w-full max-w-4xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Règles du jeu</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">
              Pour jouer au 5000, il vous faut :
            </h3>
            <ul className="list-disc ml-5">
              <li>3 dés</li>
              <li>Une feuille pour noter les scores</li>
              <li>Être de 2 à 5 joueurs</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Phase de jeu :</h3>
            <p>Lancer les dés et compter les points comme ceci :</p>
            <ul className="list-disc ml-5">
              <li>Un As (1) vaut 100 pts</li>
              <li>Un 5 vaut 50 pts</li>
              <li>
                Avoir 3 fois les mêmes dés vaut 100 fois le chiffre (ex : 3 fois
                5 = 500 pts)
              </li>
              <li>Avoir tous les As vaut 1000 pts</li>
              <li>Avoir 4-2-1 vaut 1500 pts</li>
            </ul>
          </div>

          <div>
            <p>
              Additionner les points entre chaque tour. Relancer tous les dés
              entre chaque tour jusqu'à ce que le joueur décide de marquer ses
              points.
            </p>
            <p>
              Marquer sur une feuille de scores les points de chaque joueur.
              Celui qui atteint le premier 5000 a gagné. Si le joueur dépasse ce
              score, il retombe à son ancien score (ex : 4800 + 350 = 4800).
            </p>
          </div>
        </div>
      </div>
      {/* Back to home */}
      <div className="absolute top-10 left-10">
        <a
          href="/"
          className="text-white">
          <FontAwesomeIcon
            icon={faDiamondTurnRight}
            flip="horizontal"
            size="2x"
          />
        </a>
      </div>
    </div>
  );
}
