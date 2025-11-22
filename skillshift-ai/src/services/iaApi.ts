// Use env override when disponível; por padrão aponta para rota proxy (/ia-api) configurada no Vite.
const IA_BASE_URL =
  import.meta.env.VITE_IA_BASE_URL ?? "/ia-api";

export type IaPayload = {
  O_score: number;
  C_score: number;
  E_score: number;
  A_score: number;
  N_score: number;
  "Numerical Aptitude": number;
  "Spatial Aptitude": number;
  "Perceptual Aptitude": number;
  "Abstract Reasoning": number;
  "Verbal Reasoning": number;
};

export interface PredictAreaResponse {
  macro_area: string;
  explicacao: string;
}

export interface ClusterProfileResponse {
  cluster: number;
  cursos_recomendados: string[];
}

async function postJson<T>(path: string, payload: IaPayload): Promise<T> {
  const response = await fetch(`${IA_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Erro ao chamar ${path} (${response.status}): ${detail || "resposta inválida"}`);
  }

  return response.json() as Promise<T>;
}

export function predictArea(payload: IaPayload) {
  return postJson<PredictAreaResponse>("/predict-area", payload);
}

export function getClusterProfile(payload: IaPayload) {
  return postJson<ClusterProfileResponse>("/cluster-profile", payload);
}

export { IA_BASE_URL };
