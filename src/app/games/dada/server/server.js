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

  socket.on("joinGame", ({ name, color }) => {
    const player = {
      id: socket.id,
      name,
      color,
    };
    players.push(player);
    console.log(`Joueur ${name} (${color}) a rejoint la partie.`);
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

