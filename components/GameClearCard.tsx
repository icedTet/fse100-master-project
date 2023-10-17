import dayjs from "dayjs";
import Link from "next/link";
import ConfettiExplosion from "react-confetti-explosion";
export const GameClearCard = (props: {
  title: string;
  description: string;
  icon: string;
  onClick: () => void;
  complete?: boolean;
}) => {
  const { title, description, icon, onClick } = props;
  return (
    <div className={`p-px bg-gray-600/50 rounded-3xl w-full relative group`}>
      <div
        className={`p-8 bg-gray-750 rounded-3xl flex flex-col gap-12 h-full`}
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
      </div>
    </div>
  );
};
