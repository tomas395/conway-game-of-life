import React, { useState } from "react";
// import styled from "styled-components"

const Board = () => {
  var newWorld = [];
  var cellRow = [];

  for (var i = 0; i < this.state.size[0]; i++) {
    for (var j = 0; j < this.state.size[1]; j++) {
      cellRow.push(<Cell key={[i, j]} />);
    }
    newWorld.push(
      <div className="row" key={i}>
        {cellRow}
      </div>
    );
    cellRow = [];
  }

  return newWorld;
};

export default Board;
