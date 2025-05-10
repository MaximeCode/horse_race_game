"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomeDada() {
  const router = useRouter(); // Hook to manage routing
  const [roomList, setRoomList] = useState([]); // State to manage room list

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
        <button className="btn btn-primary">Créer votre room</button>
      </div>
    </>
  );
}
