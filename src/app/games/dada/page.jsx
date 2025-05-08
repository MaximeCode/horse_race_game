"use client";
import GameBoard from "./components/Board/GameBoard";
import BtnRollDice from "./components/Btn/BtnRollDice";

import { useState } from "react";
import DadaHeader from "./components/DadaHeader";
import PlayerInLobby from "./PlayerInLobby/page";

export default function Dada() {
  const [gameStarted, setGameStarted] = useState(false); // State to check if the game has started
  const [result, setResult] = useState(0); // Result of the dice roll

  return (
    <main className="min-h-screen w-full">
      <DadaHeader />
      {/* Show Lobby in first */}
      {!gameStarted ? (
        <PlayerInLobby
          gameStarted={gameStarted}
          setGameStarted={setGameStarted}
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
