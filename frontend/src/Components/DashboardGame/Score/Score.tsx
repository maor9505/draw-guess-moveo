import React,{FC} from 'react'
import classes from './score.module.css';
interface Score{
  player1:string;
  score1:string;
  player2:string;
  score2:string;
  timer:string;
}
const Score:FC<Score> = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.scoreboard}>
        <div className={classes["name1-field"]}>
          <span>{props.player1}</span>
          <span>{props.score1}</span>
        </div>
        <span>{props.timer}</span>
        <div className={classes["name2-field"]}>
          <span>{props.player2}</span>
          <span>{props.score2}</span>
        </div>
      </div>
    </div>
  );
}

export default Score