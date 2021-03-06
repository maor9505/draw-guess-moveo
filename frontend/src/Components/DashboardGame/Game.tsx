import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Canvas from "./Canvas/Canvas";
import Score from "./Score/Score";
import classes from "./game.module.css";
import WordChoose from "./WordChoosing/WordChoose";
import Loading from "../Loading/Loading";
import { IPlayer } from "../../Interfaces/Player";
import { Iword } from "../../Interfaces/Word";
import { SocketContext } from "../Context/SocketContext";

const Game = () => {
  const { name, room } = useParams();
  const { socket } = useContext(SocketContext);
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

  useEffect(() => {
    if (name && room) {
      socket.emit("Start Game", {
        name: name,
        socketId: socket.id,
        room: room,
      });
      setFirstPlayer((prevState) => ({ ...prevState, name: name, room: room }));
    }
    socket.on("Start Game", (data) => {
      setIsWaitingForPlayer(false);
      setSecondPlayer((prevState) => ({
        ...prevState,
        name: data.name,
        room: data.room,
      }));
      setIsWaitingForDraw(false);
      setisChooseWord(true);
      socket.emit("User Log", { name: name, socketId: socket.id, room: room });
    });
    socket.on("User Log", (data) => {
      setIsWaitingForPlayer(false);
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
    socket.on("Exit Game", (data) => {
      socket.emit("Exit Game", { room: firstPlayer.room });
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
      room: firstPlayer.room,
    });
    setisChooseWord(false);
    setWordChoose({ word: word, type: type });
  };
  // get user draw and emit to second user
  const handleDraw = (draw: object) => {
    socket.emit("Send Draw", {
      name: firstPlayer.name,
      draw: draw,
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
        room: secondPlayer.room,
      });
      setFirstPlayer((prevState) => ({ ...prevState, score: score }));
      setisChooseWord(true);
      setIsGuess(false);
      setUserDraw("");
    }
  };
  const handlePassTurn = () => {
    socket.emit("Turn Pass", { room: firstPlayer.room });
    setisChooseWord(true);
    setIsGuess(false);
    setUserDraw("");
  };
  // emit exit game
  const handleExitGame = () => {
    socket.emit("Exit Game", { room: firstPlayer.room });
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
