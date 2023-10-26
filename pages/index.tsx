import Link from "next/link";
import Layout from "../components/Layout";
import ConfettiExplosion from "react-confetti-explosion";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ActivityCard = dynamic(() => import("../components/HomePage/Activity"), {
  ssr: false,
});
import { useLocalStorage } from "../utils/TetHookLib";
import { DNDGameSaveData } from "../utils/types/GeneralGameTypes";
const IndexPage = () => {
  const [explosionStreak, setExplosionStreak] = useState(false);
  const [explosionAccuracy, setExplosionAccuracy] = useState(false);
  const [dndSavedGameData, setDndSavedGameData] =
    useLocalStorage<DNDGameSaveData>("dndStatistics", {
      averageAttempt: undefined,
      bestAttempt: undefined,
      lastPlayed: undefined,
      playedCount: 0,
      gameID: "dnd",
    });
  useEffect(() => {
    if (explosionStreak) {
      setTimeout(() => {
        setExplosionStreak(false);
      }, 2500);
    }
  }, [explosionStreak]);

  useEffect(() => {
    if (explosionAccuracy) {
      setTimeout(() => {
        setExplosionAccuracy(false);
      }, 2500);
    }
  }, [explosionAccuracy]);
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div className={`flex flex-col gap-8 w-full h-full px-16`}>
        <div className={`flex flex-row gap-8`}>
          <div
            className={`w-80 bg-gradient-to-br from-pink-300/30 via-purple-300/30 to-indigo-400/30 flex flex-row items-center justify-start p-px rounded-2xl gap-6 shadow-sm relative group hover:from-pink-300/70 hover:via-purple-300/70 hover:to-indigo-400/70 duration-300 transition-all cursor-pointer`}
            onClick={() => {
              setExplosionStreak(true);
            }}
          >
            <div
              className={` bg-gradient-to-br from-pink-300/50 via-purple-300/50 to-indigo-400/50 w-full h-full absolute top-0 left-0 blur-xl rounded-2xl group-hover:opacity-100 opacity-0 transition-all duration-300`}
            ></div>
            <div
              className={`flex flex-row items-center justify-start p-6 rounded-2xl bg-gray-750 w-full h-full relative z-10 gap-6`}
            >
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
              >
                {explosionStreak && (
                  <ConfettiExplosion
                    force={0.8}
                    duration={2200}
                    particleCount={30}
                    width={400}
                  />
                )}
              </div>
              <div
                className={`rounded-full w-20 h-20 text-5xl bg-gray-800 flex items-center justify-center`}
              >
                🔥
              </div>
              <div className={`flex flex-col gap-1`}>
                <span
                  className={`text-gray-100/60 text-base font-medium font-wsans`}
                >
                  🎉 Daily Streak
                </span>
                <span
                  className={`bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-clip-text text-transparent text-3xl font-bold font-poppins`}
                >
                  8 Days
                </span>
              </div>
            </div>
          </div>
          <div
            className={`w-80 bg-gradient-to-r from-green-200/30 to-green-500/30 flex flex-row items-center justify-start p-px rounded-2xl gap-6 shadow-sm relative group hover:from-green-200/70 hover:to-green-500/70 duration-300 transition-all cursor-pointer`}
            onClick={() => {
              setExplosionAccuracy(true);
            }}
          >
            <div
              className={` bg-gradient-to-br from-green-200/50 to-green-500/50 w-full h-full absolute top-0 left-0 blur-xl rounded-2xl group-hover:opacity-100 opacity-0 transition-all duration-300`}
            ></div>
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
            >
              {explosionAccuracy && (
                <ConfettiExplosion
                  force={0.8}
                  duration={2200}
                  particleCount={30}
                  width={400}
                />
              )}
            </div>
            <div
              className={`flex flex-row items-center justify-start p-6 rounded-2xl bg-gray-750 w-full h-full relative z-10 gap-6`}
            >
              <div
                className={`rounded-full w-20 h-20 text-5xl bg-gray-800 flex items-center justify-center`}
              >
                💪
              </div>
              <div className={`flex flex-col gap-1`}>
                <span
                  className={`text-gray-100/60 text-base font-medium font-wsans`}
                >
                  Current Accuracy
                </span>
                <span
                  className={`bg-gradient-to-r from-green-200 to-green-500 bg-clip-text text-transparent text-3xl font-bold font-poppins`}
                >
                  80%
                </span>
                <span
                  className={`text-gray-100/30 text-sm font-medium font-wsans`}
                >
                  Up 10% from last week
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={`flex flex-col gap-6 pb-6`}>
          <span className={`text-lg text-gray-200/40 font-bold`}>
            Recommended tasks
          </span>
          <div className={`grid grid-cols-2 gap-6`}>
            {
              <ActivityCard
                title={"Typing Tune-Up!"}
                description={
                  "Attention future typing champions! Get ready to rebuild your speed and accuracy with our brand new game - Typing Tune-Up!"
                }
                bestAttempt={"25.08s"}
                lastAttempt={1832252210000}
                icon={"⌨️"}
                onClick={() => {
                  alert("Game not implemented yet");
                }}
                link="/tasks/B"
              />
            }
            {
              <ActivityCard
                title="Picture Perfect"
                description="Piece together the puzzles in this fun and engaging drag and drop game!"
                bestAttempt="1:25"
                lastAttempt={1832252210000}
                icon={"🧩"}
                onClick={() => {}}
                // less than 20 hours ago
                complete={
                  dndSavedGameData.lastPlayed !== undefined &&
                  dndSavedGameData.lastPlayed + 72000000 > Date.now()
                }
                resetTime={
                  dndSavedGameData.lastPlayed
                    ? dndSavedGameData.lastPlayed + 72000000
                    : undefined
                }
                link="/tasks/A"
              />
            }
            {
              <ActivityCard
                title="Labyrinth Escape"
                description="Navigate through perilous mazes and avoid bubbling lava pits in this intense maze runner! Play as the brave hero Questor and use your wits to guide him out of intricate labyrinths filled with traps."
                bestAttempt="25.08s"
                lastAttempt={1832252210000}
                icon={"🌋"}
                onClick={() => {
                  alert("Game not implemented yet");
                }}
                link="/tasks/C"
                complete
              />
            }
            {}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
