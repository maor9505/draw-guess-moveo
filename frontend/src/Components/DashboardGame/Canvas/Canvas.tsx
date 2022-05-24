import React, { useRef } from 'react'
import CanvasDraw from "react-canvas-draw";
import classes from './canvas.module.css';
interface Icanvas {
  handleDraw: (draw: object) => void;
  isGuess:boolean;
  userDraw:string;
}
const Canvas = (props:Icanvas) => {
  const canvas = useRef(CanvasDraw);
 
  const handleClear=()=>{
    canvas.current?.clear(); 
   }
    const handleSend =()=>{
        props.handleDraw(canvas.current?.getSaveData());
    }
  return (
    <div>
      <CanvasDraw
        ref={canvas}
        canvasWidth={400}
        canvasHeight={400}
        gridColor={"rgb(51, 102, 153)"}
        brushRadius={5}
        saveData={props.userDraw}
      />
      {!props.isGuess &&<div className={classes.buttons}>
        <button className={classes.button} onClick={() => handleClear()}>
          Clear Draw
        </button>
        <button className={classes.button} onClick={() => handleSend()}>
          Send Draw
        </button>
      </div>}
      {props.isGuess&& <span>guess here</span>}
    </div>
  );
}

export default Canvas