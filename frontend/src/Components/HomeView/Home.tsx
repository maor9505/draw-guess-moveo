import React from 'react'
import classes  from './home.module.css';
const Home = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>Draw && Guess</div>
      <div className={classes.main}>
        <div className={classes.box}>
          <div>
            <button className={classes.button}>Create Game</button>
          </div>
          <div>
            <button className={classes.button}>Join Game</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home