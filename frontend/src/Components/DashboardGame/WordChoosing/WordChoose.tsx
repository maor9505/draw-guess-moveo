import React, { useState ,useEffect} from 'react'
import classes from './wordchoose.module.css';
import randomWord from 'random-words';
const WordChoose = () => {

const [word3Or4, setWord3Or4]=useState<string>();
const [word5, setWord5] = useState<string>();
const [word6OrHigher, setWord6OrHigher] = useState<string>();
  useEffect(() => {
    let w = randomWord();
    setWord3Or4(getWordWith3Or4(w))
    setWord5(getWordWith5(w));
    setWord6OrHigher(getmin6OrHigher(w))

  }, [])
  

  const getWordWith3Or4 = (word: string): string => {
    if (word.length === 3 || word.length===4) {
      return word;
    }
    const sWord = randomWord();
    return getWordWith3Or4(sWord);
  };

  const getWordWith5 = (word: string): string => {
    if (word.length === 5) {
      return word;
    }
    const sWord = randomWord();
    return getWordWith5(sWord);
  };

  const getmin6OrHigher = (word: string): string => {
    if (word.length >= 6) {
      return word;
    }
    const sWord = randomWord();
    return getmin6OrHigher(sWord);
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>Pick up a Word</div>
      <div className={classes.main}>
        <div className={classes.box}>
          <div>
            <span>Easy:</span>
            <button className={classes.button}>{word3Or4}</button>
          </div>
          <div>
            <span>Medium:</span>
            <button className={classes.button}>{word5}</button>
          </div>{" "}
          <div>
            <span>Difficult:</span>
            <button className={classes.button}>{word6OrHigher}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WordChoose