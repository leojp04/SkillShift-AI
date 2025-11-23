import { apiFetch } from "./apiClient";

export type RecommendationHistoryItem = {
  id: string;
  data: string;
  macro_area: string;
  cursos_recomendados: string[];
};

export type CreateHistoryPayload = {
  data: string;
  macro_area: string;
  cursos_recomendados: string[];
};

export async function fetchHistory(token: string): Promise<RecommendationHistoryItem[]> {
  return apiFetch<RecommendationHistoryItem[]>("/recomendacoes/historico", { token });
}

export async function createHistory(
  token: string,
  payload: CreateHistoryPayload
): Promise<RecommendationHistoryItem> {
  return apiFetch<RecommendationHistoryItem>("/recomendacoes/historico", {
    method: "POST",
    token,
    body: JSON.stringify(payload),
  });
}
