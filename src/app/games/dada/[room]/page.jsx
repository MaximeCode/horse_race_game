"use client";
import GameBoard from "../components/Board/GameBoard";
import BtnRollDice from "../components/BtnRollDice";

import { useState } from "react";
import PlayerInLobby from "../components/Lobby";

import { useParams } from "next/navigation";

export default function DadaGame() {
  const { room } = useParams(); // 👈 récupère room depuis l’URL

  const [gameStarted, setGameStarted] = useState(false); // State to check if the game has started
  const [result, setResult] = useState(0); // Result of the dice roll

  return (
    <main>
      {/* Show Lobby in first */}
      {!gameStarted ? (
        <PlayerInLobby
          gameStarted={gameStarted}
          setGameStarted={setGameStarted}
          room={room}
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
      )}
    </main>
  );
}
