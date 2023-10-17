export interface GenericGameSaveData {
  gameID: string;
  lastPlayed?: number;
  playedCount: number;
}
export interface DNDStatistics {
  attemptTime: number; // in ms
  accuracy: number; // in %
}
export interface DNDGameSaveData extends GenericGameSaveData {
  bestAttempt?: DNDStatistics;
  averageAttempt?: DNDStatistics;
}
