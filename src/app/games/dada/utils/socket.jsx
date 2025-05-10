import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";
// const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
export const socket = io(SOCKET_URL, { transports: ["websocket", "polling"] });
