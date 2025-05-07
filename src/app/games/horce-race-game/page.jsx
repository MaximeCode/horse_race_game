"use client";
import GameBoard from "@/app/horce-race-game/components/Board/GameBoard";
import PionInBoard from "@/app/horce-race-game/components/Board/pionInBoard";
import BtnRollDice from "@/app/horce-race-game/components/Btn/BtnRollDice";

import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState(0);
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-8 text-primary">🏇 DADA 🏇</h1>
        <BtnRollDice
          result={result}
          setResult={setResult}
        />
      </div>
      <div className="relative w-full h-full">
        <GameBoard />

        <div className="absolute top-0 left-0">
          <PionInBoard />
        </div>
      </div>
    </main>
  );
}
