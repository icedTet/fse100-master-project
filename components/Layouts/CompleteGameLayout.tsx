import { useSearchParams } from "next/navigation";
import Layout from "../Layout";
import useWindowSize from "react-use/lib/useWindowSize";
import dynamic from "next/dynamic";
const ConfettiCanvas = dynamic(() => import("react-confetti"), { ssr: false });
export const CompletePageLayout = (props: { children: React.ReactNode }) => {
  const { width, height } = useWindowSize();
  return (
    <Layout title="Activity Complete!">
      <ConfettiCanvas
        width={width}
        height={height}
        className={`absolute top-0 left-0 w-screen h-screen`}
        recycle={true}
        gravity={0.2}
      />
      ;
      <div
        className={`flex flex-col gap-8 grow items-start justify-start px-16 py-12 h-full my-auto z-20 relative`}
        suppressHydrationWarning
      >
        <span className={`text-lg text-gray-100/40 font-bold`}>
          Game CLEAR!
        </span>
        {props.children}

        <span className={`text-2xl text-gray-300 font-medium`}>
          You've completed this task! You can play it again if you want. Hover
          over the card to see your best attempt and when you last played.
        </span>
      </div>
    </Layout>
  );
};

export default CompletePageLayout;
