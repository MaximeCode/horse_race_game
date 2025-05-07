"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiamond,
  faDice,
  faChess,
  faPuzzlePiece,
  faChessKnight,
  faGem,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [bounceIcon, setBounceIcon] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(faDiamond);

  // Effet pour faire tourner les icônes de jeu
  useEffect(() => {
    const icons = [
      faDiamond,
      faDice,
      faChess,
      faPuzzlePiece,
      faChessKnight,
      faGem,
    ];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % icons.length;
      setCurrentIcon(icons[index]);
      setBounceIcon(true);
      setTimeout(() => setBounceIcon(false), 300);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black py-3 px-4 shadow-lg">
      <a
        href="/"
        className="flex items-center justify-center text-wheat text-4xl font-bold relative group">
        {/* Left icon with animation */}
        <div
          className={`transition-transform duration-300 ${
            bounceIcon ? "scale-125" : "scale-100"
          }`}>
          <FontAwesomeIcon
            icon={currentIcon}
            size="lg"
            className="mr-4"
            color="wheat"
          />
        </div>

        {/* Main text with hover effect */}
        <div className="relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-100">
            1, 2, 3 Games
          </span>

          {/* Animated underline */}
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-200 to-yellow-100 group-hover:w-full transition-all duration-500"></div>
        </div>

        {/* Right icon with animation - mirrors the left */}
        <div
          className={`transition-transform duration-300 ${
            bounceIcon ? "scale-125" : "scale-100"
          }`}>
          <FontAwesomeIcon
            icon={currentIcon}
            size="lg"
            className="ml-4"
            color="wheat"
          />
        </div>
      </a>
    </div>
  );
};

export default Header;
