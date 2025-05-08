const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let players = [];

function updateLeader() {
  // Tout le monde perd le rôle
  players.forEach((p) => (p.leader = false));

  // Le premier joueur devient leader (s’il y en a un)
  if (players.length > 0) {
    players[0].leader = true;
  }
}

io.on("connection", (socket) => {
  console.log("Joueur connecté :", socket.id);
  socket.emit("updatePlayers", players); // Envoie la liste des joueurs au nouveau joueur

  socket.on("joinGame", ({ name, color }) => {
    const nameAlreadyTaken = players.some((p) => p.name === name);
    if (nameAlreadyTaken) {
      socket.emit("errorJoin", "Ce nom est déjà pris ! (Erreur server !)");
      return;
    }

    const player = {
      id: socket.id,
      name,
      color,
      leader: false,
    };
    players.push(player);
    updateLeader(); // Met à jour le leader après l'ajout d'un joueur

    console.log(`${player.leader ? "[LEADER]" : "[Player]"} | Joueur ${name} (${color}) a rejoint la partie.`);
    io.emit("updatePlayers", players);
  })

  socket.on("disconnect", () => {
    console.log("❌ Déconnecté du WebSocket");
    players = players.filter((player) => player.id !== socket.id);
    updateLeader(); // Met à jour le leader après l'ajout d'un joueur

    console.log("Joueur déconnecté :", socket.id);
    // Diffuser la mise à jour
    io.emit("updatePlayers", players);
  });
});

server.listen(5000, () => {
  console.log("Serveur WebSocket en écoute sur http://localhost:5000");
});

