import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RecomendacaoUI } from "../types/recomendacao";

const Recomendacoes = () => {
  const [items, setItems] = useState<RecomendacaoUI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const base = import.meta.env.VITE_API_URL;

    if (!base) {
      const mock: RecomendacaoUI[] = [
        { id: 1, titulo: "Curso: React Básico", descricao: "Fundamentos de componentes e hooks.", destaque: true },
        { id: 2, titulo: "Curso: TypeScript para Frontend", descricao: "Tipos, interfaces e boas práticas." },
      ];
      setItems(mock);
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const res = await fetch(`${base}/recomendacoes`);
        if (!res.ok) throw new Error("Erro ao buscar dados");
        const data: RecomendacaoUI[] = await res.json();
        setItems(data);
      } catch (e: any) {
        setErro(e.message ?? "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
        Recomendações
      </h1>
      <p className="text-slate-700 dark:text-slate-200 mb-4">
        Recomendações de cursos e trilhas com base no perfil do usuário.
      </p>

      {loading && <p className="text-slate-500 dark:text-slate-400">Carregando...</p>}
      {erro && <p className="text-red-500">Erro: {erro}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((it) => (
          <Link
            key={it.id}
            to={`/recomendacoes/${it.id}`}
            className={`bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm block border ${
              it.destaque
                ? "border-indigo-500"
                : "border-transparent hover:border-indigo-500"
            }`}
          >
            <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
              {it.titulo}
            </h2>
            {it.descricao && (
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {it.descricao}
              </p>
            )}
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Ver detalhes →
            </p>
          </Link>
        ))}
      </div>

      {!loading && items.length === 0 && (
        <p className="text-slate-500 dark:text-slate-400 mt-4">
          Nenhuma recomendação disponível.
        </p>
      )}
    </div>
  );
};

export default Recomendacoes;
