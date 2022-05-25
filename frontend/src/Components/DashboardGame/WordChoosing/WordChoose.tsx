import React, { useState, useEffect, FC } from "react";
import classes from "./wordchoose.module.css";
import randomWord from "random-words";

const WordChoose = (props: {
  handleChooice: (word: string, type: string) => void;
}) => {
  const [word3Or4, setWord3Or4] = useState<string>("");
  const [word5, setWord5] = useState<string>("");
  const [word6OrHigher, setWord6OrHigher] = useState<string>("");
  useEffect(() => {
    console.log("choose Word C");
    // setWord3Or4(getWord([3, 4]));
    // setWord5(getWord([5]));
    // setWord6OrHigher(getWord([6]));
    setWord3Or4(getWordWith3Or4());
    setWord5(getWordWith5());
     setWord6OrHigher(getmin6OrHigher());
  }, []);

  // return word with min 3 letters or max 4 letter
  const getWordWith3Or4 = (): string => {
    let word=randomWord()
    if (word.length === 3 || word.length === 4) {
      return word;
    }
    const sWord = randomWord();
    return getWordWith3Or4();
  };

  // return word with 5 letters
  const getWord = (lengthOptions: number[]): string => {
    let word = randomWord();
    if (lengthOptions.length > 1) {
      while (
        word.length !== lengthOptions[0] ||
        word.length !== lengthOptions[1]
      ) {
        word = randomWord();
      }
    }else{
    while (word.length !== lengthOptions[0]) {
      word = randomWord();
    }
  }
    return word;
  };

  // return word with 5 letters
  const getWordWith5 = (): string => {
        let word = randomWord();

    if (word.length === 5) {
      return word;
    }
    const sWord = randomWord();
    return getWordWith5();
  };

  // return word with min 6 letters or higher
  const getmin6OrHigher = (): string => {
        let word = randomWord();
    if (word.length >= 6) {
      return word;
    }
    const sWord = randomWord();
    return getmin6OrHigher();
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

export default WordChoose;
