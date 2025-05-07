"use client";
import React from "react";
import clsx from "clsx";

import { boardPath, homes, piecesInHomes } from "../../data/theBoardGame";

const GameBoard = () => {
  return (
    <div className="w-full max-w-[800px] aspect-square grid grid-cols-15 grid-rows-15 border border-white">
      {boardPath.map((pos) => (
        <div
          key={`${pos.x}-${pos.y}`}
          className={clsx(
            "relative w-full h-full grid place-items-center text-white font-bold text-xl border border-white",
            pos.color && `bg-${pos.color}-500`
          )}
          style={{ gridColumn: pos.x + 1, gridRow: pos.y + 1 }}>
          {/* Start arrow */}
          <div
            className={clsx(
              "absolute w-10/12 h-10/12 flex items-center justify-center",
              pos.color && `bg-${pos.color}-100`,
              pos.scale && "rounded-full"
            )}
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}>
            {pos.start && (
              <div
                className={`w-6 h-6 rounded-full bg-${pos.color}-500 flex justify-center items-center`}>
                D
              </div>
            )}
            {pos.scale && (
              <div
                className={`w-6 h-6 rounded-full bg-${pos.color}-500 flex justify-center items-center`}>
                {pos.scale}
              </div>
            )}
            {pos.win && (
              <div className="w-8 h-8 rounded-full border border-amber-500 flex justify-center items-center">
                🏆
              </div>
            )}
          </div>
        </div>
      ))}
      {/* Homes */}
      {homes.map((home) => (
        <div
          key={`${home.x}-${home.y}`}
          className={clsx(
            "relative w-full h-full grid place-items-center text-white font-bold text-xl",
            `bg-${home.home}-700`
          )}
          style={{ gridColumn: home.x + 1, gridRow: home.y + 1 }}></div>
      ))}
      {/* Pieces in homes */}
      {Object.entries(piecesInHomes).map(([color, pieces]) =>
        pieces.map((piece, index) => (
          <div
            key={`${color}-${index}`}
            className={clsx(
              "flex items-center justify-center border border-white",
              `bg-${color}-500`
            )}
            style={{
              gridColumn: piece.x + 1,
              gridRow: piece.y + 1,
            }}>
            <div className="w-6 h-6 rounded-full bg-white flex justify-center items-center">
              <span className={`text-${color}-500`}>{index + 1}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GameBoard;
