import { React } from "react";
import MazeTile from "./MazeTile";

function MazePanel(props) {
  const { maze } = props;
  
  return (
    <div class="border-2 border-white p-1">
      {maze.map((row) => {
          return <div class="flex flex-row">{row.map((item) => {
              return <MazeTile val={item}/>
          })}
          </div>
      })}
    </div>
  )
}

export default MazePanel;
