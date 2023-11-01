import { motion } from "framer-motion";

export const TypistCountdown = (props: {
  countdown: number;
  className?: string;
}) => {
  const { countdown, className } = props;
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: -100,
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
      animate={countdown > 0 ? "visible" : "hidden"}
      className={`flex flex-col gap-12 items-center justify-center absolute`}
    >
      <h1 className={`text-6xl text-gray-200 font-black`}>
        ⌨️ Typing Typist...
      </h1>
      <div className={`relative w-full`}>
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              y: 100,
              scale: 0
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 1,
                type: "spring",
                bounce: 0.8,
              },
            },
          }}
          animate={countdown >= 5 ? "visible" : "hidden"}
        >
          <span
            className={`text-4xl font-black text-gray-200 absolute top-0 left-1/2 -translate-x-1/2 w-max`}
          >
            Get Ready
          </span>
        </motion.div>
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              y: 100,
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
          animate={countdown <= 1 ? "visible" : "hidden"}
        >
          <span
            className={`text-4xl font-black text-gray-200 absolute top-0 left-1/2 -translate-x-1/2 w-max ${
                countdown >=5 ? `hidden` : `block`
              }`}
          >
            Go!
          </span>
        </motion.div>

        {[3, 2, 1].map((c) => (
          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: 100,
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
            animate={countdown === c + 1 ? "visible" : "hidden"}
          >
            <span
              className={`text-4xl font-bold text-gray-200 absolute top-0 left-1/2 -translate-x-1/2 w-max ${
                countdown >=5 ? `hidden` : `block`
              }`}
            >
              {c}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
export default TypistCountdown;
