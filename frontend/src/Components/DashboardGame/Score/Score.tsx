import React,{FC} from 'react'
import classes from './score.module.css';
interface Score {
  firstPlayerName:string;
  firstPlayerScore:number;
  secondPlayerName:string;
  secondPlayerScore:number;
  timer: string;
}
const Score:FC<Score> = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.scoreboard}>
        <div className={classes["name1-field"]}>
          <span>{props.firstPlayerName}</span>
          <span>{props.firstPlayerScore}</span>
        </div>
        <span>{props.timer}</span>
        <div className={classes["name2-field"]}>
          <span>{props.secondPlayerName}</span>
          <span>{props.secondPlayerScore}</span>
        </div>
      </div>
    </div>
  );
}

export default Score