import React, { useState ,useEffect,FC} from 'react'
import classes from './wordchoose.module.css';
import randomWord from 'random-words';

const WordChoose = (props: {
  handleChooice: (word: string, type: string) => void;
}) => {
  const [word3Or4, setWord3Or4] = useState<string>("");
  const [word5, setWord5] = useState<string>("");
  const [word6OrHigher, setWord6OrHigher] = useState<string>("");
  useEffect(() => {
    let w = randomWord();
    setWord3Or4(getWordWith3Or4(w));
    setWord5(getWordWith5(w));
    setWord6OrHigher(getmin6OrHigher(w));
  }, []);

  // return word with min 3 letters or max 4 letter
  const getWordWith3Or4 = (word: string): string => {
    if (word.length === 3 || word.length === 4) {
      return word;
    }
    const sWord = randomWord();
    return getWordWith3Or4(sWord);
  };

  // return word with 5 letters
  const getWordWith5 = (word: string): string => {
    if (word.length === 5) {
      return word;
    }
    const sWord = randomWord();
    return getWordWith5(sWord);
  };

  // return word with min 6 letters or higher
  const getmin6OrHigher = (word: string): string => {
    if (word.length >= 6) {
      return word;
    }
    const sWord = randomWord();
    return getmin6OrHigher(sWord);
  };

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <div className={classes.box}>
          <div className={classes.title}>Draw one</div>
          <div className={classes.options}>
            <span>easy</span>
            <button
              className={classes.button}
              onClick={() => props.handleChooice(word3Or4, "easy")}
            >
              {word3Or4}
            </button>
            <span>1 point</span>
          </div>
          <div className={classes.options}>
            <span>medium</span>
            <button
              className={classes.button}
              onClick={() => props.handleChooice(word5, "medium")}
            >
              {word5}
            </button>
            <span>2 point</span>
          </div>
          <div className={classes.options}>
            <span>hard</span>
            <button
              className={classes.button}
              onClick={() => props.handleChooice(word6OrHigher, "hard")}
            >
              {word6OrHigher}{" "}
            </button>
            <span>3 point</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordChoose