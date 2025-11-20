import { FormEvent, useEffect, useState } from "react";

type ApiRecomendacao = {
  idRecomendacao?: number;
  idUsuario: number;
  idCurso: number;
  score: number;
  fonte: "IA" | "EMPRESA" | "MANUAL";
  status: "PENDENTE" | "EM_ANDAMENTO" | "CONCLUIDA";
  dataRecomendacao?: string | null;
  cluster?: number | null;
  payloadIa?: string | null;
};

type ApiMensagem = {
  mensagem: string;
};

type RecomendacaoForm = {
  idUsuario: string;
  idCurso: string;
  score: string;
  fonte: "" | "IA" | "EMPRESA" | "MANUAL";
  status: "" | "PENDENTE" | "EM_ANDAMENTO" | "CONCLUIDA";
  dataRecomendacao: string;
  cluster: string;
};

const initialForm: RecomendacaoForm = {
  idUsuario: "",
  idCurso: "",
  score: "",
  fonte: "",
  status: "",
  dataRecomendacao: "",
  cluster: "",
};

const API_BASE = import.meta.env.VITE_API_URL;

const fontes: Array<RecomendacaoForm["fonte"]> = ["IA", "EMPRESA", "MANUAL"];
const statusOptions: Array<RecomendacaoForm["status"]> = [
  "PENDENTE",
  "EM_ANDAMENTO",
  "CONCLUIDA",
];

