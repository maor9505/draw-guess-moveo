import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Canvas from "./Canvas/Canvas";
import Score from "./Score/Score";
import classes from "./game.module.css";
import WordChoose from "./WordChoosing/WordChoose";
import io from "socket.io-client";
import Loading from "../Loading/Loading";
interface Iword{
word:string;
type:string
}
const Game = () => {
  const { name } = useParams();
  const [isWaitingForPlayer, setIsWaitingForPlayer] = useState<boolean>(true);
  const [firstPlayerName, setFirstPlayerName] = useState<string>("");
  const [firstPlayerScore, setFirstPlayerScore] = useState<number>(0);
const [secondPlayerName, setSecondPlayerName] = useState<string>("");
const [secondPlayerScore, setSecondPlayerScore] = useState<number>(0);

const [isChooseWord, setisChooseWord] = useState<boolean>(false);
const [isWaitingForDraw, setIsWaitingForDraw] = useState<boolean>(true);
  const [wordChoose, setWordChoose] = useState<Iword>({word:"",type:""});
  const [isGuess, setIsGuess] = useState<boolean>(false);
  const [userDraw, setUserDraw] = useState<string>("");


  const socket = io("http://localhost:3000", {
    transports: ["websocket"],
  });
  useEffect(() => {
    if (name) {
      setFirstPlayerName(name);
    }
    socket.on("connect", () => {
      if (socket.connected) {
        socket.emit("Start Game", { name: name });
      }
    });
    socket.on("Start Game", (data) => {
      console.log('Start Game')
      setIsWaitingForPlayer(false);
      setSecondPlayerName(data.name);
       setIsWaitingForDraw(false);
       setisChooseWord(true);
         socket.emit("User Log", { name: name });

    });
    socket.on("User Log", (data) => {
      console.log("User Log");
      setIsWaitingForPlayer(false);
      setSecondPlayerName(data.name);
    });
    socket.on("Get Draw", (data) => {
      console.log('socket id ')
      console.log(socket.id)
      console.log('draw')
      console.log(data.draw)
      console.log(`user guess ${firstPlayerName}`)
      console.log(data.name);
      console.log(isGuess)
      console.log('is Waiting for draw')
      console.log(isWaitingForDraw);
      setUserDraw(data.draw)
      setIsGuess(true);
      setIsWaitingForDraw(false)

    });
    
  }, []);

  const handleChooice = (word: string, type: string) => {
    setisChooseWord(false)
    setWordChoose({word:word,type:type})
  };
   const handleDraw= (draw:object) => {
      console.log('draw')
      console.log(draw)
      socket.emit('Send Draw',{name:firstPlayerName,draw:draw})
   };

  return (
    <div>
      {isWaitingForPlayer && (
        <div className={classes.container}>
          <Loading content="Waiting for player..." />
        </div>
      )}
      {isWaitingForDraw && !isWaitingForPlayer && (
        <div className={classes.container}>
          <Loading content={`Waiting for draw from ${secondPlayerName}`} />
        </div>
      )}
      {isChooseWord &&
        !isWaitingForDraw&&(
          <div className={classes.container}>
            <WordChoose handleChooice={handleChooice} />
          </div>
        )}
      {!isWaitingForDraw && !isChooseWord && (
        <div>
          <Score
            firstPlayerName={firstPlayerName}
            firstPlayerScore={firstPlayerScore}
            secondPlayerName={secondPlayerName}
            secondPlayerScore={secondPlayerScore}
            timer="1:00"
          />
          <div className={classes.word}>
            <span>{wordChoose.word}</span>
          </div>
          <div className={classes.canvas}>
            <Canvas
              userDraw={userDraw}
              isGuess={isGuess}
              handleDraw={handleDraw}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
