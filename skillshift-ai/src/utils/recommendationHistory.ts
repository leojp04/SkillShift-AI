export type RecommendationHistoryEntry = {
  userId: string;
  data: string;
  macro_area: string;
  cursos_recomendados: string[];
};

const HISTORY_KEY = "skillshift_recomendacoes_historico";

const readHistory = (): RecommendationHistoryEntry[] => {
  const raw = localStorage.getItem(HISTORY_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as RecommendationHistoryEntry[];
  } catch {
    // ignore parse errors
  }
  return [];
};

const saveHistory = (entries: RecommendationHistoryEntry[]) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(entries));
};

export const appendHistory = (entry: RecommendationHistoryEntry) => {
  const entries = readHistory();
  entries.push(entry);
  saveHistory(entries);
};

export const getHistoryForUser = (userId: string): RecommendationHistoryEntry[] => {
  return readHistory()
    .filter((item) => item.userId === userId)
    .sort((a, b) => (a.data > b.data ? -1 : 1));
};
