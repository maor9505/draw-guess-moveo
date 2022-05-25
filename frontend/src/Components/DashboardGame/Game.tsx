import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
  const [isWaitingForPlayer, setIsWaitingForPlayer] = useState<boolean>(true);
  const [firstPlayer, setFirstPlayer] = useState<IPlayer>({
    name: "",
    score: 0,
    room: "",
  });
  const [secondPlayer, setSecondPlayer] = useState<IPlayer>({
    name: "",
    score: 0,
    room: "",
  });
  const [isChooseWord, setisChooseWord] = useState<boolean>(false);
  const [isWaitingForDraw, setIsWaitingForDraw] = useState<boolean>(true);
  const [wordChoose, setWordChoose] = useState<Iword>({ word: "", type: "" });
  const [isGuess, setIsGuess] = useState<boolean>(false);
  const [isWaitingForUserGuess, setIsWaitingForUserGuess] =
    useState<boolean>(false);
  const [userDraw, setUserDraw] = useState<string>("");
  const [userSocketId, setuserSocketId] = useState<string>("");

  const socket = io("http://localhost:3000", {
    transports: ["websocket"],
  });
  useEffect(() => {
    if (name && room) {
      setFirstPlayer((prevState) => ({ ...prevState, name: name, room: room }));
    }
    socket.on("connect", () => {
      if (socket.connected) {
        socket.emit("Start Game", {
          name: name,
          socketId: socket.id,
          room: room,
        });
      }
    });
    socket.on("Start Game", (data) => {
      setIsWaitingForPlayer(false);
      setSecondPlayer((prevState) => ({
        ...prevState,
        name: data.name,
        room: data.room,
      }));
      setIsWaitingForDraw(false);
      setuserSocketId(data.socketId);
      setisChooseWord(true);
      socket.emit("User Log", { name: name, socketId: socket.id, room: room });
    });
    socket.on("User Log", (data) => {
      setIsWaitingForPlayer(false);
      setuserSocketId(data.socketId);
      setSecondPlayer((prevState) => ({
        ...prevState,
        name: data.name,
        room: data.room,
      }));
    });
    socket.on("Get Draw", (data) => {
      setUserDraw(data.draw);
      setIsGuess(true);
      setIsWaitingForUserGuess(false);
      setIsWaitingForDraw(false);
    });
    socket.on("Exit Game", () => {
      console.log("Exit game");
      setIsGuess(false);
      setisChooseWord(false);
      setIsWaitingForDraw(false);
      setIsWaitingForPlayer(true);
      setSecondPlayer({
        name: "",
        room: "",
        score: 0,
      });
      setFirstPlayer({
        name: "",
        room: "",
        score: 0,
      });
      navigate("/");
    });
    socket.on("Guess Correct", (data) => {
      setIsWaitingForDraw(true);
      setUserDraw("");
      setSecondPlayer((prevState) => ({ ...prevState, score: data.score }));
    });
    socket.on("Guess Correct", (data) => {
      setIsWaitingForDraw(true);
      setUserDraw("");
      setSecondPlayer((prevState) => ({ ...prevState, score: data.score }));
    });
    socket.on("Turn Pass", () => {
      setIsWaitingForDraw(true);
      setUserDraw("");
    });
    socket.on("Get Word", (data) => {
      setWordChoose({ word: data.word, type: data.type });
    });
    return () => {
      socket.off("Start Game");
      socket.off("User Log");
      socket.off("Get Draw");
      socket.off("Exit Game");
      socket.off("Guess Correct");
      socket.off("Turn Pass");
      socket.off("Get Word");
    };
  }, []);

  // handle with user chooice and emit the word for the second player for check
  const handleChooice = (word: string, type: string) => {
    socket.emit("Send Word", {
      word: word,
      type: type,
      socketId: userSocketId,
    });
    setisChooseWord(false);
    setWordChoose({ word: word, type: type });
  };
  // get user draw and emit to second user
  const handleDraw = (draw: object) => {
    socket.emit("Send Draw", {
      name: firstPlayer.name,
      draw: draw,
      socketId: userSocketId,
      room: firstPlayer.room,
    });
    setIsWaitingForUserGuess(true);
  };
  // get the currect word from user input check wich score he earn and emit
  const handleGuess = (isGuess: boolean, word: Iword) => {
    if (isGuess) {
      let score = 0;
      switch (word.type) {
        case "easy":
          score = firstPlayer.score + 1;
          break;
        case "medium":
          score = firstPlayer.score + 2;
          break;
        case "hard":
          score = firstPlayer.score + 3;
          break;
      }
      socket.emit("Guess Correct", {
        playerGuess: secondPlayer.name,
        score: score,
        socketId: userSocketId,
        room: secondPlayer.room,
      });
      setFirstPlayer((prevState) => ({ ...prevState, score: score }));
      setisChooseWord(true);
      setIsGuess(false);
      setUserDraw("");
    }
  };
  const handlePassTurn = () => {
    socket.emit("Turn Pass", { socketId: userSocketId });
    setisChooseWord(true);
    setIsGuess(false);
    setUserDraw("");
  };
  // emit exit game
  const handleExitGame = () => {
    socket.emit("Exit Game");
  };
  return (
    <div className={classes.container}>
      {isWaitingForPlayer && (
        <div className={classes.message}>
          <Loading content="Waiting for player..." />
        </div>
      )}
      {!isWaitingForPlayer && (
        <Score firstPlayer={firstPlayer} secondPlayer={secondPlayer} />
      )}
      {isWaitingForDraw && !isWaitingForPlayer && (
        <div className={classes.message}>
          <Loading content={`${secondPlayer.name} is Drawing...`} />
        </div>
      )}
      {isWaitingForUserGuess && !isWaitingForDraw && (
        <div className={classes.message}>
          <Loading content={`${secondPlayer.name} is Gussing...`} />
        </div>
      )}

      {isChooseWord && !isWaitingForDraw && (
        <div className={classes.message}>
          <WordChoose handleChooice={handleChooice} />
        </div>
      )}

      {!isWaitingForDraw && !isChooseWord && !isWaitingForUserGuess && (
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
              handleExitGame={handleExitGame}
              handlePassTurn={handlePassTurn}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
