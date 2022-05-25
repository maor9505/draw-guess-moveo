import React, { FormEvent, useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { Icanvas } from "../../../Interfaces/canvas";
import classes from "./canvas.module.css";

const Canvas = (props: Icanvas) => {
  const canvas = useRef(CanvasDraw);
  const [inputGuess, setInputGuess] = useState<string>();
  const [error, setError] = useState<string>("");

  // clear canvas
  const handleClear = () => {
    canvas.current?.clear();
  };
  // get the draw and send thet to the handler
  const handleSend = () => {
    props.handleDraw(canvas.current?.getSaveData());
  };
// check use guess and handle
  const handleGuessUser = (e: FormEvent) => {
    e.preventDefault();
    if (inputGuess === props.wordChoose.word) {
      props.handleGuess(true, props.wordChoose);
    } else {
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
          <button
            className={classes.button}
            onClick={() => props.handleExitGame()}
          >
            Exit Game
          </button>
        </div>
      )}
      {props.isGuess && (
        <div className={classes.buttons}>
          <form onSubmit={handleGuessUser}>
            <input
              type="text"
              value={inputGuess}
              className={classes.guess}
              placeholder="Enter your Guess"
              onChange={(e) => setInputGuess(e.target.value)}
            ></input>
            <button className={classes.button} type="submit">
              Send your guess
            </button>
          </form>
          {error && <span className={classes.error}>{error}</span>}
          <button
            className={classes.button}
            onClick={() => props.handleExitGame()}
          >
            Exit Game
          </button>
        </div>
      )}
    </div>
  );
};

export default Canvas;
