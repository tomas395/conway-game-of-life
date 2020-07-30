import React, { useState, useEffect } from "react";
import "./App.css";
import { Grid } from "./components/boardGrid.jsx";
import { Rules } from "./components/rules.jsx";
import useInterval from "@use-it/interval";
import getPreset from "./presets/presets";

function App() {
  // establishing state
  const [rows, setRows] = useState(15);
  const [columns, setColumns] = useState(15);
  const [gridSize, setGridSize] = useState("small");
  const [gridData, setGridData] = useState([]);
  const [selectedPreset, setSelectedPreset] = useState("fireworks");
  const [curGen, setCurGen] = useState(1);
  const [runSpeed, setRunSpeed] = useState(8);
  const [isRunning, setIsRunning] = useState(false);

  //  filtering the liveCells to give us only the value of the aliveCells
  const liveCells = gridData.filter((c) => c === 1).length;

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

  // set the board state to empty when the size changes
  useEffect(() => {
    setGridData(new Array(rows * columns).fill(0));
  }, [columns, rows]);

  // this is the useInterval library to help with running the simulation
  // pass null for the duration to stop the simulation
  useInterval(
    () => {
      if (liveCells === 0) {
        setIsRunning(false);
      } else {
        setGridData((gridData) => {
          return nextGen(gridData);
        });
        setCurGen((curGen) => curGen + 1);
      }
    },
    isRunning ? (11 - runSpeed) * 40 : null
  );

  const handleCellClick = (idx) => {
    const newGridData = [...gridData]; // clone grid data
    newGridData[idx] = newGridData[idx] === 1 ? 0 : 1; // update data
    setGridData(newGridData); // set data
  };

  // this will iterate through every cell and calculate the next state
  const nextGen = () => {
    const newGridData = [...gridData];
    for (let i = 0; i < newGridData.length; i++) {
      newGridData[i] = getNewCellState(i);
    }
    return newGridData;
  };

  // step through one iteration and add +1 to the generation counter
  const handleAdvanceClick = () => {
    setGridData((gridData) => {
      return nextGen(gridData);
    });
    setCurGen((curGen) => curGen + 1);
  };

  const handleRunClick = () => {
    if (!isRunning) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  };

  const handleRunSpeedChange = (e) => {
    setRunSpeed(e.target.value);
  };

  const handlePresetChange = (e) => {
    setSelectedPreset(e.target.value);
  };

  const handleClear = () => {
    setCurGen(1); // sets the state of all the 1's to zeros and resets the counter of the generation to 1
    setGridData(new Array(rows * columns).fill(0));
  };

  const handleLoadPreset = () => {
    setCurGen(1);
    setGridData(getPreset(selectedPreset, gridSize));
  };

  const handleGridSizeChange = (e) => {
    const newSize = e.target.value;

    if (newSize === "small") {
      setGridSize("small");
      setRows(15);
      setColumns(15);
    } else if (newSize === "medium") {
      setGridSize("medium");
      setRows(25);
      setColumns(25);
    } else {
      setGridSize("large");
      setRows(35);
      setColumns(35);
    }
  };

  return (
    <div className="App">
      <div className="center">
        <Grid
          columns={columns}
          gridSize={gridSize}
          gridData={gridData}
          onCellClick={(idx) => handleCellClick(idx)}
        ></Grid>
      </div>
      <div className="left-side">
        <Rules curGen={curGen} liveCells={liveCells}></Rules>
      </div>
      <div className="right-side">
        <div className="controls">
          <button className="main-btn" onClick={() => handleRunClick()}>
            {isRunning ? (
              <span>
                <i className="fa fa-stop-circle" aria-hidden="true"></i>
                Stop Simulation
              </span>
            ) : (
              <span>
                <i className="fa fa-play-circle" aria-hidden="true"></i>
                Run Simulation
              </span>
            )}
          </button>
          <button className="main-btn" onClick={() => handleAdvanceClick()}>
            <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
            Advance Generation
          </button>
        </div>
        <div className="control-box">
          <p className="title">Settings</p>
          <div className="control-content">
            <div className="select-box">
              <label>Grid Size</label>
              <select
                value={gridSize}
                onChange={(e) => handleGridSizeChange(e)}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div className="select-box">
              <label>Speed</label>
              <input
                type="range"
                min="1"
                max="10"
                value={runSpeed}
                className="slider"
                onChange={(e) => handleRunSpeedChange(e)}
              />
            </div>
          </div>
        </div>
        <div className="control-box">
          <p className="title">Board State</p>
          <div className="control-content">
            <div className="select-box">
              <label>Presets</label>
              <select
                value={selectedPreset}
                onChange={(e) => handlePresetChange(e)}
              >
                <option value="fireworks">Fireworks</option>
                <option value="pulsar">Pulsar</option>
                <option value="glider">Glider</option>
                <option value="nitro">Nitro</option>
                <option value="random">Random</option>
              </select>
            </div>
            <button
              className="main-btn secondary"
              onClick={() => handleLoadPreset()}
            >
              Load Preset
            </button>
            <button
              className="main-btn secondary"
              onClick={() => handleClear()}
            >
              Clear Board
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
