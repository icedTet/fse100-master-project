"use client";
import { useSearchParams } from "next/navigation";
import CompletePageLayout from "../../../components/Layouts/CompleteGameLayout";
import { GameClearCard } from "../../../components/GameClearCard";
import { useLocalStorage } from "../../../utils/TetHookLib";

import TetLib from "../../../utils/TetLib";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import LabyGameStats from "../../../components/Games/LabyrinthEscape/LabyGameStats";
const DnDGameStats = dynamic(
  () => import("../../../components/Games/DragAndDrop/DnDGameStats"),
  { ssr: false }
);

export const CompletedDNDPage = () => {
  return (
    <CompletePageLayout>
      <GameClearCard
        title="Labyrinth Escape"
        description="Navigate through perilous mazes and avoid the soul-sucking void in this maze game! Use your wits to guide Squarey out of intricate labyrinths!"
        icon={"🌋"}
        onClick={() => {}}
      />
      {/* <DnDGameStats /> */}
      <LabyGameStats />
    </CompletePageLayout>
  );
};

export default CompletedDNDPage;
