import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const CellCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.color || "#cccccc"};
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  border: ${(props) =>
    props.isSelected ? "2px solid black" : "1px solid #888888"};
  box-shadow: ${(props) =>
    props.isSelected ? "0 0 5px rgba(0,0,0,0.5)" : "none"};
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

const Cell = ({
  x = 50,
  y = 50,
  color = "red",
  isSelected = false,
  onClick = false,
}) => {
  return (
    <CellCircle
      color={color}
      x={x}
      y={y}
      isSelected={isSelected}
      onClick={onClick}
    />
  );
};

Cell.propTypes = {
  color: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
};

Cell.defaultProps = {
  color: "#cccccc",
  isSelected: false,
  onClick: () => {},
};

export default Cell;
