import { FormEvent, useState } from "react";
import type { ClusterProfileResponse, IaPayload, PredictAreaResponse } from "../services/iaApi";
import { getClusterProfile, predictArea } from "../services/iaApi";

type IaForm = {
  O_score: string;
  C_score: string;
  E_score: string;
  A_score: string;
  N_score: string;
  "Numerical Aptitude": string;
  "Spatial Aptitude": string;
  "Perceptual Aptitude": string;
  "Abstract Reasoning": string;
  "Verbal Reasoning": string;
};

const initialIaForm: IaForm = {
  O_score: "",
  C_score: "",
  E_score: "",
  A_score: "",
  N_score: "",
  "Numerical Aptitude": "",
  "Spatial Aptitude": "",
  "Perceptual Aptitude": "",
  "Abstract Reasoning": "",
  "Verbal Reasoning": "",
};

const iaFields: Array<{ key: keyof IaForm; label: string }> = [
  { key: "O_score", label: "Abertura (O_score)" },
  { key: "C_score", label: "Conscienciosidade (C_score)" },
  { key: "E_score", label: "Extroversão (E_score)" },
  { key: "A_score", label: "Amabilidade (A_score)" },
  { key: "N_score", label: "Neuroticismo (N_score)" },
  { key: "Numerical Aptitude", label: "Aptidão Numérica" },
  { key: "Spatial Aptitude", label: "Aptidão Espacial" },
  { key: "Perceptual Aptitude", label: "Aptidão Perceptual" },
  { key: "Abstract Reasoning", label: "Raciocínio Abstrato" },
  { key: "Verbal Reasoning", label: "Raciocínio Verbal" },
];

const Recomendacoes = () => {
  const [iaForm, setIaForm] = useState<IaForm>(initialIaForm);
  const [iaErro, setIaErro] = useState<string | null>(null);
  const [iaLoading, setIaLoading] = useState(false);
  const [resultadoArea, setResultadoArea] = useState<PredictAreaResponse | null>(null);
  const [resultadoCluster, setResultadoCluster] = useState<ClusterProfileResponse | null>(null);

  const handleIaChange = (campo: keyof IaForm, valor: string) => {
    setIaForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const validarIaForm = () => {
    for (const field of iaFields) {
      const valor = iaForm[field.key];
      if (!valor.toString().trim()) {
        return `Preencha o campo "${field.label}".`;
      }
      if (Number.isNaN(Number(valor))) {
        return `O campo "${field.label}" deve ser numérico.`;
      }
    }
    return null;
  };

  const handleIaSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const msg = validarIaForm();
    if (msg) {
      setIaErro(msg);
      return;
    }

    const payload: IaPayload = {
      O_score: Number(iaForm.O_score),
      C_score: Number(iaForm.C_score),
      E_score: Number(iaForm.E_score),
      A_score: Number(iaForm.A_score),
      N_score: Number(iaForm.N_score),
      "Numerical Aptitude": Number(iaForm["Numerical Aptitude"]),
      "Spatial Aptitude": Number(iaForm["Spatial Aptitude"]),
      "Perceptual Aptitude": Number(iaForm["Perceptual Aptitude"]),
      "Abstract Reasoning": Number(iaForm["Abstract Reasoning"]),
      "Verbal Reasoning": Number(iaForm["Verbal Reasoning"]),
    };

    setIaErro(null);
    setIaLoading(true);
    setResultadoArea(null);
    setResultadoCluster(null);

    try {
      const area = await predictArea(payload);
      setResultadoArea(area);
      const cluster = await getClusterProfile(payload);
      setResultadoCluster(cluster);
    } catch (e: unknown) {
      const mensagem =
        e instanceof Error
          ? e.message
          : "Não foi possível gerar recomendações no momento. Tente novamente mais tarde.";
      setIaErro(mensagem || "Não foi possível gerar recomendações no momento. Tente novamente mais tarde.");
    } finally {
      setIaLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Recomendações</h1>
        <p className="text-slate-700 dark:text-slate-200">
          Gere recomendações usando a API de IA (Flask) com os 10 campos exigidos.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Recomendações via IA (Flask)
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Informe as 10 notas exigidas pela API para receber macro-área e cursos sugeridos.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Endpoints: /predict-area e /cluster-profile em skillshift-ai-platform.onrender.com
            </p>
          </div>
        </div>

        <form onSubmit={handleIaSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {iaFields.map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                  {field.label}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={iaForm[field.key]}
                  onChange={(e) => handleIaChange(field.key, e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
                  required
                />
              </div>
            ))}
          </div>

          {iaErro && (
            <div className="text-sm text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 px-3 py-3 rounded-lg">
              {iaErro}
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={iaLoading}
              className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {iaLoading ? "Gerando recomendações..." : "Gerar recomendações"}
            </button>
            {iaLoading && (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Consultando a API de IA, aguarde...
              </p>
            )}
          </div>
        </form>

        {(resultadoArea || resultadoCluster) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resultadoArea && (
              <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-slate-50 dark:bg-slate-800/60">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  Macro-área sugerida
                </h3>
                <p className="text-lg font-bold text-indigo-700 dark:text-indigo-300">
                  {resultadoArea.macro_area}
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-200 mt-1">
                  {resultadoArea.explicacao}
                </p>
              </div>
            )}
            {resultadoCluster && (
              <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-slate-50 dark:bg-slate-800/60">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  Cluster e cursos recomendados
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-200 mb-2">
                  Cluster #{resultadoCluster.cluster}
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 dark:text-slate-200">
                  {resultadoCluster.cursos_recomendados.map((curso) => (
                    <li key={curso}>{curso}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recomendacoes;
