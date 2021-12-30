import { useState } from "react";
import MazePanel from "./components/MazePanel";

function App() {
  const generateMaze = (width, height) => {
    let arr = new Array(height);
    for (let i = 0; i < arr.length; i++) {
      let row = new Array(width);
      row.fill(0);
      arr[i] = row;
    }
    return arr;
  };

  const [maze, setMaze] = useState(generateMaze(75, 49));
  const [fpt, setFpt] = useState(null)
  var handle;

  const resetMaze = () => {
    if (fpt){
      clearInterval(fpt)
      setFpt(null)
    }
    setMaze(generateMaze(75, 49));
  };

  const runPrim = () => {
    let mazeCopy = maze;
    let walls = [];
    mazeCopy[0][0] = 1;
    walls = getWalls([0, 0], mazeCopy);
    if (walls.length > 0) {
      const iterate = () => {
        if (walls.length === 0){
          clearInterval(handle)
          return
        }
        const cur = walls.splice(Math.random() * walls.length, 1)[0];
        if (mazeCopy[cur[0]][cur[1]] === 0) {
          mazeCopy[cur[0]][cur[1]] = 1;
          mazeCopy[cur[2]][cur[3]] = 1;
          setMaze([...mazeCopy]);
          walls = [...getWalls(cur, mazeCopy), ...walls];
        }
      };
      handle = setInterval(iterate, 1)
      setFpt(handle)
    }
    setMaze([...mazeCopy]);
  };

  const getWalls = (cell, mazeCopy) => {
    let walls = [];
    const dirs = [
      [0, 2],
      [0, -2],
      [2, 0],
      [-2, 0],
    ];
    for (let i = 0; i < dirs.length; i++) {
      const col = cell[1] + dirs[i][1];
      const row = cell[0] + dirs[i][0];
      const col2 = cell[1] + dirs[i][1] / 2;
      const row2 = cell[0] + dirs[i][0] / 2;
      if (
        row >= 0 &&
        row < mazeCopy.length &&
        col >= 0 &&
        col < mazeCopy[0].length &&
        mazeCopy[row][col] === 0
      ) {
        walls.push([row, col, row2, col2]);
      }
    }
    return walls;
  };

  return (
    <div className="w-full flex flex-col items-center h-screen justify-center bg-slate-800 gap-9">
      <h1 className="font-mono text-5xl text-white text-center">Prim's algorithm</h1>
      <MazePanel maze={maze} />
      <div className="flex flex-row space-x-12">
        <button
          className="border-2 text-white rounded px-3 py-0.5"
          onClick={() => runPrim()}
        >
          Run
        </button>
        <button
          className="border-2 text-white rounded px-3 py-0.5"
          onClick={() => {
            resetMaze();
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
