import { useParams, Link } from "react-router-dom";

type DetalheParams = {
  id: string;
};

const DetalheRecomendacao = () => {
  const { id } = useParams<DetalheParams>();


  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
        Detalhes da Recomendação
      </h1>
      <p className="text-slate-700 dark:text-slate-200 mb-4">
        Exibindo detalhes da recomendação de ID:{" "}
        <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
          {id}
        </span>
      </p>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
        Nesta tela, poderíamos mostrar informações completas da recomendação,
        como trilhas, cursos, instituições parceiras e indicadores de empregabilidade.
      </p>
      <Link
        to="/recomendacoes"
        className="text-sm text-indigo-500 hover:underline"
      >
        ← Voltar para lista de recomendações
      </Link>
    </div>
  );
};

export default DetalheRecomendacao;
