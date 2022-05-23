import React from 'react'
import { useParams } from 'react-router-dom'
import Canvas from './Canvas/Canvas';
import Score from './Score/Score';
import classes from './game.module.css'
import WordChoose from './WordChoosing/WordChoose';
const Game = () => {
    const {name}=useParams();
    
  return (
    <div>
        {/* <WordChoose/> */}
      <Score
        player1="maor"
        score1="10"
        player2="shir"
        score2="20"
        timer="1:00"
      />
      <div className={classes.canvas}>
        <Canvas />
      </div>
    </div>
  );
}

export default Game