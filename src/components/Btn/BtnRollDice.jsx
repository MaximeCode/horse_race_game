"use client";
import rollDice from "@/utils/rollDice";
import PropTypes from "prop-types";

const BtnRollDice = ({ result, setResult }) => {
  const rollTheDice = () => {
    const newValue = rollDice();
    setResult(newValue);
  };
  return (
    <div>
      {result > 0 && (
        <h2 className="text-5xl mb-4 text-secondary font-extrabold text-center">
          {result}
        </h2>
      )}
      <button
        className="btn btn-secondary"
        onClick={() => rollTheDice()}>
        Roll Dice
      </button>
    </div>
  );
};

BtnRollDice.propTypes = {
  result: PropTypes.number.isRequired,
  setResult: PropTypes.func.isRequired,
};

export default BtnRollDice;
