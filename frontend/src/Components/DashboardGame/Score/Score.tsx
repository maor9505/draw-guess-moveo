import React,{FC} from 'react'
import { IScore } from '../../../Interfaces/score';
import classes from './score.module.css';

const Score:FC<IScore> = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.scoreboard}>
        <div className={classes["name1-field"]}>
          <span>{props.firstPlayer.name}</span>
          <span>{props.firstPlayer.score}</span>
        </div>
        <span>{props.timer}</span>
        <div className={classes["name2-field"]}>
          <span>{props.secondPlayer.name}</span>
          <span>{props.secondPlayer.score}</span>
        </div>
      </div>
    </div>
  );
}

export default Score