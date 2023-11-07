import {
  useState,
  useEffect,
  useMemo,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import Layout from "../../components/Layout";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import TetLib from "../../utils/TetLib";
import wordList from "../../public/words.json";
import { TypistWord } from "../../components/Games/TypingTypist/TypistWord";
import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi";
const TypistCountdown = dynamic(
  () => import("../../components/Games/TypingTypist/TypistCountdown"),
  { ssr: false }
);
const timeLimit = 1000 * 60 * 0.5; // 30 seconds
export type TypingTypistWordResult = Map<
  string,
  {
    char: string;
    correct: boolean;
  }[]
>;
/**
 * Timer component that counts down from a given timestamp. Will show MM:SS when the timestamp is greater than 1 minute, and SS.MS when the timestamp is less than 1 minute.
 */
const Timer = (props: { timestamp: number; className?: string }) => {
  const { timestamp, className } = props;
  const [timeLeft, setTimeLeft] = useState(timestamp - Date.now());

  // Set an interval to update the time left until the timestamp is reached
  useEffect(() => {
    // Update the time left every 50ms
    const interval = setInterval(() => {
      setTimeLeft(timestamp - Date.now());
    }, 50);

    // Clear the interval when the time left reaches 0 as to not have the interval running in the background
    if (timeLeft <= 0) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timeLeft]);

  const ms = timeLeft % 1000;
  const seconds = Math.floor((timeLeft / 1000) % 60);
  const minutes = Math.floor(timeLeft / (1000 * 60));
  if (seconds < 0) return <p className={className}>--</p>;
  return minutes > 0 ? (
    <p className={className}>
      {`${minutes}`.padStart(2, "0")}:{`${seconds}`.padStart(2, "0")}
    </p>
  ) : (
    <p className={className}>
      {`${seconds}`.padStart(2, "0")}.{`${~~(ms / 10)}`.padEnd(2, "0")} seconds
    </p>
  );
};
export const getCorrectSize = (
  correctList: TypingTypistWordResult,
  strict: boolean = false
) => {
  let points = 0;
  correctList.forEach((correct) => {
    const correctChars = correct.filter((char) => char.correct);
    if (strict) return correctChars.length === correct.length ? points++ : null;
    points += ~~!!correctChars.length;
  });
  return points;
};
// Main game page
export const TypingTypistGamePage = (props: { list: string[] }) => {
  const { list } = props;
  // Declare state variables
  const [wordPosition, setWordPosition] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [countdown, setCountdown] = useState(7);
  const [inputValue, setInputValue] = useState("");
  const inputBox = useRef<HTMLInputElement>(null);
  const successRecord = useMemo(() => new Map() as TypingTypistWordResult, []);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const gameInSession = useMemo(
    () => gameStarted && !gameEnded,
    [gameEnded, gameStarted]
  );
  useMemo(() => {
    if (!gameEnded) return;
    let correct = 0;
    let total = 0;
    Array.from(successRecord.values())
      .flat(2)
      .forEach((char) => {
        total++;
        if (char.correct) correct++;
      });
    globalThis?.sessionStorage?.setItem(
      `typingGameStats`,
      JSON.stringify({
        accuracy: ~~(correct / total),
        words: getCorrectSize(successRecord),
        charLists: [...Array.from(successRecord.values())],
      })
    );
  }, [gameEnded]);
  // Create a function to update the success record, which will be called when a word is typed correctly or skipped over
  const updateSuccessRecord = useCallback(
    (
      result: {
        char: string;
        correct: boolean;
      }[]
    ) => {
      const word = result.map((r) => r.char).join("");
      successRecord.set(word, result);
      console.log(successRecord);
    },
    []
  );
  // Set up a countdown timer before the game starts
  useLayoutEffect(() => {
    if (countdown > 0) {
      setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      const endTime = Date.now() + timeLimit;
      setGameStarted(true);
      setTimeout(() => {
        setGameEnded(true);
        inputBox.current?.blur();
      }, timeLimit);
      setStartTime(Date.now());
      setEndTime(endTime);

      setTimeout(() => {
        inputBox.current?.focus();
      }, 50);
    }
  }, [countdown]);
  // Set up a listener to check if the input value matches the current word in the list and update the word position if it does
  useEffect(() => {
    if (inputValue === list[wordPosition]) {
      setWordPosition(wordPosition + 1);
      setInputValue("");
    }
  }, [inputValue, wordPosition]);
  return (
    <Layout title="Home | Next.js + TypeScript Example" className={` max-h-screen overflow-hidden`}>
      <div
        className={`w-full h-full flex flex-col items-center justify-center gap-8 grow relative`}
      >
        {/* Render a countdown timer before the game starts */}
        <TypistCountdown countdown={countdown} />
        {/* If the game has started, render the game */}
        <div
          className={`absolute bottom-0 left-0 w-full h-[101%] z-40 ${
            gameEnded
              ? `backdrop-blur-md pointer-events-auto opacity-100`
              : `pointer-events-none opacity-0`
          } duration-1000 flex flex-col gap-8 items-center justify-center`}
        >
          <h1 className={`text-6xl text-gray-200 font-black`}>Game Over!</h1>
          <Link href={"/tasks/complete/typing"}>
            <button
              className={`bg-purple-500 rounded-2xl px-6 py-3 text-white text-sm font-medium font-wsans`}
            >
              View Results
            </button>
          </Link>
        </div>
        <motion.div
          className={`flex flex-col gap-32 items-center justify-between h-full grow pb-8 ${
            countdown > 1 && "opacity-0"
          }`}
          variants={{
            hidden: {
              opacity: 0,
              y: -200,
              // scale: 0,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 1,
                type: "spring",
                bounce: 0.5,
              },
            },
          }}
          animate={gameStarted ? "visible" : "hidden"}
        >
          <div
            className={`relative w-[100ch] max-w-[90vw] flex flex-col gap-4 h-full`}
          >
            <div
              className={`bg-gray-800/50  p-6 rounded-2xl backdrop-blur-lg flex flex-row gap-8 items-center border border-gray-100/10 justify-between`}
            >
              <Link
                href={`/`}
                onClick={() => {
                }}
              >
                <div
                  className={`bg-gray-700/50 h-12 aspect-square flex flex-row items-center justify-center rounded-xl cursor-pointer hover:bg-gray-600 transition-all duration-150 z-30`}
                >
                  <HiChevronLeft className={`text-white text-2xl`} />
                </div>
              </Link>
              <div className={`flex flex-row items-baseline gap-2 w-fit`}>
                <p
                  className={`text-white text-2xl font-bold whitespace-nowrap`}
                >
                  {endTime && <Timer timestamp={endTime} className={`w-fit`} />}
                </p>
                <span className={`text-lg font-medium text-white`}>left</span>
              </div>

              <div className={`flex flex-row items-baseline gap-4`}>
                <p className={`text-white text-2xl font-bold`}>
                  {getCorrectSize(successRecord) > 0
                    ? ~~(
                        (getCorrectSize(successRecord) /
                          ((Date.now() - startTime) / (1000 * 60))) *
                        100
                      ) / 100
                    : "--"}
                </p>
                <span className={`text-lg font-medium text-white`}>WPM</span>
              </div>

              <div className={`flex flex-row items-baseline gap-4 `}>
                <p className={`text-white text-2xl font-bold`}>
                  {getCorrectSize(successRecord)}
                </p>
                <span className={`text-lg font-medium text-white`}>Words</span>
              </div>
            </div>
            <div
              className={` flex flex-row items-baseline justify-center gap-4 flex-wrap h-full relative`}
            >
              <div
                className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-800/0 via-gray-850/0 to-gray-850/80`}
              />
              {list.map((word, index) => {
                // Only render the words that are within 30 words before and 80 words after the current word position as to not render too many words at once
                if (index < wordPosition - 30) {
                  return null;
                }
                if (index > wordPosition + 80) {
                  return null;
                }
                return (
                  <TypistWord
                    word={word}
                    index={index}
                    currentIndex={wordPosition}
                    currentInput={inputValue}
                    updateSuccessRecord={updateSuccessRecord}
                    correctListOverride={successRecord.get(word)}
                  />
                );
              })}
            </div>
          </div>
          <div className={`flex flex-col gap-4 w-full`}>
            <input
              type="text"
              className={`bg-gray-800 text-gray-100/80 px-6 py-3 rounded-2xl w-full text-4xl font-medium font-wsans focus:outline-none focus:ring-purple-500 ring-4 transition-all ring-transparent placeholder:text-2xl placeholder:font-medium placeholder:text-gray-100/40 placeholder:align-middle`}
              placeholder={list[wordPosition]}
              onChange={(e) => {
                setInputValue(e.target.value.replace(/ /g, ""));
              }}
              onKeyDown={(e) => {
                // if key is a newline, clear the input box but mark the word as incorrect
                if (e.key === "Enter" || e.key === "Return") {
                  // Clear the input box
                  setInputValue("");
                  const inputSplit = inputValue.split("");
                  // Keep the correct characters as correct and mark the rest as incorrect
                  const correctList = list[wordPosition]
                    .split("")
                    .map((char, index) => {
                      return {
                        char,
                        correct: false,
                      };
                    });
                  console.log(correctList);
                  // Update the success record
                  updateSuccessRecord(correctList);
                  // Move on to the next word
                  setWordPosition(wordPosition + 1);
                }
              }}
              value={inputValue}
              autoFocus
              ref={inputBox}
              onBlur={() => {
                if (!gameInSession) return;
                // When the input box is blurred, focus it again so that the user can continue typing
                inputBox.current?.focus();
              }}
              onFocus={() => {
                if (!gameInSession) inputBox.current?.blur();
              }}
            />
            <div className={`flex flex-col gap-1 justify-between`}>
              <p className={`text-gray-200/50 text-lg flex flex-row gap-1`}>
                <span className={`font-bold`}>🎯 Goal:</span> Try to type the
                words as fast as you can! You have 2 minutes and 30 seconds.
              </p>
              <p className={`text-gray-200/50 text-lg flex flex-row gap-1`}>
                <span className={`font-bold`}>Tip: </span> If you want to skip a
                word, press Enter.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};
export default TypingTypistGamePage;
export const getServerSideProps = async () => {
  // To ensure client side hydration works properly, we need to shuffle the word list on the server side and not the client side (as the client side will not be able to access the word list) and pass it as a prop to the page
  const shuffled = TetLib.shuffle([...wordList]);
  return {
    props: {
      list: shuffled,
    },
  };
};
