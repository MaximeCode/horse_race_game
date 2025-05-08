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

io.on("connection", (socket) => {
  console.log("Joueur connecté :", socket.id);
  socket.emit("updatePlayers", players); // Envoie la liste des joueurs au nouveau joueur

  socket.on("joinGame", ({ name, color }) => {
    const player = {
      id: socket.id,
      name,
      color,
      leader: players.length === 0, // Le premier joueur devient le leader
    };
    players.push(player);
    console.log(`${players.length === 0 ? "[LEADER]" : "[Player]"} | Joueur ${name} (${color}) a rejoint la partie.`);
    io.emit("updatePlayers", players);
  })

  socket.on("disconnect", () => {
    console.log("❌ Déconnecté du WebSocket");
    players = players.filter((player) => player.id !== socket.id);
    console.log("Joueur déconnecté :", socket.id);
    // Diffuser la mise à jour
    io.emit("updatePlayers", players);
  });
});

server.listen(5000, () => {
  console.log("Serveur WebSocket en écoute sur http://localhost:5000");
});

