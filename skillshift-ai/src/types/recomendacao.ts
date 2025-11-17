// Tipos básicos
export type RecomendacaoID = number | string;

// Union type com status de recomendação
export type StatusRecomendacao = "ativa" | "inativa" | "rascunho";

// Interface base
export interface BaseRecomendacao {
  id: RecomendacaoID;
  titulo: string;
  descricao?: string;
}

// Interface de recomendação vinda da API
export interface ApiRecomendacao extends BaseRecomendacao {
  score?: number;
  area?: string;
  ativa?: boolean;
}

// Intersection type: recomendação exibida na UI
export type RecomendacaoUI = ApiRecomendacao & {
  destaque?: boolean;
};
