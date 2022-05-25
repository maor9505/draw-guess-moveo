import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./home.module.css";
const Home = () => {
  const navigate = useNavigate();
  const name = useRef<HTMLInputElement>(null);
  const room = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>();

  const handleStart = () => {
    const inputName = name.current?.value;
    const inputRoom = room.current?.value;
    if (inputName?.trim().length == 0 || inputRoom?.trim().length == 0) {
      setError("field is missing");
    } else {
      navigate(`/game/${inputName}/${inputRoom}`);
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.title}>Draw && Guess</div>
      <div className={classes.main}>
        <div className={classes.box}>
          <input
            ref={name}
            className={classes.name}
            placeholder="Enter your name.."
          ></input>
          <input
            ref={room}
            className={classes.name}
            placeholder="Enter your room.."
          ></input>
          <button className={classes.button} onClick={handleStart}>
            Start Game
          </button>
          {error && <span className={classes.error}>{error}</span>}
        </div>
      </div>
    </div>
  );
};

export default Home;
