import wordList from "../../../public/words.json";
import TetLib from "../../../utils/TetLib";
export class TypingTypistGame {
  wordCount: number;
  difficulty: number;
  startTime: number;
  endTime: number;
  wordList: string[];
  wordsSuccessfullyTyped: string[] = [];
  currentWord: string = "";
  currentInput: string = "";
  constructor(wordCount: number, difficulty: number) {
    this.wordCount = wordCount;
    this.difficulty = difficulty;
    this.wordList = TetLib.shuffle([...wordList]);
    this.startTime = -1;
    this.endTime = -1;
  } 
  startGame() {
    this.startTime = Date.now();
  }
  endGame() {
    this.endTime = Date.now();
  }
  getNextWord() {
    return this.wordList.pop();
  }
  onTheRightTrack(word: string, input: string) {
    return word.toLowerCase().startsWith(input.toLowerCase());
  }
  isWordCorrect(word: string, input: string) {
    return word.toLowerCase() === input.toLowerCase();
  }
  completeWord(word: string) {
    this.wordsSuccessfullyTyped.push(word);
  }
  getCurrentWord() {
    return this.currentWord;
  }
}
