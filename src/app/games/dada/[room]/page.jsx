"use client";
import GameBoard from "../components/Board/GameBoard";
import BtnRollDice from "../components/BtnRollDice";

import { useEffect, useState } from "react";
import Lobby from "../components/Lobby";

import { socket } from "../utils/socket"; // Import the socket instance

import { useParams } from "next/navigation";
import Link from "next/link";

export default function DadaGame() {
  const { room } = useParams(); // 👈 récupère room depuis l’URL

  const [gameStarted, setGameStarted] = useState(false); // State to check if the game has started
  const [result, setResult] = useState(0); // Result of the dice roll
  const [currentRoom, setCurrentRoom] = useState(null); // State to manage the current room

  useEffect(() => {
    socket.emit("getInfoRoom", room); // Emit event to get room info
    console.log("Récup des infos de la room");
    socket.on("infoRoom", (theRoom) => {
      console.log("Infos de la room : ", theRoom);
      setCurrentRoom(theRoom); // Set the current room
    });
  }, [room]);

  return (
    <main>
      {/* Show Lobby in first */}
      {currentRoom ? (
        !gameStarted ? (
          <Lobby
            gameStarted={gameStarted}
            setGameStarted={setGameStarted}
            room={currentRoom}
            socket={socket}
          />
        ) : (
          <article className="grid grid-cols-4 gap-4">
            <div className="flex flex-col items-center justify-center">
              <BtnRollDice
                result={result}
                setResult={setResult}
              />
            </div>
            <div className="col-span-3 relative w-full h-full flex items-center justify-center">
              <GameBoard />
            </div>
          </article>
        )
      ) : (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex flex-col items-center justify-center"
          role="alert">
          <strong className="font-bold">Erreur ! </strong>
          <span className="block sm:inline">
            Les informations de la room n'ont pas pu être récupérées.
          </span>
          <Link href={"/games/dada"}>
            <button className="btn btn-error mt-4">
              Retour à la liste des rooms
            </button>
          </Link>
        </div>
      )}
    </main>
  );
}
