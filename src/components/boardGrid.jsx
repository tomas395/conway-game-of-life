import React from "react";

export const Grid = (props) => {
  const handleCellClick = (idx) => {
    props.onCellClick(idx);
  };

  const gridSize =
    props.gridSize === "small"
      ? "30"
      : props.gridSize === "medium"
      ? "20"
      : "15";
  const gridWidth = props.columns * gridSize;
  const cellWidth = gridSize;

  return (
    <div>
      <div
        style={{
          width: `${gridWidth}px`,
          background: "rgba(255,255,255,.2)",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {props.gridData &&
          props.gridData.map((cell, idx) => {
            return (
              <div
                key={idx}
                className="cell"
                style={{
                  width: `${cellWidth}px`,
                  height: `${cellWidth}px`,
                  flexBasis: `${cellWidth}px`,
                  border: "1px solid rgba(0,0,0,.44)",
                  backgroundColor:
                    cell === 1 ? "rgba(230, 210, 0, .9)" : "transparent",
                }}
                onClick={() => handleCellClick(idx)}
              ></div>
            );
          })}
      </div>
      <div
        style={{
          display: "flex",
          paddingTop: "5px",
          marginLeft: "120px",
        }}
      ></div>
    </div>
  );
};
