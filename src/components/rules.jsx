import React from "react";

export const Rules = ({ curGen, liveCells }) => {
  return (
    <div>
      <h1>Conway's Game Of Life</h1>
      <div className="generation-count">
        <p className="stat">{curGen}</p>
        <p className="stat-description">Current Generation</p>
      </div>
      <div className="cell-count">
        <p className="stat">{liveCells}</p>
        <p className="stat-description">Living Cells</p>
      </div>
      <div className="rules">
        <p className="rules-title">What is this?</p>
        <p>
          The universe of the Game of Life is an infinite, two-dimensional
          orthogonal grid of square cells, each of which is in one of two
          possible states, alive or dead, (or populated and unpopulated,
          respectively). Every cell interacts with its eight neighbours, which
          are the cells that are horizontally, vertically, or diagonally
          adjacent. At each step in time, the following transitions occur:
        </p>
        <ol>
          <li>
            Any live cell with fewer than two live neighbors dies, as if by
            underpopulation.
          </li>
          <li>
            Any live cell with two or three live neighbors lives on to the next
            generation.
          </li>
          <li>
            Any live cell with more than three live neighbors dies, as if by
            overpopulation.
          </li>
          <li>
            Any dead cell with exactly three live neighbors becomes a live cell,
            as if by reproduction.
          </li>
        </ol>
      </div>
    </div>
  );
};
