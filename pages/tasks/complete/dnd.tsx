"use client";
import { useSearchParams } from "next/navigation";
import CompletePageLayout from "../../../components/Layouts/CompleteGameLayout";
import { GameClearCard } from "../../../components/GameClearCard";
import { useLocalStorage } from "../../../utils/TetHookLib";

import TetLib from "../../../utils/TetLib";
import { useMemo } from "react";
import dynamic from "next/dynamic";
const DnDGameStats = dynamic(
  () => import("../../../components/Games/DragAndDrop/DnDGameStats"),
  { ssr: false }
);

export const CompletedDNDPage = () => {
  return (
    <CompletePageLayout>
      <GameClearCard
        title="Picture Perfect"
        description="Piece together the puzzles in this fun and engaging drag and drop game!"
        icon={"🧩"}
        onClick={() => {}}
      />
      <DnDGameStats />
    </CompletePageLayout>
  );
};

export default CompletedDNDPage;
