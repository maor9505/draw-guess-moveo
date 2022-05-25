import React, { FormEvent, useRef,useState } from 'react'
import CanvasDraw from "react-canvas-draw";
import { Iword } from '../../../Interfaces/Word';
import classes from './canvas.module.css';

interface Icanvas {
  handleDraw: (draw: object) => void;
  isGuess: boolean;
  userDraw: string;
  wordChoose: Iword;
  handleGuess: (isGuess: boolean, word: Iword) => void;
}
const Canvas = (props:Icanvas) => {
  const canvas = useRef(CanvasDraw);
 const [inputGuess,setInputGuess] = useState<string>();
  const [error, setError] = useState<string>("");

  const handleClear=()=>{
    canvas.current?.clear(); 
   }
    const handleSend =()=>{
        props.handleDraw(canvas.current?.getSaveData());
    }
    const handleGuessUser = (e: FormEvent) => {
      e.preventDefault();
      console.log('handle Guess')
      console.log(props)
      console.log(props.wordChoose);
      console.log('word')
      console.log(props.wordChoose.word);
      if (inputGuess === props.wordChoose.word) {
        console.log(' canvas -- user correct')
        props.handleGuess(true, props.wordChoose);
      } 
      else {
        setError("Try again...");
      }
    };
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
      {!props.isGuess && (
        <div className={classes.buttons}>
          <button className={classes.button} onClick={() => handleClear()}>
            Clear Draw
          </button>
          <button className={classes.button} onClick={() => handleSend()}>
            Send Draw
          </button>
        </div>
      )}
      {props.isGuess && (
        <div className={classes.buttons}>
          <form onSubmit={handleGuessUser}>
            <input
              type="text"
              value={inputGuess}
              placeholder="Enter your Guess"
              onChange={(e) => setInputGuess(e.target.value)}
            >
            </input>
            <button type="submit">Send your guess</button>
            {error && <span className={classes.error}>{error}</span>}
          </form>
        </div>
      )}
    </div>
  );
}

export default Canvas