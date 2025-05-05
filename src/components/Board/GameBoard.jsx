"use client";
import React, { useState } from "react";
import clsx from "clsx";

// Configuration des maisons pour chaque couleur
const piecesInHomes = {
  blue: [
    { x: 11, y: 2, color: "blue" },
    { x: 12, y: 2 },
    { x: 11, y: 3 },
    { x: 12, y: 3 },
  ],
  yellow: [
    { x: 11, y: 11 },
    { x: 12, y: 11 },
    { x: 11, y: 12 },
    { x: 12, y: 12 },
  ],
  red: [
    { x: 2, y: 11 },
    { x: 3, y: 11 },
    { x: 2, y: 12 },
    { x: 3, y: 12 },
  ],
  green: [
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 3 },
  ],
};

// Maisons de départ pour chaque couleur
const homes = [
  // Green additional cells between (0,0) and (5,5)
  { x: 0, y: 0, home: "green" },
  { x: 0, y: 1, home: "green" },
  { x: 0, y: 2, home: "green" },
  { x: 0, y: 3, home: "green" },
  { x: 0, y: 4, home: "green" },
  { x: 0, y: 5, home: "green" },
  { x: 1, y: 0, home: "green" },
  { x: 1, y: 1, home: "green" },
  { x: 1, y: 2, home: "green" },
  { x: 1, y: 3, home: "green" },
  { x: 1, y: 4, home: "green" },
  { x: 1, y: 5, home: "green" },
  { x: 2, y: 0, home: "green" },
  { x: 2, y: 1, home: "green" },
  { x: 2, y: 4, home: "green" },
  { x: 2, y: 5, home: "green" },
  { x: 3, y: 0, home: "green" },
  { x: 3, y: 1, home: "green" },
  { x: 3, y: 4, home: "green" },
  { x: 3, y: 5, home: "green" },
  { x: 4, y: 0, home: "green" },
  { x: 4, y: 1, home: "green" },
  { x: 4, y: 2, home: "green" },
  { x: 4, y: 3, home: "green" },
  { x: 4, y: 4, home: "green" },
  { x: 4, y: 5, home: "green" },
  { x: 5, y: 0, home: "green" },
  { x: 5, y: 1, home: "green" },
  { x: 5, y: 2, home: "green" },
  { x: 5, y: 3, home: "green" },
  { x: 5, y: 4, home: "green" },
  { x: 5, y: 5, home: "green" },

  // Blue additional cells between (9,0) and (14,5)
  { x: 9, y: 0, home: "blue" },
  { x: 9, y: 1, home: "blue" },
  { x: 9, y: 2, home: "blue" },
  { x: 9, y: 3, home: "blue" },
  { x: 9, y: 4, home: "blue" },
  { x: 9, y: 5, home: "blue" },
  { x: 10, y: 0, home: "blue" },
  { x: 10, y: 1, home: "blue" },
  { x: 10, y: 2, home: "blue" },
  { x: 10, y: 3, home: "blue" },
  { x: 10, y: 4, home: "blue" },
  { x: 10, y: 5, home: "blue" },
  { x: 11, y: 0, home: "blue" },
  { x: 11, y: 1, home: "blue" },
  { x: 11, y: 4, home: "blue" },
  { x: 11, y: 5, home: "blue" },
  { x: 12, y: 0, home: "blue" },
  { x: 12, y: 1, home: "blue" },
  { x: 12, y: 4, home: "blue" },
  { x: 12, y: 5, home: "blue" },
  { x: 13, y: 0, home: "blue" },
  { x: 13, y: 1, home: "blue" },
  { x: 13, y: 2, home: "blue" },
  { x: 13, y: 3, home: "blue" },
  { x: 13, y: 4, home: "blue" },
  { x: 13, y: 5, home: "blue" },
  { x: 14, y: 0, home: "blue" },
  { x: 14, y: 1, home: "blue" },
  { x: 14, y: 2, home: "blue" },
  { x: 14, y: 3, home: "blue" },
  { x: 14, y: 4, home: "blue" },
  { x: 14, y: 5, home: "blue" },

  // Red additional cells between (0,9) and (5,14)
  { x: 0, y: 9, home: "red" },
  { x: 0, y: 10, home: "red" },
  { x: 0, y: 11, home: "red" },
  { x: 0, y: 12, home: "red" },
  { x: 0, y: 13, home: "red" },
  { x: 0, y: 14, home: "red" },
  { x: 1, y: 9, home: "red" },
  { x: 1, y: 10, home: "red" },
  { x: 1, y: 11, home: "red" },
  { x: 1, y: 12, home: "red" },
  { x: 1, y: 13, home: "red" },
  { x: 1, y: 14, home: "red" },
  { x: 2, y: 9, home: "red" },
  { x: 2, y: 10, home: "red" },
  { x: 2, y: 13, home: "red" },
  { x: 2, y: 14, home: "red" },
  { x: 3, y: 9, home: "red" },
  { x: 3, y: 10, home: "red" },
  { x: 3, y: 13, home: "red" },
  { x: 3, y: 14, home: "red" },
  { x: 4, y: 9, home: "red" },
  { x: 4, y: 10, home: "red" },
  { x: 4, y: 11, home: "red" },
  { x: 4, y: 12, home: "red" },
  { x: 4, y: 13, home: "red" },
  { x: 4, y: 14, home: "red" },
  { x: 5, y: 9, home: "red" },
  { x: 5, y: 10, home: "red" },
  { x: 5, y: 11, home: "red" },
  { x: 5, y: 12, home: "red" },
  { x: 5, y: 13, home: "red" },
  { x: 5, y: 14, home: "red" },

  // Yellow additional cells between (9,9) and (14,14)
  { x: 9, y: 9, home: "yellow" },
  { x: 9, y: 10, home: "yellow" },
  { x: 9, y: 11, home: "yellow" },
  { x: 9, y: 12, home: "yellow" },
  { x: 9, y: 13, home: "yellow" },
  { x: 9, y: 14, home: "yellow" },
  { x: 10, y: 9, home: "yellow" },
  { x: 10, y: 10, home: "yellow" },
  { x: 10, y: 11, home: "yellow" },
  { x: 10, y: 12, home: "yellow" },
  { x: 10, y: 13, home: "yellow" },
  { x: 10, y: 14, home: "yellow" },
  { x: 11, y: 9, home: "yellow" },
  { x: 11, y: 10, home: "yellow" },
  { x: 11, y: 13, home: "yellow" },
  { x: 11, y: 14, home: "yellow" },
  { x: 12, y: 9, home: "yellow" },
  { x: 12, y: 10, home: "yellow" },
  { x: 12, y: 13, home: "yellow" },
  { x: 12, y: 14, home: "yellow" },
  { x: 13, y: 9, home: "yellow" },
  { x: 13, y: 10, home: "yellow" },
  { x: 13, y: 11, home: "yellow" },
  { x: 13, y: 12, home: "yellow" },
  { x: 13, y: 13, home: "yellow" },
  { x: 13, y: 14, home: "yellow" },
  { x: 14, y: 9, home: "yellow" },
  { x: 14, y: 10, home: "yellow" },
  { x: 14, y: 11, home: "yellow" },
  { x: 14, y: 12, home: "yellow" },
  { x: 14, y: 13, home: "yellow" },
  { x: 14, y: 14, home: "yellow" },
];

