import React from "react";
import "./App.css";
// import "../src/components/boardGrid"
// import styled from "styled-components"

function App() {
  return (
    <div className="App">
      <h1>The Game Of Life</h1>
      <p>
        The universe of the Game of Life is an infinite, two-dimensional
        orthogonal grid of square cells, each of which is in one of two possible
        states, alive or dead, (or populated and unpopulated, respectively).
        Every cell interacts with its eight neighbours, which are the cells that
        are horizontally, vertically, or diagonally adjacent. At each step in
        time, the following transitions occur:
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
      <p>
        The initial pattern constitutes the seed of the system. The first
        generation is created by applying the above rules simultaneously to
        every cell in the seed; births and deaths occur simultaneously, and the
        discrete moment at which this happens is sometimes called a tick. Each
        generation is a pure function of the preceding one. The rules continue
        to be applied repeatedly to create further generations.
      </p>
    </div>
  );
}

export default App;
