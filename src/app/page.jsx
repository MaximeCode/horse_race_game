"use client";
import GameBoard from "@/components/Board/GameBoard";
import BtnRollDice from "@/components/Btn/BtnRollDice";

import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState(0);
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-8 text-primary">Dice Game</h1>
        <BtnRollDice
          result={result}
          setResult={setResult}
        />
      </div>
      <GameBoard />
    </main>
  );
}
