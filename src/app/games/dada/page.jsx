"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { socket } from "./utils/socket";

import { useLoading } from "../../utils/LoadingContext";

export default function HomeDada() {
  const router = useRouter(); // Hook to manage routing
  const [roomList, setRoomList] = useState({}); // State to manage room list
  const { loading, setLoading } = useLoading(); // Loading state from context

  useEffect(() => {
    setLoading(true);
    socket.emit("getRoomsList");

    socket.on("updateRoomsList", (rooms) => {
      console.log("Rooms list updated:", rooms);
      setRoomList(rooms);
      console.log(loading);
      setLoading(false);
    });

    // Clean up the event listener on component unmount
    return () => {
      socket.off("updateRoomsList");
    };
  }, []);

  function createRoom() {
    const roomName = prompt(
      "Entrez le nom de la partie que vous souhaitez créer :"
    );
    if (roomName && !Object.keys(roomList).includes(roomName)) {
      setLoading(true);
      socket.emit("createRoom", roomName);
      socket.on("roomCreated", (roomName) => {
        console.log("Room created:", roomName);
        router.push(`/games/dada/${roomName}`);
      });
    } else {
      alert("La room existe déjà ou le nom est vide !");
    }
  }

  function joinARoom(roomId) {
    setLoading(true);
    socket.emit("joinRoomBeforeEnter", roomId);
    socket.on("roomJoined", (roomId) => {
      console.log("Room joined:", roomId);
      router.push(`/games/dada/${roomId}`);
      setLoading(false);
    });
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline text-center">
        Choisissez votre room !
      </h1>
      <div className="flex flex-col justify-center items-center gap-y-5 mt-5">
        {Object.entries(roomList).map(([roomId, room]) => (
          <div
            key={roomId}
            className="bg-white rounded-lg py-3 px-6 w-xl border border-amber-400 flex justify-between items-center">
            <h2 className="text-xl text-accent">{roomId}</h2>
            <p>{Object.keys(room.players).length} / 4 joueurs</p>
            <button
              className="btn btn-accent text-white"
              onClick={() => joinARoom(roomId)}>
              Rejoindre
            </button>
          </div>
        ))}
        {Object.keys(roomList).length === 0 && (
          <p className="text-center">Aucune room disponible</p>
        )}
      </div>
      <div className="flex flex-col items-center justify-center mt-5">
        <button
          className="btn btn-primary"
          onClick={() => createRoom()}>
          Créer votre room
        </button>
      </div>
    </>
  );
}
