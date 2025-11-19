import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import type { RecomendacaoUI } from "../types/recomendacao";

const Recomendacoes = () => {
  const [items, setItems] = useState<RecomendacaoUI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  const [novoTitulo, setNovoTitulo] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");
  const [filtroTexto, setFiltroTexto] = useState("");
  const [ordem, setOrdem] = useState<"titulo-asc" | "titulo-desc" | "score-desc">("titulo-asc");
  const [idEmEdicao, setIdEmEdicao] = useState<string | number | null>(null);
  const [editarTitulo, setEditarTitulo] = useState("");
  const [editarDescricao, setEditarDescricao] = useState("");

  const base = import.meta.env.VITE_API_URL;
  const skeletons = [1, 2, 3, 4];

  const carregar = async () => {
    if (!base) {
      const mock: RecomendacaoUI[] = [
        { id: 1, titulo: "Curso: React Básico", descricao: "Fundamentos de componentes e hooks.", destaque: true },
        { id: 2, titulo: "Curso: TypeScript para Frontend", descricao: "Tipos, interfaces e boas práticas." },
      ];
      setItems(mock);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${base}/recomendacoes`);
      if (!res.ok) throw new Error("Erro ao buscar dados");
      const data: RecomendacaoUI[] = await res.json();
      setItems(data);
      setErro(null);
    } catch (e: any) {
      setErro(e.message ?? "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const handleCriar = async (e: FormEvent) => {
    e.preventDefault();
    if (!novoTitulo.trim()) return;

    // Se não tiver API, só adiciona local
    if (!base) {
      const novoItem: RecomendacaoUI = {
        id: Date.now(),
        titulo: novoTitulo,
        descricao: novaDescricao,
      };
      setItems((prev) => [...prev, novoItem]);
      setNovoTitulo("");
      setNovaDescricao("");
      return;
    }

    try {
      const res = await fetch(`${base}/recomendacoes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: novoTitulo,
          descricao: novaDescricao,
        }),
      });
      if (!res.ok) throw new Error("Erro ao criar recomendação");
      await carregar();
      setNovoTitulo("");
      setNovaDescricao("");
    } catch (e: any) {
      setErro(e.message ?? "Erro ao criar recomendação");
    }
  };

  const handleExcluir = async (id: string | number) => {
    if (!base) {
      setItems((prev) => prev.filter((it) => it.id !== id));
      return;
    }

    try {
      const res = await fetch(`${base}/recomendacoes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao excluir recomendação");
      await carregar();
    } catch (e: any) {
      setErro(e.message ?? "Erro ao excluir recomendação");
    }
  };

  const iniciarEdicao = (id: string | number, titulo: string, descricao?: string) => {
    setIdEmEdicao(id);
    setEditarTitulo(titulo ?? "");
    setEditarDescricao(descricao ?? "");
  };

  const handleSalvarEdicao = async (e: FormEvent) => {
    e.preventDefault();
    if (idEmEdicao === null || !editarTitulo.trim()) return;

    if (!base) {
      setItems((prev) =>
        prev.map((it) =>
          it.id === idEmEdicao ? { ...it, titulo: editarTitulo, descricao: editarDescricao } : it
        )
      );
      setIdEmEdicao(null);
      setEditarTitulo("");
      setEditarDescricao("");
      return;
    }

    try {
      const res = await fetch(`${base}/recomendacoes/${idEmEdicao}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: editarTitulo,
          descricao: editarDescricao,
        }),
      });

      if (!res.ok) throw new Error("Erro ao atualizar recomendação");

      await carregar();
      setIdEmEdicao(null);
      setEditarTitulo("");
      setEditarDescricao("");
    } catch (e: any) {
      setErro(e.message ?? "Erro ao atualizar recomendação");
    }
  };

  const handleCancelarEdicao = () => {
    setIdEmEdicao(null);
    setEditarTitulo("");
    setEditarDescricao("");
  };

  const filtradas = items.filter((it) => {
    if (!filtroTexto.trim()) return true;
    const termo = filtroTexto.toLowerCase();
    const titulo = it.titulo?.toLowerCase() ?? "";
    const descricao = it.descricao?.toLowerCase() ?? "";
    return titulo.includes(termo) || descricao.includes(termo);
  });

  const exibidas = [...filtradas].sort((a, b) => {
    if (ordem === "score-desc") {
      const scoreA = typeof a.score === "number" ? a.score : 0;
      const scoreB = typeof b.score === "number" ? b.score : 0;
      return scoreB - scoreA;
    }

    const tituloA = (a.titulo ?? "").toLowerCase();
    const tituloB = (b.titulo ?? "").toLowerCase();

    if (ordem === "titulo-desc") {
      return tituloB.localeCompare(tituloA);
    }

    return tituloA.localeCompare(tituloB);
  });

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Recomendações
        </h1>
        <p className="text-slate-700 dark:text-slate-200 mb-2 max-w-3xl">
          Recomendações de cursos e trilhas com base no perfil do usuário.
        </p>
        {base ? (
          <p className="text-xs text-emerald-600 dark:text-emerald-400">
            Consumindo API remota
          </p>
        ) : (
          <p className="text-xs text-amber-600 dark:text-amber-400">
            Usando dados mock (API não configurada)
          </p>
        )}
      </div>

      {erro && (
        <div className="text-sm text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 px-3 py-3 rounded-lg space-y-1">
          <p className="font-semibold">Erro ao carregar recomendações</p>
          <p>Mensagem: {erro}</p>
          <p className="text-xs">Tente novamente mais tarde.</p>
        </div>
      )}

      <form
        onSubmit={handleCriar}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-3"
      >
        <h2 className="font-semibold text-slate-900 dark:text-slate-100">
          Adicionar nova recomendação
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              Título
            </label>
            <input
              value={novoTitulo}
              onChange={(e) => setNovoTitulo(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
              placeholder="Ex: Trilha Front-end Júnior"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              Descrição
            </label>
            <input
              value={novaDescricao}
              onChange={(e) => setNovaDescricao(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
              placeholder="Ex: HTML, CSS, JS, React..."
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
        >
          Salvar recomendação
        </button>
      </form>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div className="space-y-2">
          <label
            htmlFor="filtro-texto"
            className="block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Buscar recomendações
          </label>
          <input
            id="filtro-texto"
            type="text"
            value={filtroTexto}
            onChange={(e) => setFiltroTexto(e.target.value)}
            placeholder="Busque por título ou descrição"
            className="w-full max-w-md px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="ordenacao"
            className="block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Ordenar por
          </label>
          <select
            id="ordenacao"
            value={ordem}
            onChange={(e) => setOrdem(e.target.value as typeof ordem)}
            className="text-sm px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 w-full md:w-auto ml-0 md:ml-3 mt-0"
          >
            <option value="titulo-asc">Título (A–Z)</option>
            <option value="titulo-desc">Título (Z–A)</option>
            <option value="score-desc">Maior score primeiro</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="space-y-3">
          <p className="text-slate-500 dark:text-slate-400 text-sm">Carregando...</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skeletons.map((item) => (
              <div
                key={item}
                className="h-24 md:h-28 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse"
              />
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exibidas.map((it) => (
          <div
            key={it.id}
            className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col gap-2"
          >
            <div className="flex-1">
              <Link
                to={`/recomendacoes/${it.id}`}
                className="block hover:underline"
              >
                <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  {it.titulo}
                </h2>
              </Link>
              {it.descricao && (
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {it.descricao}
                </p>
              )}
            </div>
            <div className="flex justify-between items-center mt-2 gap-3">
              <Link
                to={`/recomendacoes/${it.id}`}
                className="text-xs text-indigo-500 hover:underline"
              >
                Ver detalhes →
              </Link>
              <div className="flex items-center gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => iniciarEdicao(it.id, it.titulo, it.descricao)}
                  className="text-slate-600 dark:text-slate-300 hover:underline"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => handleExcluir(it.id)}
                  className="text-red-500 hover:underline"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && exibidas.length === 0 && (
        <p className="text-slate-500 dark:text-slate-400">
          Nenhuma recomendação disponível.
        </p>
      )}

      {idEmEdicao !== null && (
        <form
          onSubmit={handleSalvarEdicao}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
              Editar recomendação
            </h3>
            <button
              type="button"
              onClick={handleCancelarEdicao}
              className="text-sm text-slate-500 hover:underline"
            >
              Cancelar edição
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                Título
              </label>
              <input
                value={editarTitulo}
                onChange={(e) => setEditarTitulo(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
                placeholder="Ex: Trilha Front-end Júnior"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                Descrição
              </label>
              <input
                value={editarDescricao}
                onChange={(e) => setEditarDescricao(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
                placeholder="Ex: HTML, CSS, JS, React..."
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
            >
              Salvar alterações
            </button>
            <button
              type="button"
              onClick={handleCancelarEdicao}
              className="text-sm text-slate-600 dark:text-slate-300 hover:underline"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Recomendacoes;


