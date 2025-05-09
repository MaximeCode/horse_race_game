const boardPath = [
  // Blue path
  { x: 7, y: 0, color: "blue" }, // id 0
  { x: 8, y: 0, color: "blue", start: true },
  { x: 8, y: 1, color: "blue" },
  { x: 8, y: 2, color: "blue" },
  { x: 8, y: 3, color: "blue" },
  { x: 8, y: 4, color: "blue" }, // id 5
  { x: 8, y: 5, color: "blue" },
  { x: 8, y: 6, color: "blue" },
  { x: 9, y: 6, color: "blue" },
  { x: 10, y: 6, color: "blue" },
  { x: 11, y: 6, color: "blue" }, // id 10
  { x: 12, y: 6, color: "blue" },
  { x: 13, y: 6, color: "blue" },
  { x: 14, y: 6, color: "blue" },
  // Yellow path
  { x: 14, y: 7, color: "yellow" },
  { x: 14, y: 8, color: "yellow", start: true }, // id 15
  { x: 13, y: 8, color: "yellow" },
  { x: 12, y: 8, color: "yellow" },
  { x: 11, y: 8, color: "yellow" },
  { x: 10, y: 8, color: "yellow" },
  { x: 9, y: 8, color: "yellow" }, // id 20
  { x: 8, y: 8, color: "yellow" },
  { x: 8, y: 9, color: "yellow" },
  { x: 8, y: 10, color: "yellow" },
  { x: 8, y: 11, color: "yellow" },
  { x: 8, y: 12, color: "yellow" }, // id 25
  { x: 8, y: 13, color: "yellow" },
  { x: 8, y: 14, color: "yellow" },
  // Red path
  { x: 7, y: 14, color: "red" },
  { x: 6, y: 14, color: "red", start: true },
  { x: 6, y: 13, color: "red" }, // id 30
  { x: 6, y: 12, color: "red" },
  { x: 6, y: 11, color: "red" },
  { x: 6, y: 10, color: "red" },
  { x: 6, y: 9, color: "red" },
  { x: 6, y: 8, color: "red" }, // id 35
  { x: 5, y: 8, color: "red" },
  { x: 4, y: 8, color: "red" },
  { x: 3, y: 8, color: "red" },
  { x: 2, y: 8, color: "red" },
  { x: 1, y: 8, color: "red" }, // id 40
  { x: 0, y: 8, color: "red" },
  // Green path
  { x: 0, y: 7, color: "green" },
  { x: 0, y: 6, color: "green", start: true },
  { x: 1, y: 6, color: "green" },
  { x: 2, y: 6, color: "green" }, // id 45
  { x: 3, y: 6, color: "green" },
  { x: 4, y: 6, color: "green" },
  { x: 5, y: 6, color: "green" },
  { x: 6, y: 6, color: "green" },
  { x: 6, y: 5, color: "green" }, // id 50
  { x: 6, y: 4, color: "green" },
  { x: 6, y: 3, color: "green" },
  { x: 6, y: 2, color: "green" },
  { x: 6, y: 1, color: "green" },
  { x: 6, y: 0, color: "green" }, // id 55

  // Blue scale
  { x: 7, y: 1, color: "blue", scale: 1 },
  { x: 7, y: 2, color: "blue", scale: 2 },
  { x: 7, y: 3, color: "blue", scale: 3 },
  { x: 7, y: 4, color: "blue", scale: 4 },
  { x: 7, y: 5, color: "blue", scale: 5 }, // id 60
  { x: 7, y: 6, color: "blue", scale: 6 },

  // Yellow scale
  { x: 13, y: 7, color: "yellow", scale: 1 },
  { x: 12, y: 7, color: "yellow", scale: 2 },
  { x: 11, y: 7, color: "yellow", scale: 3 },
  { x: 10, y: 7, color: "yellow", scale: 4 }, // id 65
  { x: 9, y: 7, color: "yellow", scale: 5 },
  { x: 8, y: 7, color: "yellow", scale: 6 },

  // Red scale
  { x: 7, y: 13, color: "red", scale: 1 },
  { x: 7, y: 12, color: "red", scale: 2 },
  { x: 7, y: 11, color: "red", scale: 3 }, // id 70
  { x: 7, y: 10, color: "red", scale: 4 },
  { x: 7, y: 9, color: "red", scale: 5 },
  { x: 7, y: 8, color: "red", scale: 6 },

  // Green scale
  { x: 1, y: 7, color: "green", scale: 1 },
  { x: 2, y: 7, color: "green", scale: 2 }, // id 75
  { x: 3, y: 7, color: "green", scale: 3 },
  { x: 4, y: 7, color: "green", scale: 4 },
  { x: 5, y: 7, color: "green", scale: 5 },
  { x: 6, y: 7, color: "green", scale: 6 },

  // WIN
  { x: 7, y: 7, win: true }, // id 80
];

// Maisons de départ pour chaque couleur
const homes = [];
for (let x = 0; x < 6; x++) {
  for (let y = 0; y < 6; y++) {
    homes.push({ x, y, home: "green" });
  }
}
for (let x = 9; x < 15; x++) {
  for (let y = 0; y < 6; y++) {
    homes.push({ x, y, home: "blue" });
  }
}
for (let x = 0; x < 6; x++) {
  for (let y = 9; y < 15; y++) {
    homes.push({ x, y, home: "red" });
  }
}
for (let x = 9; x < 15; x++) {
  for (let y = 9; y < 15; y++) {
    homes.push({ x, y, home: "yellow" });
  }
}

// Configuration des maisons pour chaque couleur
const piecesInHomes = {
  blue: [
    { x: 11, y: 2 },
    { x: 12, y: 2 },
    { x: 11, y: 3 },
    { x: 12, y: 3 },
  ],
  yellow: [
    { x: 11, y: 11 },
    { x: 12, y: 11 },
    { x: 11, y: 12 },
    { x: 12, y: 12 },
  ],
  red: [
    { x: 2, y: 11 },
    { x: 3, y: 11 },
    { x: 2, y: 12 },
    { x: 3, y: 12 },
  ],
  green: [
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 3 },
  ],
};


const pionGrid = Array.from({ length: 15 }, (_, y) =>
  Array.from({ length: 15 }, (_, x) => ({
    x,
    y,
    occupiedBy: null, // null ou un objet pion
  }))
);


// Create pions for each color using a factory function
const createPions = (color, prefix) => {
  return Array.from({ length: 4 }, (_, i) => ({
    id: `${prefix}${i + 1}`,
    color,
    positionIndex: null,
    isFinished: false,
  }));
};

const bluePions = createPions('blue', 'b');
const yellowPions = createPions('yellow', 'y');
const redPions = createPions('red', 'r');
const greenPions = createPions('green', 'g');

export { boardPath, homes, piecesInHomes, pionGrid, bluePions, yellowPions, redPions, greenPions };