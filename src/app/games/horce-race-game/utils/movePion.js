import {
  boardPath,
  homes,
  piecesInHomes,
  pionGrid,
  bluePions,
  yellowPions,
  redPions,
  greenPions,
} from "@/components/data/theBoardGame";

function movePion(pion, steps) {
  if (pion.positionIndex === null && steps === 6) {
    // Il sort de la maison (départ)
    const startIndex = boardPath.findIndex(cell => cell.start && cell.color === pion.color);
    pion.positionIndex = startIndex;
  } else {
    pion.positionIndex += steps;

    const casePlateau = boardPath[pion.positionIndex];
    const { x, y } = casePlateau;
    for (let row of pionGrid) {
      for (let cell of row) {
        if (cell.occupiedBy?.id === pion.id) {
          cell.occupiedBy = null;
        }
      }
    }

    if (x >= 0 && x < 15 && y >= 0 && y < 15) {
      pionGrid[y][x].occupiedBy = pion;
    }
  }

}

export default movePion;