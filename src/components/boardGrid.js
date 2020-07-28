import React, { useState, useEffect } from "react";
// import styled from "styled-components"
// import presets from "../components/futurePresets"

const DefaultData = [
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  1,
  1,
  1,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
];

export const Grid = (props) => {
  const rows = 3;
  const columns = 10;
  // establishing state
  const [gridData, setGridData] = useState(0);

  const getNewCellState = (idx) => {
    // figure out which column # this is
    const columnIndex = idx % columns;
    // figure out which row # this is
    const rowIndex = Math.floor(idx / columns);

    // figure out if its on the edge of anything (for validation below)
    const cellBordersTop = rowIndex === 0;
    const cellBordersBottom = rowIndex === rows - 1;
    const cellBordersLeft = columnIndex === 0;
    const cellBordersRight = columnIndex === columns - 1;

    // find the (up to) 8 neighbors
    const above = !cellBordersTop && gridData[idx - columns];
    const below = !cellBordersBottom && gridData[idx + columns];
    const left = !cellBordersLeft && gridData[idx - 1];
    const right = !cellBordersRight && gridData[idx + 1];
    const nw =
      !cellBordersTop && !cellBordersLeft && gridData[idx - columns - 1];
    const ne =
      !cellBordersTop && !cellBordersRight && gridData[idx - columns + 1];
    const sw =
      !cellBordersBottom && !cellBordersLeft && gridData[idx + columns - 1];
    const se =
      !cellBordersBottom && !cellBordersRight && gridData[idx + columns + 1];

    // now that we know all the neighbors, we will check if each one is alive or dead
    let aliveNeighbors = 0;
    if (above && above === 1) aliveNeighbors++;
    if (below && below === 1) aliveNeighbors++;
    if (left && left === 1) aliveNeighbors++;
    if (right && right === 1) aliveNeighbors++;
    if (nw && nw === 1) aliveNeighbors++;
    if (ne && ne === 1) aliveNeighbors++;
    if (sw && sw === 1) aliveNeighbors++;
    if (se && se === 1) aliveNeighbors++;

    // now that we know how many neighbors are alive, we can determine
    // what will happen with this current cell based on the rules
    if (gridData[idx] === 1) {
      if (aliveNeighbors < 2) return 0;
      if (aliveNeighbors > 3) return 0;
      return 1;
    } else {
      if (aliveNeighbors === 3) return 1;
      return 0;
    }
  };

  // this is the same as componentDidMount
  useEffect(() => {
    setGridData(DefaultData);
  }, []);

  const handleClick = () => {
    const newGridData = [...gridData];
    for (let i = 0; i < newGridData.length; i++) {
      newGridData[i] = getNewCellState(i);
    }
    setGridData(newGridData);
  };

  const handleCellClick = (idx) => {
    const newGridData = [...gridData]; // clone grid data
    newGridData[idx] = newGridData[idx] === 1 ? 0 : 1; // update data
    setGridData(newGridData); // set data
  };

  return (
    <div
      style={{
        paddingLeft: "50px",
      }}
    >
      <div
        style={{
          width: "330px",
          background: "#f8f8f8",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {gridData &&
          gridData.map((cell, idx) => {
            return (
              <div
                key={idx}
                className="cell"
                style={{
                  width: "30px",
                  height: "30px",
                  flexBasis: "30px",
                  border: "1px solid #e8e8e8",
                  backgroundColor: cell === 1 ? "black" : "transparent",
                }}
                onClick={() => handleCellClick(idx)}
              >
                &nbsp;
              </div>
            );
          })}
      </div>
      <div
        style={{
          display: "flex",
          paddingTop: "5px",
          marginLeft: "140px",
        }}
      >
        <button onClick={() => handleClick()}>Advance</button>
      </div>
    </div>
  );
};
