import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { fetchHistory } from "../services/historyApi";
import type { RecommendationHistoryItem } from "../services/historyApi";
import { useNavigate } from "react-router-dom";

const Historico = () => {
  const { token, usuario } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<RecommendationHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!usuario || !token) {
      navigate("/login", { replace: true });
      return;
    }
    setLoading(true);
    fetchHistory(token)
      .then(setItems)
      .catch((err) => setErro(err instanceof Error ? err.message : "Erro ao carregar histórico."))
      .finally(() => setLoading(false));
  }, [usuario, token, navigate]);

  if (!usuario) return null;

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Histórico</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Últimas recomendações registradas para sua conta.
        </p>
      </div>
      {loading ? (
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
          <span className="h-4 w-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
          Carregando histórico...
        </div>
      ) : erro ? (
        <p className="text-red-600 dark:text-red-300">{erro}</p>
      ) : items.length === 0 ? (
        <p className="text-slate-700 dark:text-slate-200">Nenhuma recomendação registrada ainda.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-white dark:bg-slate-900 shadow-sm"
            >
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {new Date(item.data).toLocaleString()}
              </p>
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Macro-área: {item.macro_area}
              </p>
              <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-200 space-y-1 mt-2">
                {item.cursos_recomendados.map((curso) => (
                  <li key={curso}>{curso}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Historico;
