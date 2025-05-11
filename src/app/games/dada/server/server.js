const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: "*",  // Permet toutes les origines
    methods: ["GET", "POST"],
  },
});

let rooms = {}; // Dictionnaire pour stocker les salles et leurs joueurs
// rooms = [roomName]: {
//    roomName: "",
//    players: [socket.id]: {
//      id: socket.id,
//      name: "",
//      color: "",
//      leader: false,
//    },
//      gameStarted: false,
//}]

io.on("connection", (socket) => {
  console.log("☑️ Un joueur s'est connecté : " + socket.id);

  socket.on("getRoomsList", () => {
    console.log("🔄 Demande de la liste des rooms");
    socket.emit("updateRoomsList", rooms);
  });

  socket.on("createRoom", (roomName) => {
    console.log("🔄 Création de la room : " + roomName);
    if (!rooms[roomName]) {
      rooms[roomName] = { roomName: roomName, players: {}, gameStarted: false };
      io.emit("updateRoomsList", rooms);
      socket.join(roomName);
      socket.emit("roomCreated", roomName);
      console.log("✅ Room créée : " + roomName);
      console.log("✅ Room jointe : " + roomName);
    } else {
      socket.emit("error", "[SRV] | La room existe déjà");
    }
  });

  socket.on("joinRoomBeforeEnter", (roomName) => {
    console.log("🔄 Un joueur rejoint la room : " + roomName);
    if (rooms[roomName]) {
      socket.join(roomName);
      socket.emit("roomJoined", roomName);
      console.log("✅ Room rejointe : " + roomName);
    } else {
      socket.emit("error", "[SRV] | La room n'existe pas et n'a pas pu être rejointe");
    }
  });

  socket.on("getInfoRoom", (aRoom) => {
    console.log("🔄 Demande d'infos sur la room : ", aRoom);
    const room = Object.keys(rooms).find((room) => aRoom === room);
    if (room) {
      socket.emit("infoRoom", rooms[room]);
      console.log("✅ Infos de la room envoyées : ", rooms[room]);
    } else {
      socket.emit("error", "[SRV] | Votre room n'a pas été trouvée");
      console.log("❌ Room non trouvée : " + aRoom);
    }
  });

  socket.on("joinRoomToPlay", (roomName, player) => {
    console.log("🔄 Un joueur est prêt à jouer dans la room : " + roomName);
    if (rooms[roomName]) {
      console.log("Count des joueurs dans la room : ", Object.keys(rooms[roomName].players).length);
      Object.keys(rooms[roomName].players).length === 0 && (player.leader = true); // Si c'est le premier joueur, il devient le leader
      rooms[roomName].players[socket.id] = player; // Ajout du joueur à la room (pas de .push() car pas de tableau [])
      socket.join(roomName);
      console.log("🏸🏸 LA ROOM : ", rooms[roomName]);
      io.emit("updateRoomsList", rooms);
      io.to(roomName).emit("infoRoom", rooms[roomName]);
      console.log("✅ Room jointe : " + roomName);
    } else {
      socket.emit("error", "[SRV] | La room n'existe pas et n'a pas pu être rejointe");
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ Un joueur s'est déconnecté : " + socket.id);
    // Suppr la room si le joueur était le dernier
    for (const room in rooms) {
      if (rooms[room].players[socket.id]) {
        console.log("JOUEUR TROUVER !");
        delete rooms[room].players[socket.id];
        if (Object.keys(rooms[room].players).length === 0) {
          delete rooms[room];
          io.emit("updateRoomsList", rooms);
          io.to(room).emit("infoRoom", rooms[room]);
          console.log("✅ Room supprimée : " + room);
        } else {
          console.log("Il reste des joueurs dans la room : " + room);
        }
      } else {
        console.log("JOUEUR PAS TROUVER !", rooms[room].players);
      }
    }
  });
});

server.listen(5000, () => {
  console.log("Serveur WebSocket en écoute sur http://localhost:5000");
});