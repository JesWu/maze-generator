import { React } from "react";

function MazeTile(props){
    const {val} = props;

    return(<div className={`h-1 w-1 md:w-2 md:h-2 xl:h-4 xl:w-4 ${val === 1 ? `bg-white` : `bg-slate-800`} transition-colors duration-300`}></div>)
}

export default MazeTile;