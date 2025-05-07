"use client";

import { useState } from "react";

export default function App() {
  const [hoveredGame, setHoveredGame] = useState(null);

  // Liste des jeux
  const games = [
    {
      id: "yahtzee",
      name: "Yahtzee",
      description: "Lancez les dés, scorez des points et gagnez la partie !",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="wheat"
          strokeWidth="2">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            ry="2"
          />
          <circle
            cx="8.5"
            cy="8.5"
            r="1"
            fill="wheat"
          />
          <circle
            cx="15.5"
            cy="8.5"
            r="1"
            fill="wheat"
          />
          <circle
            cx="15.5"
            cy="15.5"
            r="1"
            fill="wheat"
          />
          <circle
            cx="8.5"
            cy="15.5"
            r="1"
            fill="wheat"
          />
          <circle
            cx="12"
            cy="12"
            r="1"
            fill="wheat"
          />
        </svg>
      ),
    },
    {
      id: "petits-chevaux",
      name: "Jeu des Petits Chevaux",
      description:
        "Faites avancer vos pions et atteignez l'arrivée en premier !",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="wheat"
          strokeWidth="2">
          <path d="M19 20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-8H2l10-9 10 9h-3v8z" />
          <path d="M12 10v10" />
          <path d="M8 16h8" />
        </svg>
      ),
    },
    {
      id: "421",
      name: "421",
      description:
        "Obtenez les meilleures combinaisons de dés et prenez les jetons !",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="wheat"
          strokeWidth="2">
          <rect
            x="2"
            y="2"
            width="6"
            height="6"
            rx="1"
          />
          <rect
            x="9"
            y="2"
            width="6"
            height="6"
            rx="1"
          />
          <rect
            x="16"
            y="2"
            width="6"
            height="6"
            rx="1"
          />
          <circle
            cx="5"
            cy="5"
            r="1"
            fill="wheat"
          />
          <circle
            cx="12"
            cy="5"
            r="2"
            fill="none"
          />
          <path d="M17 5h4" />
        </svg>
      ),
    },
    {
      id: "5000",
      name: "5000",
      description: "Lancez les dés et accumulez 5000 points pour gagner !",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="wheat"
          strokeWidth="2">
          <path d="M8 2h8l4 10-4 10H8L4 12z" />
          <path d="M16 18.5 11 12 16 5.5" />
          <path d="M8 18.5 3 12 8 5.5" />
        </svg>
      ),
    },
  ];

  const handleGameClick = (gameId) => {
    // Dans une vraie application, cela pourrait être une redirection
    console.log(`Navigating to ${gameId}`);
    alert(`Redirection vers le jeu: ${gameId}`);
  };

  return (
    <div className="min-h-screen bg-[#4d4735] flex flex-col items-center">
      {/* Header */}
      <header className="w-full py-6 flex justify-center items-center">
        <a
          href="/"
          className="flex items-center text-wheat text-4xl font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="wheat"
            strokeWidth="2"
            className="mr-2">
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="2"
              ry="2"
            />
            <circle
              cx="8.5"
              cy="8.5"
              r="1"
              fill="wheat"
            />
            <circle
              cx="15.5"
              cy="8.5"
              r="1"
              fill="wheat"
            />
            <circle
              cx="15.5"
              cy="15.5"
              r="1"
              fill="wheat"
            />
            <circle
              cx="8.5"
              cy="15.5"
              r="1"
              fill="wheat"
            />
            <circle
              cx="12"
              cy="12"
              r="1"
              fill="wheat"
            />
          </svg>
          1, 2, 3 Games
        </a>
      </header>

      {/* Hero Section */}
      <div className="w-full py-12 bg-black bg-opacity-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-wheat text-5xl font-bold mb-4">1, 2, 3 Games</h1>
          <p className="text-wheat text-xl">
            Les jeux d'hier dans l'univers de demain !
          </p>
        </div>
      </div>

      {/* Main content */}
      <main className="w-full max-w-6xl flex-grow p-6">
        <h2 className="text-wheat text-3xl font-bold text-center mb-12">
          Découvrez nos jeux de société en ligne
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {games.map((game) => (
            <div
              key={game.id}
              className="relative bg-black bg-opacity-30 rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 transform hover:scale-105"
              onClick={() => handleGameClick(game.id)}>
              <div className="p-8 flex flex-col items-center text-center text-wheat">
                <div className="mb-4">{game.icon}</div>
                <h3 className="text-3xl font-bold mb-2">{game.name}</h3>
                <p className="mb-6">{game.description}</p>
                <button
                  className={
                    "px-6 py-3 rounded-lg font-bold transition-colors border-1 border-[#266041] hover:bg-[#266041] text-wheat"
                  }>
                  Jouer maintenant
                </button>
              </div>

              {game.id === "yahtzee" && (
                <div className="absolute top-4 right-4">
                  <div className="bg-[#4caf50] text-white text-xs px-2 py-1 rounded">
                    Disponible
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Features Section */}
      <section className="w-full py-12 bg-black bg-opacity-30">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-wheat text-3xl font-bold text-center mb-12">
            Pourquoi jouer sur 1, 2, 3 Games ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center text-wheat">
              <div className="p-4 rounded-full bg-[#266041] mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="wheat"
                  strokeWidth="2">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                  <path d="M12 7v5l4 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Jeux traditionnels</h3>
              <p>
                Redécouvrez les jeux qui ont bercé votre enfance dans une
                nouvelle expérience digitale.
              </p>
            </div>

            <div className="flex flex-col items-center text-center text-wheat">
              <div className="p-4 rounded-full bg-[#266041] mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="wheat"
                  strokeWidth="2">
                  <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8" />
                  <path d="M10 19v-3.96 3.15" />
                  <path d="M7 19h5" />
                  <rect
                    width="6"
                    height="10"
                    x="16"
                    y="12"
                    rx="2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Technologie moderne</h3>
              <p>
                Interface intuitive et responsive pour jouer sur n'importe quel
                appareil, où que vous soyez.
              </p>
            </div>

            <div className="flex flex-col items-center text-center text-wheat">
              <div className="p-4 rounded-full bg-[#266041] mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="wheat"
                  strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle
                    cx="9"
                    cy="7"
                    r="4"
                  />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Jouez ensemble</h3>
              <p>
                Invitez vos amis et votre famille pour partager des moments de
                convivialité et de compétition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-[#4d4735] bg-opacity-40">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="wheat"
              strokeWidth="2"
              className="mr-2">
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                ry="2"
              />
              <circle
                cx="8.5"
                cy="8.5"
                r="1"
                fill="wheat"
              />
              <circle
                cx="15.5"
                cy="8.5"
                r="1"
                fill="wheat"
              />
              <circle
                cx="15.5"
                cy="15.5"
                r="1"
                fill="wheat"
              />
              <circle
                cx="8.5"
                cy="15.5"
                r="1"
                fill="wheat"
              />
              <circle
                cx="12"
                cy="12"
                r="1"
                fill="wheat"
              />
            </svg>
            <span className="text-wheat font-bold">1, 2, 3 Games</span>
          </div>
          <div className="text-wheat">
            <p>
              © 2025 1, 2, 3 Games - Les jeux d'hier dans l'univers de demain !
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
