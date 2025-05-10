"use client";
import rollDice from "../utils/rollDice";
import PropTypes from "prop-types";

import { Button } from "flowbite-react";

const BtnRollDice = ({ result, setResult }) => {
  const rollTheDice = () => {
    const newValue = rollDice();
    setResult(newValue);
  };
  return (
    <div>
      {result > 0 && (
        <h2 className="text-5xl mb-4 text-blue-500 font-extrabold text-center">
          {result}
        </h2>
      )}

      {/* Add color of player */}
      <Button
        color={"blue"}
        onClick={() => rollTheDice()}
        className="text-xl cursor-pointer">
        Lancé le dé
      </Button>
    </div>
  );
};

BtnRollDice.propTypes = {
  result: PropTypes.number.isRequired,
  setResult: PropTypes.func.isRequired,
};

export default BtnRollDice;
