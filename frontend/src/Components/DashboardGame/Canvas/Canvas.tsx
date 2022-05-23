import React, { useRef } from 'react'
import CanvasDraw from "react-canvas-draw";
import classes from './canvas.module.css';

const Canvas = () => {
  const canvas = useRef(CanvasDraw);

  const handleClear=()=>{
    console.log( canvas)
    canvas.current?.clear(); 
   }
    const handleSend =()=>{
        console.log(canvas.current?.getSaveData());
    }
  return (
    <div>
      <CanvasDraw
        ref={canvas}
        canvasWidth={400}
        canvasHeight={400}
        gridColor={"rgb(51, 102, 153)"}
        brushRadius={5}
      />
      <div className={classes.buttons}>
        <button className={classes.button} onClick={() => handleClear()}>
          Clear Draw
        </button>
        <button className={classes.button} onClick={() => handleSend()}>
          Send Draw
        </button>
      </div>
    </div>
  );
}

export default Canvas