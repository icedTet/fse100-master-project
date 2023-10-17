import { useSearchParams } from "next/navigation";
import CompletePageLayout from "../../../components/Layouts/CompleteGameLayout";
import { GameClearCard } from "../../../components/GameClearCard";
import { useLocalStorage } from "../../../utils/TetHookLib";
import { DNDGameSaveData } from "../../../utils/types/GeneralGameTypes";
import TetLib from "../../../utils/TetLib";
import { useMemo } from "react";

export interface DNDStatistics {
  attemptTime?: number; // in ms
  accuracy?: number; // in %
}
export const CompletedDNDPage = () => {
  const query = useSearchParams();
  const [dndSavedGameData, setDndSavedGameData] =
    useLocalStorage<DNDGameSaveData>("dndStatistics", {
      averageAttempt: undefined,
      bestAttempt: undefined,
      lastPlayed: undefined,
      playedCount: 0,
      gameID: "dnd",
    });
  const currentAttemptData = useMemo<DNDStatistics>(() => {
    const attemptTime = parseFloat(query.get("attemptTime") || "0");
    const accuracy = parseFloat(query.get("accuracy") || "0");
    return {
      attemptTime,
      accuracy,
    };
  }, [query]);
  useMemo(() => {
    console.log({ query, currentAttemptData });
  }, [query]);
  const positiveText = useMemo(() => {
    if (
      (currentAttemptData.attemptTime || 0) >=
      (dndSavedGameData.bestAttempt?.attemptTime || 0)
    ) {
      return `🏆 Wow! that's a new all time best! You beat your best score by ${
        ~~(
          ((currentAttemptData.attemptTime || 0) -
            (dndSavedGameData.bestAttempt?.attemptTime || 0)) *
          0.1
        ) / 100
      }s!`;
    }
    if (
      (currentAttemptData.attemptTime || 0) >=
      (dndSavedGameData.averageAttempt?.attemptTime || 0)
    ) {
      return `🏆 Nice! You beat your average score by ${
        ~~(
          ((currentAttemptData.attemptTime || 0) -
            (dndSavedGameData.averageAttempt?.attemptTime || 0)) *
          0.1
        ) / 100
      }s! Now, all that's left is to beat your all time best of ${
        ~~((dndSavedGameData.bestAttempt?.attemptTime || 0) * 0.1) / 100
      }s!
        `;
    }

    return `💪 Nice try! Lets see if you can match your average score of ${
      ~~((dndSavedGameData.averageAttempt?.attemptTime || 0) * 0.1) / 100
    }s!`;
  }, [currentAttemptData]);

  return (
    <CompletePageLayout>
      <GameClearCard
        title="Picture Perfect"
        description="Piece together the puzzles in this fun and engaging drag and drop game!"
        icon={"🧩"}
        onClick={() => {}}
      />
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
                {/* <div
                  className={`flex flex-row px-6 py-4 border-2 border-gray-100/10 rounded-2xl gap-8 items-center bg-gray-800`}
                >
                  <span className={`text-5xl font-bold text-gray-100`}>
                    ⛳️
                  </span>
                  <div className={`flex flex-col gap-1`}>
                    <span className={`text-3xl font-bold text-gray-100`}>
                      Accuracy
                    </span>
                    <span className={`text-gray-100/80 text-2xl font-medium`}>
                      94%
                    </span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CompletePageLayout>
  );
};

export default CompletedDNDPage;
