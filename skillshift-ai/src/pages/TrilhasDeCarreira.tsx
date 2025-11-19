type Trilha = {
  nome: string;
  nivel: string;
  descricao: string;
  tag: string;
};

const trilhas: Trilha[] = [
  {
    nome: "Front-end Developer Júnior",
    nivel: "Iniciante",
    descricao: "HTML, CSS, JavaScript e React para criar interfaces responsivas.",
    tag: "Alta demanda",
  },
  {
    nome: "Back-end Java Developer",
    nivel: "Intermediário",
    descricao: "APIs REST com Java, Spring Boot, segurança e banco de dados.",
    tag: "Entrada rápida",
  },
  {
    nome: "Data Analyst Iniciante",
    nivel: "Iniciante",
    descricao: "Análise exploratória, SQL básico e visualizações de dados.",
    tag: "Foco em dados",
  },
  {
    nome: "Cloud & DevOps Essentials",
    nivel: "Intermediário",
    descricao: "CI/CD, contêineres e fundamentos de cloud para produção.",
    tag: "Alta demanda",
  },
];

const TrilhasDeCarreira = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
        Trilhas de Carreira
      </h1>
      <p className="text-slate-700 dark:text-slate-200 mb-6 max-w-3xl">
        Sugestões de trilhas alinhadas ao futuro do trabalho, para você evoluir de forma estruturada e consistente.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {trilhas.map((trilha) => (
          <div
            key={trilha.nome}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 shadow-sm flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {trilha.nome}
              </h2>
              <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200">
                {trilha.tag}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Nível: {trilha.nivel}
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {trilha.descricao}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrilhasDeCarreira;
