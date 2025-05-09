"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import useSocket from "./utils/useSocket";

export default function HomeDada() {
  const [roomList, setRoomList] = useState([]); // Le websocket renvoi un tableau de rooms et non un objet

  const router = useRouter(); // Hook to manage routing
  const socketRef = useSocket();

  useEffect(() => {
    if (!socketRef.current) return;
    const socket = socketRef.current;

    socket.emit("getRoomsList"); // demander la liste des rooms

    socket.on("updateRoomList", (rooms) => {
      setRoomList(rooms);
      console.log("Liste des rooms :", rooms);
    });

    return () => {
      socket.off("updateRoomList");
    };
  }, []);

  function handleCreateRoom() {
    const roomName = prompt("Entrez le nom de votre room :"); // !!! FAIRE UNE MODAL FLOWBITE !!!
    if (roomName) {
      socketRef.current.emit("createRoom", roomName); // Créer la room avec son nom en param
      socketRef.current.once("roomCreated", (roomId) => {
        router.push(`/games/dada/${roomId}`);
      });
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline text-center">
        Choisissez votre room !
      </h1>
      <div className="flex flex-col justify-center items-center gap-y-5 mt-5">
        {roomList.length > 0 ? (
          roomList.map((room) => {
            console.log("Room :", room);
            return (
              <div
                key={room.roomId}
                className="bg-white rounded-lg py-3 px-6 w-xl border border-amber-300 flex justify-between items-center">
                <h2 className="text-xl text-amber-600">{room.roomId}</h2>
                <p>{room.nbPlayers} players</p>
                <button
                  className="bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 transition duration-200 cursor-pointer"
                  onClick={() => {
                    router.push(`/games/dada/${room.roomId}`);
                  }}>
                  Rejoindre
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-center">Aucune room disponible</p>
        )}
      </div>
      <div className="flex flex-col items-center justify-center mt-5">
        <button
          className="bg-blue-600 text-white text-lg py-2 px-4 mt-5 rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer"
          onClick={() => {
            handleCreateRoom();
          }}>
          Créer votre room
        </button>
      </div>
    </>
  );
}
