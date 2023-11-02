import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useLocalStorage } from "react-use";
import TetLib from "../../../utils/TetLib";
import {
  DNDGameSaveData,
  DNDStatistics,
  TypingGameSaveData,
  TypingStatistics,
} from "../../../utils/types/GeneralGameTypes";
import ReactConfetti from "react-confetti";
import ConfettiExplosion from "react-confetti-explosion";

export const TypingGameStats = () => {
  const query = useSearchParams();
  const [typingSavedGameData, setTypingSavedGameData] =
    useLocalStorage<TypingGameSaveData>("typingStats", {
      averageAttempt: undefined,
      bestAttempt: undefined,
      lastPlayed: undefined,
      playedCount: 0,
      gameID: "dnd",
    });
  const currentAttemptData = useMemo<
    TypingStatistics & {
      charLists: {
        char: string;
        correct: boolean;
      }[][];
    }
  >(() => {
    const lastGame = JSON.parse(
      globalThis?.sessionStorage?.getItem("typingGameStats") || "null"
    );
    if (!lastGame) {
      return {
        words: 0,
        accuracy: 0,
        charLists: [],
      };
    }

    globalThis?.localStorage?.setItem(
      "typingStats",
      JSON.stringify({
        averageAttempt: {
          accuracy:
            ((typingSavedGameData!.averageAttempt?.accuracy || 0) *
              typingSavedGameData!.playedCount +
              lastGame.accuracy) /
            (typingSavedGameData!.playedCount + 1),
          words:
            (typingSavedGameData!.averageAttempt?.words || 0 + lastGame.words) /
            (typingSavedGameData!.playedCount + 1),
        },
        bestAttempt: {
          accuracy:
            (typingSavedGameData!.bestAttempt?.accuracy || 0) >
            lastGame.accuracy
              ? typingSavedGameData!.bestAttempt?.accuracy || 0
              : lastGame.accuracy,
          words:
            (typingSavedGameData!.bestAttempt?.words || 0) <= lastGame.words
              ? lastGame.words
              : typingSavedGameData!.bestAttempt?.words || 0,
        },
        lastPlayed: Date.now(),
        playedCount: typingSavedGameData!.playedCount + 1,
        gameID: "typing",
      } as TypingGameSaveData)
    );
    return {
      accuracy: lastGame.accuracy,
      words: lastGame.words,
      charLists: lastGame.charLists,
    };
  }, [query]);
  useMemo(() => {
    console.log({ query, currentAttemptData });
  }, [query]);
  const positiveText = useMemo(() => {
    if (
      (currentAttemptData.words || 0) >=
      (typingSavedGameData!.bestAttempt?.words || 0)
    ) {
      return `🏆 Wow! that's a new all time best! You beat your best score by ${
        (currentAttemptData.words || 0) -
        (typingSavedGameData!.bestAttempt?.words || 0)
      } words!`;
    }
    if (
      (currentAttemptData.words || 0) >=
      (typingSavedGameData!.averageAttempt?.words || 0)
    ) {
      return `🏆 Nice! You beat your average word count of ${
        ~~((typingSavedGameData!.averageAttempt?.words || 0) * 100) / 100
      } by ${
        ~~(
          ((currentAttemptData.words || 0) -
            (typingSavedGameData!.averageAttempt?.words || 0)) *
          100
        ) / 100
      } words! Now, all that's left is to beat your all time best of ${
        ~~((typingSavedGameData!.bestAttempt?.words || 0) * 100) / 100
      } words!
        `;
    }

    return `💪 Nice try! Lets see if you can match your average score of ${
      ~~((typingSavedGameData!.averageAttempt?.words || 0) * 0.1) / 100
    }s!`;
  }, [currentAttemptData]);

  return (
    <div
      className={`p-px bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-3xl w-full relative group`}
    >
      <div
        className={`p-16 bg-gray-800 rounded-3xl flex flex-col gap-6 h-full`}
      >
        <div className={`flex flex-row gap-6 grow`}>
          <div
            className={`flex flex-row bg-gray-850 w-20 h-20 rounded-full items-center justify-center shrink-0`}
          >
            <span className={`text-5xl`}>🏆</span>
          </div>
          <div className={`flex flex-col gap-4 grow`}>
            <span className={`text-gray-100 text-5xl font-bold font-poppins`}>
              Game Statistics
            </span>

            {/* <span
                className={`text-gray-100/60 text-lg font-normal font-wsans leading-tight tracking-tight grow`}
              >
                aa
              </span> */}
            <div className={`flex flex-col gap-4 py-6 max-w-1/2`}>
              <div
                className={`flex flex-row px-6 py-4 border-2 border-gray-100/10 rounded-2xl gap-8 items-center bg-gray-800`}
              >
                <span className={`text-5xl font-bold text-gray-100`}>⏱️</span>
                <div className={`flex flex-col gap-1`}>
                  <span className={`text-3xl font-bold text-gray-100`}>
                    Words Typed
                  </span>
                  <div className="flex flex-row gap-2 items-baseline">
                    <span className={`text-gray-100/80 text-2xl font-medium`}>
                      {currentAttemptData.words
                        ? `${currentAttemptData.words} words`
                        : `--`}
                    </span>
                  </div>
                  <span className={`text-gray-100/60 text-xs font-normal`}>
                    {positiveText}
                  </span>
                </div>
              </div>
              <div
                className={`flex flex-row px-6 py-4 border-2 border-gray-100/10 rounded-2xl gap-8 items-center bg-gray-800 relative`}
              >
                <span
                  className={`text-5xl font-bold text-gray-100 ${
                    (typingSavedGameData?.bestAttempt?.words ||
                      Number.MIN_VALUE) <= (currentAttemptData.words || 0) &&
                    `animate-bounce`
                  }`}
                >
                  👑
                </span>
                <div className={`flex flex-col gap-1`}>
                  <span className={`text-3xl font-bold text-gray-100`}>
                    All Time Best
                  </span>
                  <div className="flex flex-row gap-2 items-baseline">
                    <span className={`text-gray-100/80 text-2xl font-medium`}>
                      {(typingSavedGameData?.bestAttempt?.words ||
                        Number.MIN_VALUE) >= (currentAttemptData.words || 0)
                        ? typingSavedGameData?.bestAttempt?.words
                          ? `${typingSavedGameData?.bestAttempt?.words} words`
                          : `--`
                        : currentAttemptData.words
                        ? `${currentAttemptData.words} words`
                        : `--`}
                    </span>
                  </div>
                  {(typingSavedGameData?.bestAttempt?.words ||
                    Number.MIN_VALUE) <= (currentAttemptData.words || 0) && (
                    <span className={`text-gray-100/60 text-xs font-normal`}>
                      Old best: {typingSavedGameData?.bestAttempt?.words} words
                    </span>
                  )}
                </div>
              </div>
              <div
                className={`flex flex-row px-6 py-4 border-2 border-gray-100/10 rounded-2xl gap-8 items-center bg-gray-800 relative`}
              >
                <span
                  className={`text-5xl font-bold text-gray-100 ${
                    (typingSavedGameData?.bestAttempt?.words ||
                      Number.MIN_VALUE) <= (currentAttemptData.words || 0) &&
                    `animate-bounce`
                  }`}
                >
                  🤏
                </span>
                <div className={`flex flex-col gap-1`}>
                  <span className={`text-3xl font-bold text-gray-100`}>
                    Missed Words
                  </span>
                  <div className="flex flex-row gap-2 items-baseline">
                    {currentAttemptData.charLists.map((charList, index) => {
                      charList.map((char, index) => {
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
                      });
                    })}
                  </div>
                  {(typingSavedGameData?.bestAttempt?.words ||
                    Number.MIN_VALUE) <= (currentAttemptData.words || 0) && (
                    <span className={`text-gray-100/60 text-xs font-normal`}>
                      Old best: {typingSavedGameData?.bestAttempt?.words} words
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TypingGameStats;