const boardPath = [
  // Blue path
  { x: 7, y: 0, color: "blue" }, // id 0
  { x: 8, y: 0, color: "blue", start: true },
  { x: 8, y: 1, color: "blue" },
  { x: 8, y: 2, color: "blue" },
  { x: 8, y: 3, color: "blue" },
  { x: 8, y: 4, color: "blue" }, // id 5
  { x: 8, y: 5, color: "blue" },
  { x: 8, y: 6, color: "blue" },
  { x: 9, y: 6, color: "blue" },
  { x: 10, y: 6, color: "blue" },
  { x: 11, y: 6, color: "blue" }, // id 10
  { x: 12, y: 6, color: "blue" },
  { x: 13, y: 6, color: "blue" },
  { x: 14, y: 6, color: "blue" },
  // Yellow path
  { x: 14, y: 7, color: "yellow" },
  { x: 14, y: 8, color: "yellow", start: true }, // id 15
  { x: 13, y: 8, color: "yellow" },
  { x: 12, y: 8, color: "yellow" },
  { x: 11, y: 8, color: "yellow" },
  { x: 10, y: 8, color: "yellow" },
  { x: 9, y: 8, color: "yellow" }, // id 20
  { x: 8, y: 8, color: "yellow" },
  { x: 8, y: 9, color: "yellow" },
  { x: 8, y: 10, color: "yellow" },
  { x: 8, y: 11, color: "yellow" },
  { x: 8, y: 12, color: "yellow" }, // id 25
  { x: 8, y: 13, color: "yellow" },
  { x: 8, y: 14, color: "yellow" },
  // Red path
  { x: 7, y: 14, color: "red" },
  { x: 6, y: 14, color: "red", start: true },
  { x: 6, y: 13, color: "red" }, // id 30
  { x: 6, y: 12, color: "red" },
  { x: 6, y: 11, color: "red" },
  { x: 6, y: 10, color: "red" },
  { x: 6, y: 9, color: "red" },
  { x: 6, y: 8, color: "red" }, // id 35
  { x: 5, y: 8, color: "red" },
  { x: 4, y: 8, color: "red" },
  { x: 3, y: 8, color: "red" },
  { x: 2, y: 8, color: "red" },
  { x: 1, y: 8, color: "red" }, // id 40
  { x: 0, y: 8, color: "red" },
  // Green path
  { x: 0, y: 7, color: "green" },
  { x: 0, y: 6, color: "green", start: true },
  { x: 1, y: 6, color: "green" },
  { x: 2, y: 6, color: "green" }, // id 45
  { x: 3, y: 6, color: "green" },
  { x: 4, y: 6, color: "green" },
  { x: 5, y: 6, color: "green" },
  { x: 6, y: 6, color: "green" },
  { x: 6, y: 5, color: "green" }, // id 50
  { x: 6, y: 4, color: "green" },
  { x: 6, y: 3, color: "green" },
  { x: 6, y: 2, color: "green" },
  { x: 6, y: 1, color: "green" },
  { x: 6, y: 0, color: "green" }, // id 55

  // Blue scale
  { x: 7, y: 1, color: "blue", scale: 1 },
  { x: 7, y: 2, color: "blue", scale: 2 },
  { x: 7, y: 3, color: "blue", scale: 3 },
  { x: 7, y: 4, color: "blue", scale: 4 },
  { x: 7, y: 5, color: "blue", scale: 5 }, // id 60
  { x: 7, y: 6, color: "blue", scale: 6 },

  // Yellow scale
  { x: 13, y: 7, color: "yellow", scale: 1 },
  { x: 12, y: 7, color: "yellow", scale: 2 },
  { x: 11, y: 7, color: "yellow", scale: 3 },
  { x: 10, y: 7, color: "yellow", scale: 4 }, // id 65
  { x: 9, y: 7, color: "yellow", scale: 5 },
  { x: 8, y: 7, color: "yellow", scale: 6 },

  // Red scale
  { x: 7, y: 13, color: "red", scale: 1 },
  { x: 7, y: 12, color: "red", scale: 2 },
  { x: 7, y: 11, color: "red", scale: 3 }, // id 70
  { x: 7, y: 10, color: "red", scale: 4 },
  { x: 7, y: 9, color: "red", scale: 5 },
  { x: 7, y: 8, color: "red", scale: 6 },

  // Green scale
  { x: 1, y: 7, color: "green", scale: 1 },
  { x: 2, y: 7, color: "green", scale: 2 }, // id 75
  { x: 3, y: 7, color: "green", scale: 3 },
  { x: 4, y: 7, color: "green", scale: 4 },
  { x: 5, y: 7, color: "green", scale: 5 },
  { x: 6, y: 7, color: "green", scale: 6 },

  // WIN
  { x: 7, y: 7, win: true }, // id 80
];

const GameBoard = () => {
  return (
    <div
      data-theme="custom-overrides"
      className="w-full max-w-[600px] aspect-square grid grid-cols-15 grid-rows-15 border border-gray-700">
      {boardPath.map((pos) => (
        <div
          key={`${pos.x}-${pos.y}`}
          className={clsx(
            "relative w-full h-full grid place-items-center text-white font-bold text-xl",
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
              "flex items-center justify-center",
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
