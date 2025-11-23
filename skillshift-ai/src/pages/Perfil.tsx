import { type FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { fetchHistory } from "../services/historyApi";
import type { RecommendationHistoryItem } from "../services/historyApi";

const Perfil = () => {
  const { usuario, token, atualizarSenha, logout } = useAuth();
  const navigate = useNavigate();
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const [historico, setHistorico] = useState<RecommendationHistoryItem[]>([]);
  const [loadingHist, setLoadingHist] = useState(false);
  const [erroHist, setErroHist] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    if (!usuario) {
      navigate("/login", { replace: true });
      return;
    }
    if (!token) return;
    setLoadingHist(true);
    fetchHistory(token)
      .then((entries) => {
        if (active) {
          setHistorico(entries);
        }
      })
      .catch((err) => {
        if (active) setErroHist(err instanceof Error ? err.message : "Erro ao carregar histórico.");
      })
      .finally(() => {
        if (active) setLoadingHist(false);
      });
    return () => {
      active = false;
    };
  }, [usuario, token, navigate]);

  if (!usuario) return null;

  const handleAlterarSenha = async (e: FormEvent) => {
    e.preventDefault();
    setErro(null);
    setSucesso(null);
    if (!senhaAtual || !novaSenha || !confirmarNovaSenha) {
      setErro("Preencha todos os campos.");
      return;
    }
    if (novaSenha !== confirmarNovaSenha) {
      setErro("A nova senha e a confirmação não conferem.");
      return;
    }
    try {
      await atualizarSenha({ senhaAtual, novaSenha });
      setSucesso("Senha atualizada com sucesso.");
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarNovaSenha("");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Não foi possível atualizar a senha.";
      setErro(msg);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Meu perfil</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Dados da sua conta e histórico de recomendações.
          </p>
        </div>
        <button
          onClick={logout}
          className="px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
          type="button"
        >
          Sair
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-2">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Dados básicos</h2>
        <p className="text-sm text-slate-700 dark:text-slate-200">Nome: {usuario.nome}</p>
        <p className="text-sm text-slate-700 dark:text-slate-200">E-mail: {usuario.email}</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Alterar senha</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Informe a senha atual e defina uma nova senha.
          </p>
        </div>

        {erro && (
          <div className="text-sm text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-md px-3 py-2">
            {erro}
          </div>
        )}
        {sucesso && (
          <div className="text-sm text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-md px-3 py-2">
            {sucesso}
          </div>
        )}

        <form onSubmit={handleAlterarSenha} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              Senha atual
            </label>
            <input
              type="password"
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              Nova senha
            </label>
            <input
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              Confirmar nova senha
            </label>
            <input
              type="password"
              value={confirmarNovaSenha}
              onChange={(e) => setConfirmarNovaSenha(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
              required
            />
          </div>
          <div className="md:col-span-3">
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
            >
              Atualizar senha
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Últimas recomendações
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Histórico salvo das suas consultas recentes.
          </p>
        </div>
        {loadingHist ? (
          <p className="text-sm text-slate-600 dark:text-slate-300">Carregando...</p>
        ) : erroHist ? (
          <p className="text-sm text-red-600 dark:text-red-300">{erroHist}</p>
        ) : historico.length === 0 ? (
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Nenhuma recomendação registrada ainda.
          </p>
        ) : (
          <ul className="space-y-3">
            {historico.map((item) => (
              <li
                key={`${item.id}-${item.data}-${item.macro_area}`}
                className="border border-slate-200 dark:border-slate-700 rounded-md p-3 bg-slate-50 dark:bg-slate-800/60"
              >
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {new Date(item.data).toLocaleString()}
                </p>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Macro-área: {item.macro_area}
                </p>
                <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-200 space-y-1 mt-1">
                  {item.cursos_recomendados.map((curso) => (
                    <li key={curso}>{curso}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Perfil;
