"use client";
import React, { useState } from "react";
import Cell from "./Cell";

const GameBoard = () => {
  const [cells, setCells] = useState([
    { id: 1, x: 50, y: 50, color: "red", isSelected: false },
    { id: 2, x: 100, y: 100, color: "blue", isSelected: false },
    { id: 3, x: 150, y: 150, color: "green", isSelected: false },
  ]);
  const [selectedCell, setSelectedCell] = useState(null);
  return (
    <div>
      {cells.map((cell) => (
        <Cell
          key={cell.id}
          x={cell.x}
          y={cell.y}
          color={cell.color}
          isSelected={selectedCell === cell.id}
          onClick={() => {
            setSelectedCell(cell.id);
            setCells((prevCells) =>
              prevCells.map((c) =>
                c.id === cell.id ? { ...c, isSelected: !c.isSelected } : c
              )
            );
          }}
        />
      ))}
    </div>
  );
};

export default GameBoard;
