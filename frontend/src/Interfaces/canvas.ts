import { Iword } from "./Word";

 export interface Icanvas {
  handleDraw: (draw: object) => void;
  isGuess: boolean;
  userDraw: string;
  wordChoose: Iword;
  handleGuess: (isGuess: boolean, word: Iword) => void;
  handleExitGame: () => void;
}
