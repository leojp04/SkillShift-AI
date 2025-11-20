import { FormEvent, useEffect, useState } from "react";

type ApiEmpresa = {
  idEmpresa?: number;
  nome: string;
  setor?: string | null;
  tamanho?: "PEQUENA" | "MEDIA" | "GRANDE" | null;
  cnpj: string;
};

type ApiMensagem = {
  mensagem: string;
};

type EmpresaForm = {
  nome: string;
  setor: string;
  tamanho: "" | "PEQUENA" | "MEDIA" | "GRANDE";
  cnpj: string;
};

const initialForm: EmpresaForm = {
  nome: "",
  setor: "",
  tamanho: "",
  cnpj: "",
};

const API_BASE = import.meta.env.VITE_API_URL;

const Empresas = () => {
  const [empresas, setEmpresas] = useState<ApiEmpresa[]>([]);
  const [form, setForm] = useState<EmpresaForm>(initialForm);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [deletandoId, setDeletandoId] = useState<number | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const loadEmpresas = async () => {
    if (!API_BASE) {
      setErro("API não configurada (VITE_API_URL ausente).");
      setLoading(false);
      return;
    }

    setLoading(true);
    setErro(null);
    try {
      const res = await fetch(`${API_BASE}/empresas`);
      if (!res.ok) {
        const body: ApiMensagem = await res.json();
        throw new Error(body?.mensagem ?? "Erro ao carregar empresas.");
      }
      const data: ApiEmpresa[] = await res.json();
      setEmpresas(data);
    } catch (e: unknown) {
      const mensagem = e instanceof Error ? e.message : "Erro desconhecido.";
      setErro(mensagem);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmpresas();
  }, []);

  const handleChange = (campo: keyof EmpresaForm, valor: string) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const resetarForm = () => {
    setForm(initialForm);
    setEditandoId(null);
  };

  const validarForm = () => {
    if (!form.nome.trim()) return "Nome é obrigatório.";
    if (!form.cnpj.trim()) return "CNPJ é obrigatório.";
    if (form.tamanho && !["PEQUENA", "MEDIA", "GRANDE"].includes(form.tamanho)) {
      return "Tamanho inválido.";
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
      const payload: ApiEmpresa = {
        nome: form.nome.trim(),
        setor: form.setor.trim() || null,
        tamanho: form.tamanho || null,
        cnpj: form.cnpj.trim(),
      };

      const metodo = editandoId ? "PUT" : "POST";
      const url = editandoId
        ? `${API_BASE}/empresas/${editandoId}`
        : `${API_BASE}/empresas`;

      const res = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body: ApiMensagem = await res.json();
        throw new Error(body?.mensagem ?? "Erro ao salvar empresa.");
      }

      resetarForm();
      await loadEmpresas();
    } catch (e: unknown) {
      const mensagem = e instanceof Error ? e.message : "Erro ao salvar empresa.";
      setErro(mensagem);
    } finally {
      setSalvando(false);
    }
  };

  const editar = (empresa: ApiEmpresa) => {
    setEditandoId(empresa.idEmpresa ?? null);
    setForm({
      nome: empresa.nome ?? "",
      setor: empresa.setor ?? "",
      tamanho: (empresa.tamanho as EmpresaForm["tamanho"]) ?? "",
      cnpj: empresa.cnpj ?? "",
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
      const res = await fetch(`${API_BASE}/empresas/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const body: ApiMensagem = await res.json();
        throw new Error(body?.mensagem ?? "Erro ao excluir empresa.");
      }

      if (editandoId === id) resetarForm();
      await loadEmpresas();
    } catch (e: unknown) {
      const mensagem = e instanceof Error ? e.message : "Erro ao excluir empresa.";
      setErro(mensagem);
    } finally {
      setDeletandoId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Empresas
        </h1>
        <p className="text-slate-700 dark:text-slate-200 mb-4">
          Cadastre e gerencie empresas ligadas ao SkillShift AI.
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
            {editandoId ? "Editar empresa" : "Adicionar nova empresa"}
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
              Setor
            </label>
            <input
              value={form.setor}
              onChange={(e) => handleChange("setor", e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              Tamanho
            </label>
            <select
              value={form.tamanho}
              onChange={(e) =>
                handleChange("tamanho", e.target.value as EmpresaForm["tamanho"])
              }
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
            >
              <option value="">Selecione</option>
              <option value="PEQUENA">Pequena</option>
              <option value="MEDIA">Média</option>
              <option value="GRANDE">Grande</option>
            </select>
          </div>
          <div className="md:col-span-3">
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              CNPJ
            </label>
            <input
              value={form.cnpj}
              onChange={(e) => handleChange("cnpj", e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
              required
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
            ? "Atualizar empresa"
            : "Adicionar empresa"}
        </button>
      </form>

      <div className="space-y-4">
        {loading ? (
          <p className="text-slate-500 dark:text-slate-400 text-sm">Carregando empresas...</p>
        ) : empresas.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400 text-sm">Nenhuma empresa cadastrada.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {empresas.map((empresa) => (
              <div
                key={empresa.idEmpresa}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex flex-col gap-2 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {empresa.nome}
                  </h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                    {empresa.tamanho ?? "Sem tamanho"}
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-300">
                  CNPJ: {empresa.cnpj}
                </p>
                {empresa.setor && (
                  <p className="text-sm text-slate-500 dark:text-slate-300">Setor: {empresa.setor}</p>
                )}
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => editar(empresa)}
                    className="px-3 py-1 rounded-md text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => deletar(empresa.idEmpresa)}
                    disabled={deletandoId === empresa.idEmpresa}
                    className="px-3 py-1 rounded-md text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 disabled:opacity-60"
                  >
                    {deletandoId === empresa.idEmpresa ? "Excluindo..." : "Excluir"}
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

export default Empresas;
