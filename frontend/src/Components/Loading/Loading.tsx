import React,{FC} from 'react'
import classes from './loading.module.css';


const Loading = (props:{content:string}) => {
  return (
      <span className={classes.loading}>{props.content}</span>
  );
}

export default Loading