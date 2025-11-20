import { FormEvent, useEffect, useState } from "react";

type ApiCurso = {
  idCurso?: number;
  nome: string;
  categoria: string;
  duracaoHoras?: number | null;
  plataforma?: string | null;
  nivel?: "INICIAL" | "INTERMEDIARIO" | "AVANCADO" | null;
  ativo?: boolean | null;
};

type ApiMensagem = {
  mensagem: string;
};

type CursoForm = {
  nome: string;
  categoria: string;
  duracaoHoras: string;
  plataforma: string;
  nivel: "" | "INICIAL" | "INTERMEDIARIO" | "AVANCADO";
  ativo: boolean;
};

const initialForm: CursoForm = {
  nome: "",
  categoria: "",
  duracaoHoras: "",
  plataforma: "",
  nivel: "",
  ativo: true,
};

const API_BASE = import.meta.env.VITE_API_URL;

const Cursos = () => {
  const [cursos, setCursos] = useState<ApiCurso[]>([]);
  const [form, setForm] = useState<CursoForm>(initialForm);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [deletandoId, setDeletandoId] = useState<number | null>(null);

  const loadCursos = async () => {
    if (!API_BASE) {
      setErro("API não configurada (VITE_API_URL ausente).");
      setLoading(false);
      return;
    }

    setLoading(true);
    setErro(null);
    try {
      const res = await fetch(`${API_BASE}/cursos`);
      if (!res.ok) {
        const body: ApiMensagem = await res.json();
        throw new Error(body?.mensagem ?? "Erro ao carregar cursos.");
      }
      const data: ApiCurso[] = await res.json();
      setCursos(data);
    } catch (e: unknown) {
      const mensagem = e instanceof Error ? e.message : "Erro desconhecido.";
      setErro(mensagem);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCursos();
  }, []);

  const handleChange = (campo: keyof CursoForm, valor: string | boolean) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const resetarForm = () => {
    setForm(initialForm);
    setEditandoId(null);
  };

  const validarForm = () => {
    if (!form.nome.trim()) return "Nome é obrigatório.";
    if (!form.categoria.trim()) return "Categoria é obrigatória.";
    if (form.duracaoHoras) {
      const duracao = Number(form.duracaoHoras);
      if (Number.isNaN(duracao) || duracao <= 0) {
        return "Duração deve ser maior que zero.";
      }
    }
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!API_BASE) {
      setErro("API não configurada (VITE_API_URL ausente).");
      return;
    }

    const mensagemValidacao = validarForm();
    if (mensagemValidacao) {
      setErro(mensagemValidacao);
      return;
    }

    setSalvando(true);
    setErro(null);

    try {
      const payload: ApiCurso = {
        nome: form.nome.trim(),
        categoria: form.categoria.trim(),
        duracaoHoras: form.duracaoHoras ? Number(form.duracaoHoras) : null,
        plataforma: form.plataforma.trim() || null,
        nivel: form.nivel || null,
        ativo: form.ativo,
      };

      const metodo = editandoId ? "PUT" : "POST";
      const url = editandoId
        ? `${API_BASE}/cursos/${editandoId}`
        : `${API_BASE}/cursos`;

      const res = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body: ApiMensagem = await res.json();
        throw new Error(body?.mensagem ?? "Erro ao salvar curso.");
      }

      resetarForm();
      await loadCursos();
    } catch (e: unknown) {
      const mensagem = e instanceof Error ? e.message : "Erro ao salvar curso.";
      setErro(mensagem);
    } finally {
      setSalvando(false);
    }
  };

  const editar = (curso: ApiCurso) => {
    setEditandoId(curso.idCurso ?? null);
    setForm({
      nome: curso.nome ?? "",
      categoria: curso.categoria ?? "",
      duracaoHoras: curso.duracaoHoras?.toString() ?? "",
      plataforma: curso.plataforma ?? "",
      nivel: (curso.nivel as CursoForm["nivel"]) ?? "",
      ativo: curso.ativo ?? true,
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
      const res = await fetch(`${API_BASE}/cursos/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const body: ApiMensagem = await res.json();
        throw new Error(body?.mensagem ?? "Erro ao excluir curso.");
      }

      if (editandoId === id) resetarForm();
      await loadCursos();
    } catch (e: unknown) {
      const mensagem = e instanceof Error ? e.message : "Erro ao excluir curso.";
      setErro(mensagem);
    } finally {
      setDeletandoId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Cursos
        </h1>
        <p className="text-slate-700 dark:text-slate-200 mb-4">
          Cadastre e atualize cursos oferecidos pelo SkillShift AI.
        </p>
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
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {editandoId ? "Editar curso" : "Adicionar novo curso"}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              Nome
            </label>
            <input
              value={form.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              Categoria
            </label>
            <input
              value={form.categoria}
              onChange={(e) => handleChange("categoria", e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              Duração (horas)
            </label>
            <input
              type="number"
              min="1"
              value={form.duracaoHoras}
              onChange={(e) => handleChange("duracaoHoras", e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              Plataforma
            </label>
            <input
              value={form.plataforma}
              onChange={(e) => handleChange("plataforma", e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              Nível
            </label>
            <select
              value={form.nivel}
              onChange={(e) =>
                handleChange("nivel", e.target.value as CursoForm["nivel"])
              }
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
            >
              <option value="">Selecione</option>
              <option value="INICIAL">Inicial</option>
              <option value="INTERMEDIARIO">Intermediário</option>
              <option value="AVANCADO">Avançado</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="ativo"
              type="checkbox"
              checked={form.ativo}
              onChange={(e) => handleChange("ativo", e.target.checked)}
              className="rounded border-slate-300 dark:border-slate-600 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="ativo" className="text-sm text-slate-700 dark:text-slate-200">
              Curso ativo
            </label>
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
            ? "Atualizar curso"
            : "Adicionar curso"}
        </button>
      </form>

      <div className="space-y-4">
        {loading ? (
          <p className="text-slate-500 dark:text-slate-400 text-sm">Carregando cursos...</p>
        ) : cursos.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400 text-sm">Nenhum curso cadastrado.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cursos.map((curso) => (
              <div
                key={curso.idCurso}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex flex-col gap-2 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {curso.nome}
                  </h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                    {curso.categoria}
                  </span>
                </div>
                {curso.plataforma && (
                  <p className="text-sm text-slate-500 dark:text-slate-300">
                    Plataforma: {curso.plataforma}
                  </p>
                )}
                <p className="text-sm text-slate-500 dark:text-slate-300">
                  Duração: {curso.duracaoHoras ?? "—"} horas
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-300">
                  Nível: {curso.nivel ?? "—"}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-300">
                  Status: {curso.ativo === false ? "Inativo" : "Ativo"}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => editar(curso)}
                    className="px-3 py-1 rounded-md text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => deletar(curso.idCurso)}
                    disabled={deletandoId === curso.idCurso}
                    className="px-3 py-1 rounded-md text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 disabled:opacity-60"
                  >
                    {deletandoId === curso.idCurso ? "Excluindo..." : "Excluir"}
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

export default Cursos;
