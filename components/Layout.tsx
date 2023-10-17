import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { HiCog, HiOutlineCog } from "react-icons/hi";
type Props = {
  children?: ReactNode;
  title?: string;
  centerContainer?: boolean;
};

const Layout = ({
  children,
  title = "This is the default title",
  centerContainer,
}: Props) => (
  <div className={`w-full grow max-w-[130ch] mx-auto flex flex-col`}>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <div className={`flex flex-row gap-4 w-full px-16 py-8 justify-between`}>
        <div className={`flex flex-row gap-4 items-center justify-between `}>
          <div className={`relative p-1`}>
            <div
              className={`bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-400 rounded-full p-1 relative z-10`}
            >
              <Image
                src="/pika.jpg"
                className={`w-16 h-16 rounded-full`}
                width={64}
                height={64}
                alt={"Profile pic"}
              />
            </div>
            <div
              className={`bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-400 rounded-full w-full h-full absolute top-0 left-0 blur-md opacity-30`}
            ></div>
          </div>
          <div className={`flex flex-col gap-0.5`}>
            <span className={`text-gray-100/40`}>👋 Welcome back,</span>
            <span className={`text-2xl text-gray-200 font-bold`}>Pikachu</span>
          </div>
        </div>
        <div className={`flex flex-row gap-4 items-center justify-center`}>
          <button
            className={`bg-gray-700/40 hover:bg-gray-700/60 text-gray-100/80 p-3 rounded-lg`}
          >
            <HiOutlineCog className={`w-6 h-6`} />
          </button>
        </div>
      </div>
    </header>
    {children}
  </div>
);

export default Layout;
