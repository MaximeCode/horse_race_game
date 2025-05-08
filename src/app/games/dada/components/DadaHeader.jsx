import React from "react";

const DadaHeader = () => {
  return (
    <div className="text-center relative">
      {/* Ligne dorée supérieure */}
      <div className="h-1 w-full mx-auto mb-4 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 rounded-full" />
      <h1 className="text-4xl text-yellow-400 font-extrabold text-primary uppercase tracking-wider">
        <span className="inline-block transition-transform duration-300 hover:scale-125">
          🏇
        </span>{" "}
        Dada{" "}
        <span className="inline-block transition-transform duration-300 hover:scale-125">
          🏇
        </span>
      </h1>
      <p className="text-gray-500 italic mt-1">Le jeu des petits chevaux</p>
      {/* Ligne dorée inférieure */}
      <div className="h-1 w-full mx-auto mt-4 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 rounded-full" />
    </div>
  );
};

export default DadaHeader;
