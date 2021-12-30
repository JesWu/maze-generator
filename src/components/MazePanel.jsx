import { React } from "react";
import MazeTile from "./MazeTile";

function MazePanel(props) {
  const { maze } = props;
  
  return (
    <div className="border-2 border-white p-1">
      {maze.map((row, idy) => {
          return <div className="flex flex-row" key={idy}>{row.map((item, idx) => {
              return <MazeTile val={item} key={idx}/>
          })}
          </div>
      })}
    </div>
  )
}

export default MazePanel;
