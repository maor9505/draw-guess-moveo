import React, { useRef, useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SocketContext } from "../Context/SocketContext";
import classes from "./home.module.css";
const Home = () => {
   const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const name = useRef<HTMLInputElement>(null);
  const room = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>();

  // get user inputs and pass them to game page
  const handleStart = () => {
    const inputName = name.current?.value;
    const inputRoom = room.current?.value;
    if(inputRoom?.trim().length!==0){
      socket.emit('Join Room',{room:inputRoom})
    }
    if (inputName?.trim().length == 0 || inputRoom?.trim().length == 0) {
      setError("Field is missing");
    } else {
      socket.on('Join Room',(data)=>{
        if(data.isJoin){
          navigate(`/game/${inputName}/${inputRoom}`);
        }
        else{
          setError("Full Room try another room...");
        }
      })
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
