import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Canvas from "./Canvas/Canvas";
import Score from "./Score/Score";
import classes from "./game.module.css";
import WordChoose from "./WordChoosing/WordChoose";
import io from "socket.io-client";
import Loading from "../Loading/Loading";
import { IPlayer } from "../../Interfaces/Player";
import { Iword } from "../../Interfaces/Word";

const Game = () => {
  const { name, room } = useParams();
  const [isWaitingForPlayer, setIsWaitingForPlayer] = useState<boolean>(true);
  const [firstPlayer, setFirstPlayer] = useState<IPlayer>({
    name: "",
    score: 0,
    room:""
  });
  const [secondPlayer, setSecondPlayer] = useState<IPlayer>({
    name: "",
    score: 0,
    room:""
  });
  const [isChooseWord, setisChooseWord] = useState<boolean>(false);
  const [isWaitingForDraw, setIsWaitingForDraw] = useState<boolean>(true);
  const [wordChoose, setWordChoose] = useState<Iword>({ word: "", type: "" });
  const [isGuess, setIsGuess] = useState<boolean>(false);
  const [userDraw, setUserDraw] = useState<string>("");
  const [userSocketId, setuserSocketId] = useState<string>("");

  const socket = io("http://localhost:3000", {
    transports: ["websocket"],
  });
  useEffect(() => {
    if (name&&room) {
      setFirstPlayer((prevState) => ({ ...prevState, name: name ,room:room}));
    }
    socket.on("connect", () => {
      if (socket.connected) {
        console.log("server connect " + socket.id);
        socket.emit("Start Game", {
          name: name,
          socketId: socket.id,
          room: room,
        });
      }
    });
    socket.on("Start Game", (data) => {
      console.log("start game");

      console.log("Start Game room : " + data.room);
      setIsWaitingForPlayer(false);
      setSecondPlayer((prevState) => ({ ...prevState, name: data.name,room:data.room}));
      setIsWaitingForDraw(false);
      setuserSocketId(data.socketId);
      setisChooseWord(true);
      socket.emit("User Log", { name: name, socketId: socket.id, room: room });
    });
    socket.on("User Log", (data) => {
      console.log("user log");
      console.log("User room: " + data.room);
      setIsWaitingForPlayer(false);
      setuserSocketId(data.socketId);
      setSecondPlayer((prevState) => ({
        ...prevState,
        name: data.name,
        room: data.room,
      }));
    });
    socket.on("Get Draw", (data) => {
      console.log("Get Draw");
      console.log("Get Draw room:: " + data.room);
      setUserDraw(data.draw);
      setIsGuess(true);
      setIsWaitingForDraw(false);
    });
    socket.on("Guess Correct", (data) => {
      setIsWaitingForDraw(true);
      setSecondPlayer((prevState) => ({ ...prevState, score: data.score }));
    });
    socket.on("Get Word", (data) => {
      setWordChoose({ word: data.word, type: data.type });
    });
  }, []);

  const handleChooice = (word: string, type: string) => {
    console.log("handle chooice");
    console.log(word);
    socket.emit("Send Word", {
      word: word,
      type: type,
      socketId: userSocketId,
    });
    setisChooseWord(false);
    setWordChoose({ word: word, type: type });
  };
  const handleDraw = (draw: object) => {
    console.log("draw");
    console.log(draw);
    console.log("send Draw room : " + firstPlayer.room);
    socket.emit("Send Draw", {
      name: firstPlayer.name,
      draw: draw,
      socketId: userSocketId,
      room:firstPlayer.room
    });
  };
  const handleGuess = (isGuess: boolean, word: Iword) => {
    console.log(" Game --user correct");
    if (isGuess) {
      let score = secondPlayer.score;
      switch (word.type) {
        case "easy":
          score += 1;
          break;
        case "medium":
          score += 2;
          break;
        case "hard":
          score += 3;
          break;
      }

      socket.emit("Guess Correct", {
        playerGuess: secondPlayer.name,
        score: score,
        socketId: userSocketId,
        room: secondPlayer.room,
      });
      console.log("user socket id");
      console.log(userSocketId);
      setFirstPlayer((prevState) => ({ ...prevState, score: score }));
      setisChooseWord(true);
      setIsGuess(false);
    }
  };
  return (
    <div>
      {isWaitingForPlayer && (
        <div className={classes.container}>
          <Loading content="Waiting for player..." />
        </div>
      )}
      {!isWaitingForPlayer && (
        <Score
          firstPlayer={firstPlayer}
          secondPlayer={secondPlayer}
          timer="1:00"
        />
      )}
      {isWaitingForDraw && !isWaitingForPlayer && (
        <div className={classes.container}>
          <Loading content={`Waiting for draw from ${secondPlayer.name}`} />
        </div>
      )}

      {isChooseWord && !isWaitingForDraw && (
        <div className={classes.container}>
          <WordChoose handleChooice={handleChooice} />
        </div>
      )}

      {!isWaitingForDraw && !isChooseWord && (
        <div>
          <div className={classes.word}>
            {!isGuess && <span>{wordChoose.word}</span>}
          </div>
          <div className={classes.canvas}>
            <Canvas
              userDraw={userDraw}
              isGuess={isGuess}
              handleDraw={handleDraw}
              wordChoose={wordChoose}
              handleGuess={handleGuess}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