const Recomendacoes = () => {
  const [lista, setLista] = useState<ApiRecomendacao[]>([]);
  const [form, setForm] = useState<RecomendacaoForm>(initialForm);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [filtroUsuario, setFiltroUsuario] = useState("");
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [gerando, setGerando] = useState(false);
  const [deletandoId, setDeletandoId] = useState<number | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const loadRecomendacoes = async () => {
    if (!API_BASE) {
      setErro("API não configurada (VITE_API_URL ausente).");
      setLoading(false);
      return;
    }

    setLoading(true);
    setErro(null);
    try {
      const query = filtroUsuario.trim()
        ? `?usuarioId=${encodeURIComponent(filtroUsuario.trim())}`
        : "";
      const res = await fetch(`${API_BASE}/recomendacoes${query}`);
      if (!res.ok) {
        const body: ApiMensagem = await res.json();
        throw new Error(body?.mensagem ?? "Erro ao carregar recomendações.");
      }
      const data: ApiRecomendacao[] = await res.json();
      setLista(data);
    } catch (e: unknown) {
      const mensagem = e instanceof Error ? e.message : "Erro desconhecido.";
      setErro(mensagem);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecomendacoes();
  }, []);

  const handleChange = (campo: keyof RecomendacaoForm, valor: string) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const resetarForm = () => {
    setForm(initialForm);
    setEditandoId(null);
  };

  const validarForm = () => {
    if (!form.idUsuario.trim() || Number.isNaN(Number(form.idUsuario))) {
      return "ID do usuário é obrigatório.";
    }
    if (!form.idCurso.trim() || Number.isNaN(Number(form.idCurso))) {
      return "ID do curso é obrigatório.";
    }
    if (!form.score.trim() || Number.isNaN(Number(form.score))) {
      return "Score é obrigatório.";
    }
    const scoreVal = Number(form.score);
    if (scoreVal < 0 || scoreVal > 100) {
      return "Score deve estar entre 0 e 100.";
    }
    if (!form.fonte) {
      return "Fonte é obrigatória.";
    }
    if (!form.status) {
      return "Status é obrigatório.";
    }
    if (form.dataRecomendacao && Number.isNaN(Date.parse(form.dataRecomendacao))) {
      return "Data inválida.";
    }
    if (form.cluster && Number.isNaN(Number(form.cluster))) {
      return "Cluster deve ser numérico.";
    }
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!API_BASE) {
      setErro("API não configurada (VITE_API_URL ausente).");
      return;
    }

    const msg = validarForm();
    if (msg) {
      setErro(msg);
      return;
    }

    setSalvando(true);
    setErro(null);

    try {
      const payload: ApiRecomendacao = {
        idUsuario: Number(form.idUsuario),
        idCurso: Number(form.idCurso),
        score: Number(form.score),
        fonte: form.fonte as ApiRecomendacao["fonte"],
        status: form.status as ApiRecomendacao["status"],
        dataRecomendacao: form.dataRecomendacao || null,
        cluster: form.cluster ? Number(form.cluster) : null,
      };

      const metodo = editandoId ? "PUT" : "POST";
      const url = editandoId
        ? `${API_BASE}/recomendacoes/${editandoId}`
        : `${API_BASE}/recomendacoes`;

      const res = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body: ApiMensagem = await res.json();
        throw new Error(body?.mensagem ?? "Erro ao salvar recomendação.");
      }

      resetarForm();
      await loadRecomendacoes();
    } catch (e: unknown) {
      const mensagem = e instanceof Error ? e.message : "Erro ao salvar recomendação.";
      setErro(mensagem);
    } finally {
      setSalvando(false);
    }
  };

  const editar = (rec: ApiRecomendacao) => {
    setEditandoId(rec.idRecomendacao ?? null);
    setForm({
      idUsuario: rec.idUsuario?.toString() ?? "",
      idCurso: rec.idCurso?.toString() ?? "",
      score: rec.score?.toString() ?? "",
      fonte: rec.fonte ?? "",
      status: rec.status ?? "",
      dataRecomendacao: rec.dataRecomendacao ?? "",
      cluster: rec.cluster?.toString() ?? "",
    });
  };

  const cancelarEdicao = () => {
    resetarForm();
  };

  const deletar = async (id?: number) => {
    if (!API_BASE || !id) {
      setErro("API não configurada ou ID inválido.");
      return;
    }

    setDeletandoId(id);
    setErro(null);
    try {
      const res = await fetch(`${API_BASE}/recomendacoes/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const body: ApiMensagem = await res.json();
        throw new Error(body?.mensagem ?? "Erro ao excluir recomendação.");
      }

      if (editandoId === id) resetarForm();
      await loadRecomendacoes();
    } catch (e: unknown) {
      const mensagem = e instanceof Error ? e.message : "Erro ao excluir recomendação.";
      setErro(mensagem);
    } finally {
      setDeletandoId(null);
    }
  };

  const gerarIA = async () => {
    if (!API_BASE) {
      setErro("API não configurada (VITE_API_URL ausente).");
      return;
    }
    if (!filtroUsuario.trim()) {
      setErro("Informe o ID do usuário para gerar recomendações via IA.");
      return;
    }

    setGerando(true);
    setErro(null);
    try {
      const res = await fetch(
        `${API_BASE}/recomendacoes/gerar?usuarioId=${encodeURIComponent(
          filtroUsuario.trim()
        )}`,
        {
          method: "POST",
        }
      );

      if (!res.ok) {
        const body = (await res.json()) as ApiMensagem & { erro?: string };
        throw new Error(body?.mensagem ?? body?.erro ?? "Erro ao gerar recomendações.");
      }

      await loadRecomendacoes();
    } catch (e: unknown) {
      const mensagem = e instanceof Error ? e.message : "Erro ao gerar recomendações.";
      setErro(mensagem);
    } finally {
      setGerando(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Recomendações
        </h1>
        <p className="text-slate-700 dark:text-slate-200 mb-2">
          Gerencie e gere recomendações para os usuários cadastrados.
        </p>
        {API_BASE ? (
          <p className="text-xs text-emerald-600 dark:text-emerald-400">
            Consumindo API remota
          </p>
        ) : (
          <p className="text-xs text-amber-600 dark:text-amber-400">
            API não configurada (VITE_API_URL ausente)
          </p>
        )}
      </div>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Filtrar por ID de usuário
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              value={filtroUsuario}
              onChange={(e) => setFiltroUsuario(e.target.value)}
              className="w-full max-w-xs px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
              placeholder="Ex: 1"
            />
            <button
              type="button"
              onClick={loadRecomendacoes}
              className="px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
            >
              Aplicar filtro
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={gerarIA}
            disabled={gerando || !filtroUsuario.trim()}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {gerando ? "Gerando via IA..." : "Gerar via IA"}
          </button>
          {gerando && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Aguarde, estamos buscando novas recomendações.
            </p>
          )}
        </div>
      </div>

      {erro && (
        <div className="text-sm text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 px-3 py-3 rounded-lg">
          {erro}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">
            {editandoId ? "Editar recomendação" : "Adicionar recomendação manual"}
          </h2>
          {editandoId && (
            <button
              type="button"
              onClick={cancelarEdicao}
              className="text-sm text-slate-500 hover:underline"
            >
              Cancelar edição
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              ID do usuário
            </label>
            <input
              type="number"
              min="1"
              value={form.idUsuario}
              onChange={(e) => handleChange("idUsuario", e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              ID do curso
            </label>
            <input
              type="number"
              min="1"
              value={form.idCurso}
              onChange={(e) => handleChange("idCurso", e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              Score (0 a 100)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={form.score}
              onChange={(e) => handleChange("score", e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              Fonte
            </label>
            <select
              value={form.fonte}
              onChange={(e) =>
                handleChange("fonte", e.target.value as RecomendacaoForm["fonte"])
              }
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
              required
            >
              <option value="">Selecione</option>
              {fontes.map((fonte) => (
                <option key={fonte} value={fonte}>
                  {fonte}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) =>
                handleChange("status", e.target.value as RecomendacaoForm["status"])
              }
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
              required
            >
              <option value="">Selecione</option>
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              Data recomendação
            </label>
            <input
              type="date"
              value={form.dataRecomendacao}
              onChange={(e) => handleChange("dataRecomendacao", e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              Cluster (opcional)
            </label>
            <input
              type="number"
              value={form.cluster}
              onChange={(e) => handleChange("cluster", e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={salvando}
          className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {salvando
            ? "Salvando..."
            : editandoId
            ? "Atualizar recomendação"
            : "Adicionar recomendação"}
        </button>
      </form>

      <div className="space-y-4">
        {loading ? (
          <p className="text-slate-500 dark:text-slate-400 text-sm">Carregando recomendações...</p>
        ) : lista.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400 text-sm">Nenhuma recomendação encontrada.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lista.map((rec) => (
              <div
                key={rec.idRecomendacao}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex flex-col gap-2 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Usuário #{rec.idUsuario}
                  </h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                    {rec.status}
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-300">
                  Curso: {rec.idCurso}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-300">
                  Score: {rec.score}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-300">
                  Fonte: {rec.fonte}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Data: {rec.dataRecomendacao ?? "—"}
                </p>
                {rec.cluster !== null && rec.cluster !== undefined && (
                  <p className="text-xs text-slate-400 dark:text-slate-500">Cluster: {rec.cluster}</p>
                )}
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => editar(rec)}
                    className="px-3 py-1 rounded-md text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => deletar(rec.idRecomendacao)}
                    disabled={deletandoId === rec.idRecomendacao}
                    className="px-3 py-1 rounded-md text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 disabled:opacity-60"
                  >
                    {deletandoId === rec.idRecomendacao ? "Excluindo..." : "Excluir"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recomendacoes;
