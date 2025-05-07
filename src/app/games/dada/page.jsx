"use client";
import GameBoard from "./components/Board/GameBoard";
import BtnRollDice from "./components/Btn/BtnRollDice";

import { useState } from "react";
import DadaHeader from "./components/DadaHeader";

export default function Dada() {
  const [result, setResult] = useState(0);

  return (
    <main className="min-h-screen w-full">
      <DadaHeader />
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
    </main>
  );
}
