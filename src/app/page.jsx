"use client";

import Header from "./Components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChessKnight,
  faDice,
  faDiceFour,
  faDiceTwo,
  faDiceOne,
  faDiceFive,
  faDiceSix,
  faDiamond,
} from "@fortawesome/free-solid-svg-icons";

export default function App() {
  // Liste des jeux
  // Status : A pour "Available", NA pour "Not Available", IP pour "In Progress"
  const games = [
    {
      id: "yahtzee",
      name: "Yahtzee",
      description: "Lancez les dés, scorez des points et gagnez la partie !",
      icon: (
        <FontAwesomeIcon
          icon={faDice}
          size="3x"
          color="wheat"
        />
      ),
      status: "A", // A pour "Available"
    },
    {
      id: "dada",
      name: "Jeu des Petits Chevaux",
      description:
        "Faites avancer votre cavalerie et atteignez l'arrivée en premier !",
      icon: (
        <FontAwesomeIcon
          icon={faChessKnight}
          size="3x"
          color="wheat"
        />
      ),
      status: "IP",
    },
    {
      id: "421",
      name: "421",
      description:
        "Obtenez les meilleures combinaisons de dés et distribuer vos jetons !",
      icon: (
        <div className="flex space-x-2">
          <FontAwesomeIcon
            icon={faDiceFour}
            size="3x"
            color="wheat"
          />
          <FontAwesomeIcon
            icon={faDiceTwo}
            size="3x"
            color="wheat"
          />
          <FontAwesomeIcon
            icon={faDiceOne}
            size="3x"
            color="wheat"
          />
        </div>
      ),
      status: "NA",
    },
    {
      id: "5000",
      name: "5000",
      description: "Lancez les dés et accumulez 5000 points pour gagner !",
      icon: (
        <FontAwesomeIcon
          icon={faDiceFive}
          size="3x"
          color="wheat"
        />
      ),
      status: "A",
    },
  ];

  const handleGameClick = (gameId) => {
    console.log("Jeu sélectionné :", gameId);
    // Redirigez vers la page du jeu sélectionné
    if (gameId == "yahtzee") {
      // Redirection vers le jeu Yahtzee
      console.log("Redirection vers le jeu :", gameId);
      window.open("https://yahtzee-app.vercel.app/", "_blank");
    } else {
      window.location.href = `/games/${gameId}`;
    }
  };

  return (
    <div className="min-h-screen bg-[#4d4735] flex flex-col items-center text-gray-200">
      {/* Header */}
      <header className="bg-black w-full py-6 flex flex-col space-y-3 justify-center items-center">
        <Header />
        <p className="text-wheat text-xl">
          Les jeux d'hier dans l'univers de demain !
        </p>
      </header>
      {/* Main content */}
      <main className="w-full max-w-6xl flex-grow p-6">
        <h2 className="text-wheat text-3xl font-bold text-center mb-12">
          Découvrez nos jeux de société en ligne
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {games.map((game) => (
            <div
              key={game.id}
              className={`relative bg-black bg-opacity-30 rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 ${
                game.status === "A" ? "cursor-pointer" : "cursor-not-allowed"
              }`}>
              <div className="p-8 flex flex-col items-center text-center text-wheat">
                <div className="mb-4">{game.icon}</div>
                <h3 className="text-3xl font-bold mb-2">{game.name}</h3>
                <p className="mb-6">{game.description}</p>
                <button
                  className={`px-6 py-3 rounded-lg font-bold transition-colors border-1 border-[#266041] hover:bg-[#37664d] text-wheat ${
                    game.status === "A"
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  }`}
                  onClick={() =>
                    game.status === "A" || game.status === "IP"
                      ? handleGameClick(game.id)
                      : null
                  }>
                  {/* Renvoyer vers le lien uniquement si le jeu est disponible */}
                  Jouer maintenant
                </button>
              </div>

              {/* Status Badge */}
              <div
                className={`absolute top-4 right-4 px-3 py-1 rounded-sm text-xs font-semibold ${
                  game.status === "A"
                    ? "bg-green-500 text-white"
                    : game.status === "IP"
                    ? "bg-yellow-500 text-white"
                    : "bg-red-500 text-white"
                }`}>
                {game.status === "A"
                  ? "Disponible"
                  : game.status === "IP"
                  ? "En cours de développement"
                  : "Non disponible"}
              </div>
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
            <FontAwesomeIcon
              icon={faDiamond}
              size="lg"
              className="mr-2"
              color="wheat"
            />
            <span className="text-wheat font-bold">1, 2, 3 Games</span>
            <FontAwesomeIcon
              icon={faDiamond}
              size="lg"
              className="ml-2"
              color="wheat"
            />
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
