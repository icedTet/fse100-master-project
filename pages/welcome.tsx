import { motion } from "framer-motion";
import { useState } from "react";
import { StarBG } from "../components/StarbackBG";
import { useEffectOnce } from "react-use";
import { useRouter } from "next/router";
const animateItem = {
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
};
export const WelcomePage = () => {
  const [name, setname] = useState("");
  const [aniStage, setAniStage] = useState(0);
  const router = useRouter()
  useEffectOnce(() => {
    setTimeout(() => {
      setAniStage(1);
    }, 500);
    setTimeout(() => {
      setAniStage(2);
    }, 1000);
  });
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-12 z-10">
        <motion.div
          className={`flex flex-col items-start gap-8`}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              opacity: 0,
              //   x: -100,
              transition: {
                duration: 0.5,
                delay: 0.5,
                when: "afterChildren",
                staggerChildren: 0.1,
              },
            },
            visible: {
              opacity: 1,
              //   x: 0,
              transition: {
                duration: 0,
                delay: 0.2,
                when: "beforeChildren",
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <motion.h1
            className="text-6xl font-bold text-center text-white"
            variants={animateItem}
          >
            Welcome to the Stroke Recovery Lab
          </motion.h1>
          <motion.p
            className="text-xl text-center text-gray-200"
            variants={animateItem}
          >
            To get started, please enter your name below
          </motion.p>
          <motion.input
            //   variants={animateItem}
            variants={{
              hidden: {
                opacity: 0,
              },
              visible: {
                opacity: 1,
                transition: {
                  duration: 1,
                  type: "spring",
                  bounce: 0.5,
                },
              },
            }}
            type="text"
            className={`bg-gray-800 text-gray-100/80 px-6 py-3 rounded-2xl w-full text-4xl font-medium font-wsans focus:outline-none focus:ring-purple-500 ring-4 transition-all ring-transparent placeholder:text-2xl placeholder:font-medium placeholder:text-gray-100/40 placeholder:align-middle max-w-[45ch]`}
            placeholder={"Your Name"}
            onChange={(e) => {
              setname(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Return") {
                localStorage.setItem("name", name);
                router.push("/")
              }
            }}
            value={name}
            autoFocus
          />
          <button
            className={`bg-purple-500 rounded-2xl px-8 py-4 text-white text-xl font-medium font-wsans ${
              name.length <= 0
                ? `opacity-0 -translate-y-full pointer-events-none`
                : `opacity-100 translate-y-0 pointer-events-auto`
            } transition-all duration-300`}
            onClick={() => {
              localStorage.setItem("name", name);
                router.push("/")
            }}
          >
            Continue
          </button>
        </motion.div>
      </main>
      <StarBG aniStage={aniStage} />
    </>
  );
};
export default WelcomePage;
