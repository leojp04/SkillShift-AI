const Home = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
        SkillShift AI: Futuro do Trabalho na prática
      </h1>
      <p className="text-slate-700 dark:text-slate-200 mb-6 max-w-2xl">
        Plataforma acadêmica de reskilling com IA. Avaliamos seu perfil, risco de automação e interesses para sugerir
        macro-áreas, rotas de estudo e cursos que sustentam empregabilidade no futuro do trabalho.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
          <h2 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">
            IA de Carreira
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Recomendações construídas com perfil, risco de automação e interesses para guiar seu próximo passo.
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
          <h2 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">
            Alinhado a ODS
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Foco em educação de qualidade e empregabilidade (ODS 4 - 8 - 9 - 10) para apoiar transições de carreira.
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
          <h2 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">
            Fácil de usar
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Fluxo simples, responsivo e direto para gerar trilhas e cursos sem fricção.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
