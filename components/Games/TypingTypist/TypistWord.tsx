import { useEffect, useMemo } from "react";

export const TypistWord = (props: {
  word: string;
  index: number;
  currentIndex: number;
  currentInput: string;
  updateSuccessRecord: (
    result: {
      char: string;
      correct: boolean;
    }[]
  ) => void;
  correctListOverride?: {
    char: string;
    correct: boolean;
  }[];
}) => {
  const {
    word,
    currentIndex,
    index,
    currentInput,
    updateSuccessRecord,
    correctListOverride,
  } = props;
  const current = index === currentIndex;
  const correctList = useMemo(() => {
    return {
      chars:
        correctListOverride ||
        word.split("").map((char) => {
          return {
            char,
            correct: true,
          };
        }),
      word,
    };
  }, [word,correctListOverride]);
  useEffect(() => {
    if (!current) return;
    const input = currentInput.split("");
    const correct = word.split("");
    if (correctList.word !== word) return;
    correctList.chars.forEach((char, index) => {
      if (input[index] && char.char !== input[index]) {
        char.correct = false;
      }
    });
  }, [current, currentInput, word]);
  useEffect(() => {
    if (current && currentInput === word) {
      //
      updateSuccessRecord(correctList.chars);
    }
  }, [current, currentInput]);
  return (
    <span
      key={`${index}-word-${word}`}
      className={`${
        current
          ? `text-4xl text-gray-100/80 font-extrabold`
          : currentIndex > index
          ? `text-lg text-green-300/30 font-light`
          : `text-lg text-gray-100/30 font-light`
      } transition-all duration-300`}
    >
      {current ? (
        word.split("").map((letter, index) => {
          return (
            <span
              key={`${index}-letter-${letter}`}
              className={`inline-block ${
                currentInput[index] === letter
                  ? `text-green-400`
                  : currentInput[index] === undefined
                  ? `text-gray-100/30`
                  : `text-red-400`
              }`}
            >
              {letter}
            </span>
          );
        })
      ) : currentIndex > index ? (
        correctList.chars.map((char, index) => {
          return (
            <span
              key={`${index}-letter-${char.char}`}
              className={`inline-block ${
                char.correct ? `text-green-400` : `text-red-400`
              } font-medium`}
            >
              {char.char} {char.correct}
            </span>
          );
        })
      ) : (
        <span className={`inline-block`}>{word} </span>
      )}
    </span>
  );
};
