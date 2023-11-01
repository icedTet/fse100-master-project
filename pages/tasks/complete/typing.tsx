"use client";
import { useSearchParams } from "next/navigation";
import CompletePageLayout from "../../../components/Layouts/CompleteGameLayout";
import { GameClearCard } from "../../../components/GameClearCard";
import { useLocalStorage } from "../../../utils/TetHookLib";

import TetLib from "../../../utils/TetLib";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import TypingGameStats from "../../../components/Games/TypingTypist/TypingGameStats";
const DnDGameStats = dynamic(
  () => import("../../../components/Games/DragAndDrop/DnDGameStats"),
  { ssr: false }
);

export const CompletedDNDPage = () => {
  return (
    <CompletePageLayout>
      <GameClearCard
        title="Typing Tune-Up!"
        description="Attention future typing champions! Get ready to rebuild your speed and accuracy with our brand new game - Typing Tune-Up!"
        icon={"⌨️"}
        onClick={() => {}}
      />
      <TypingGameStats />
    </CompletePageLayout>
  );
};

export default CompletedDNDPage;
