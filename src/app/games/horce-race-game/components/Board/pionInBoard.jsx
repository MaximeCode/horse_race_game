"use client";
import React from "react";
import clsx from "clsx";

import {
  boardPath,
  homes,
  piecesInHomes,
  pionGrid,
  bluePions,
  yellowPions,
  redPions,
  greenPions,
} from "@/components/data/theBoardGame";

const PionInBoard = () => {
  return (
    <div
      data-theme="custom-overrides"
      className="w-full max-w-[600px] aspect-square grid grid-cols-15 grid-rows-15">
      {/* {pionGrid.map((row, rowIndex) =>
        // je met quoi ici ?
        
      )} */}
      oui
    </div>
  );
};

export default PionInBoard;
