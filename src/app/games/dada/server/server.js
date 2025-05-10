const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer();

const io = new Server(server, {
	cors: {
		origin: "*",  // Permet toutes les origines
		methods: ["GET", "POST"],
	},
});

