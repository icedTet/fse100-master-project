import { useSearchParams } from "next/navigation";
import { useMemo, useRef } from "react";
import { useLocalStorage } from "react-use";
import TetLib from "../../../utils/TetLib";
import {
  DNDGameSaveData,
  DNDStatistics,
} from "../../../utils/types/GeneralGameTypes";
import ReactConfetti from "react-confetti";
import ConfettiExplosion from "react-confetti-explosion";

export const DnDGameStats = () => {
  const query = useSearchParams();
  const [dndSavedGameData, setDndSavedGameData] =
    useLocalStorage<DNDGameSaveData>("dndStatistics", {
      averageAttempt: undefined,
      bestAttempt: undefined,
      lastPlayed: undefined,
      playedCount: 0,
      gameID: "dnd",
    });
  const tallied = useRef(false);

  const currentAttemptData = useMemo<DNDStatistics>(() => {
    if (tallied.current) {
      return {
        attemptTime: 0,
        points: 0,
      };
    }
    const attemptTime = parseFloat(query.get("attemptTime") || "0");
    const score = parseFloat(query.get("score") || "0");
    globalThis?.localStorage?.setItem(
      "dndStatistics",
      JSON.stringify({
        averageAttempt: {
          attemptTime:
            ((dndSavedGameData!.averageAttempt?.attemptTime || 0) *
              dndSavedGameData!.playedCount +
              attemptTime) /
            (dndSavedGameData!.playedCount + 1),
          accuracy:
            ((dndSavedGameData!.averageAttempt?.points || 0) *
              dndSavedGameData!.playedCount +
              score) /
            (dndSavedGameData!.playedCount + 1),
        },
        bestAttempt: {
          attemptTime:
            (dndSavedGameData!.bestAttempt?.attemptTime || 0) <= attemptTime &&
            dndSavedGameData!.bestAttempt?.attemptTime !== 0
              ? dndSavedGameData!.bestAttempt?.attemptTime
              : attemptTime,
          accuracy:
            (dndSavedGameData!.bestAttempt?.points || 0) > score
              ? dndSavedGameData!.bestAttempt?.points || 0
              : score,
        },
        lastPlayed: Date.now(),
        playedCount: dndSavedGameData!.playedCount + 1,
        gameID: "dnd",
      })
    );
    const dailyStreak = JSON.parse(
      globalThis?.localStorage?.getItem("dailyStreak") ||
        JSON.stringify({
          lastPlayed: 0,
          streak: 0,
        })
    );
    // if last played is gt than 24 hours ago but less than 48h ago, increment streak
    if (dailyStreak.lastPlayed < Date.now() - 172800000) {
      dailyStreak.streak++;
    }
    // if last played is gt than 48 hours ago, reset streak
    if (dailyStreak.lastPlayed < Date.now() - 172800000) {
      dailyStreak.streak = 1;
    }
    dailyStreak.lastPlayed = Date.now();
    globalThis?.localStorage?.setItem(
      "dailyStreak",
      JSON.stringify(dailyStreak)
    );

    console.log(
      {
        averageAttempt: {
          attemptTime:
            ((dndSavedGameData!.averageAttempt?.attemptTime || 0) *
              dndSavedGameData!.playedCount +
              attemptTime) /
            (dndSavedGameData!.playedCount + 1),
          accuracy:
            ((dndSavedGameData!.averageAttempt?.points || 0) *
              dndSavedGameData!.playedCount +
              score) /
            (dndSavedGameData!.playedCount + 1),
        },
        bestAttempt: {
          attemptTime:
            (dndSavedGameData!.bestAttempt?.attemptTime || 0) <= attemptTime
              ? dndSavedGameData!.bestAttempt?.attemptTime || 0
              : attemptTime,
          accuracy:
            (dndSavedGameData!.bestAttempt?.points || 0) > score
              ? dndSavedGameData!.bestAttempt?.points || 0
              : score,
        },
        lastPlayed: Date.now(),
        playedCount: dndSavedGameData!.playedCount + 1,
        gameID: "dnd",
      },
      { attemptTime }
    );
    return {
      attemptTime,
      points: score,
    };
  }, [query]);
  useMemo(() => {
    console.log({ query, currentAttemptData });
  }, [query]);
  const positiveText = useMemo(() => {
    if (
      !dndSavedGameData!.bestAttempt?.attemptTime ||
      (currentAttemptData.attemptTime || 0) <=
        dndSavedGameData!.bestAttempt?.attemptTime
    ) {
      return `🏆 Wow! that's a new all time best! You beat your best score by ${
        ~~(dndSavedGameData!.bestAttempt?.attemptTime
          ? (dndSavedGameData!.bestAttempt?.attemptTime || 0) -
            (currentAttemptData.attemptTime || 0)
          : currentAttemptData.attemptTime * 0.1) / 100
      }s!`;
    }
    if (
      (currentAttemptData.attemptTime || 0) <=
      (dndSavedGameData!.averageAttempt?.attemptTime || 0)
    ) {
      return `🏆 Nice! You beat your average score of ${
        ~~((dndSavedGameData!.averageAttempt?.attemptTime || 0) * 0.1) / 100
      } by ${
        ~~(
          ((dndSavedGameData!.averageAttempt?.attemptTime || 0) -
            (currentAttemptData.attemptTime || 0)) *
          0.1
        ) / 100
      }s! Now, all that's left is to beat your all time best of ${
        ~~((dndSavedGameData!.bestAttempt?.attemptTime || 0) * 0.1) / 100
      }s!
        `;
    }

    return `💪 Nice try! Lets see if you can match your average score of ${
      ~~((dndSavedGameData!.averageAttempt?.attemptTime || 0) * 0.1) / 100
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
                    Attempt Time
                  </span>
                  <div className="flex flex-row gap-2 items-baseline">
                    <span className={`text-gray-100/80 text-2xl font-medium`}>
                      {currentAttemptData.attemptTime
                        ? TetLib.SecsToFormat(
                            ~~(currentAttemptData.attemptTime / 1000)
                          )
                        : `--`}
                    </span>
                    <span className={`text-gray-100/40 text-lg font-medium`}>
                      (
                      {currentAttemptData.attemptTime
                        ? ~~((currentAttemptData.attemptTime * 100) / 1000) /
                          100
                        : `--`}
                      s)
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
                    (dndSavedGameData?.bestAttempt?.attemptTime ||
                      Number.MAX_VALUE) >=
                      (currentAttemptData.attemptTime || 0) && `animate-bounce`
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
                      {(dndSavedGameData?.bestAttempt?.attemptTime ||
                        Number.MAX_VALUE) <=
                      (currentAttemptData.attemptTime || 0)
                        ? dndSavedGameData?.bestAttempt?.attemptTime
                          ? TetLib.SecsToFormat(
                              ~~(
                                dndSavedGameData?.bestAttempt?.attemptTime /
                                1000
                              )
                            )
                          : `--`
                        : currentAttemptData.attemptTime
                        ? TetLib.SecsToFormat(
                            ~~(currentAttemptData.attemptTime / 1000)
                          )
                        : `--`}
                    </span>
                    <span className={`text-gray-100/40 text-lg font-medium`}>
                      (
                      {(dndSavedGameData?.bestAttempt?.attemptTime ||
                        Number.MAX_VALUE) <=
                      (currentAttemptData.attemptTime || 0)
                        ? dndSavedGameData?.bestAttempt?.attemptTime
                          ? ~~(
                              (dndSavedGameData?.bestAttempt?.attemptTime *
                                100) /
                              1000
                            ) / 100
                          : `--`
                        : currentAttemptData.attemptTime
                        ? ~~((currentAttemptData.attemptTime * 100) / 1000) /
                          100
                        : `--`}
                      s)
                    </span>
                  </div>
                  {(dndSavedGameData?.bestAttempt?.attemptTime ||
                    Number.MAX_VALUE) >=
                    (currentAttemptData.attemptTime || 0) && (
                    <span className={`text-gray-100/60 text-xs font-normal`}>
                      Old best:{" "}
                      {dndSavedGameData?.bestAttempt?.attemptTime
                        ? TetLib.SecsToFormat(
                            ~~(
                              dndSavedGameData?.bestAttempt?.attemptTime / 1000
                            )
                          )
                        : `--`}{" "}
                      (
                      {dndSavedGameData?.bestAttempt?.attemptTime
                        ? ~~(
                            (dndSavedGameData?.bestAttempt?.attemptTime * 100) /
                            1000
                          ) / 100
                        : `--`}
                      s)
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
export default DnDGameStats;
