import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration)
import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
export const ActivityCard = (props: {
  title: string;
  description: string;
  bestAttempt: string;
  lastAttempt: number;
  icon: string;
  onClick: () => void;
  complete?: boolean;
  resetTime?: number;
  link?: string;
}) => {
  const {
    title,
    description,
    bestAttempt,
    lastAttempt,
    icon,
    onClick,
    complete,
    link,
    resetTime,
  } = props;
  const [timeUntilReset, setTimeUntilReset] = useState<number>(0);
  useLayoutEffect(() => {
    if (resetTime) {
      const interval = setInterval(() => {
        setTimeUntilReset(resetTime - Date.now());
      }, 1000);
      setTimeUntilReset(resetTime - Date.now());
      return () => {
        clearInterval(interval);
      };
    }
  }, [resetTime]);
  return (
    <div
      className={`p-px ${
        !complete
          ? `bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500`
          : complete
          ? `bg-gray-600/30`
          : `bg-gray-600`
      } rounded-3xl w-full relative group`}
    >
      {complete && (
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col gap-6 items-center justify-center w-[80%] group-hover:opacity-0 transition-all duration-150 pointer-events-none`}
        >
          <div className={`flex flex-col gap-2`}>
            <div className={`flex flex-row gap-6 items-center justify-start`}>
              <div
                className={`bg-gray-800/80 w-14 h-14 text-3xl flex flex-row items-center justify-center rounded-full`}
              >
                {icon}
              </div>
              <span className={`text-4xl text-white font-bold`}>{title}</span>
            </div>
            <span className={`text-xl text-white font-bold`}>Completed 🎉</span>
            <span className={`text-sm text-gray-200 font-normal`}>
              You've completed this task! You can play it again if you want.
              Hover over the card to see your best attempt and when you last
              played.
            </span>
            <span className={`text-xs text-gray-300 font-normal`}>
              {timeUntilReset > 0
                ? `Play again in ${dayjs
                    .duration(timeUntilReset)
                    .format("HH:mm:ss")} to build your streak!`
                : `You can play this again now!`}
            </span>
          </div>
        </div>
      )}
      <div
        className={`p-8 bg-gray-750 rounded-3xl flex flex-col gap-6 h-full ${
          complete && `blur-md group-hover:blur-0 transition-all duration-150`
        }`}
      >
        <div className={`flex flex-row gap-6 grow`}>
          <div
            className={`flex flex-row bg-gray-800 w-20 h-20 rounded-full items-center justify-center shrink-0`}
          >
            <span className={`text-5xl`}>{icon}</span>
          </div>
          <div className={`flex flex-col gap-4 grow`}>
            <span className={`text-gray-100 text-3xl font-bold font-poppins`}>
              {title}
            </span>
            <span
              className={`text-gray-100/60 text-lg font-normal font-wsans leading-tight tracking-tight grow`}
            >
              {description}
            </span>
          </div>
        </div>
        <div className={`flex flex-row justify-between items-center gap-4`}>
          <div className={`flex flex-col`}>
            <span className={`text-gray-100/40 text-xs font-light`}>
              Best attempt: {bestAttempt}
            </span>
            <span className={`text-gray-100/40 text-xs font-light`}>
              Last attempt on {
                lastAttempt ? `${dayjs(lastAttempt).format("M/D/YY")} at
                ${dayjs(lastAttempt).format("h:mm A")}` : "--/--/--"
              }
            </span>
          </div>
          <Link href={link || ""}>
            <button
              className={`bg-purple-500 rounded-2xl px-6 py-3 text-white text-sm font-medium font-wsans`}
            >
              Play now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;