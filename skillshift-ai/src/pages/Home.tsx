const Home = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
        SkillShift AI
      </h1>
      <p className="text-slate-700 dark:text-slate-200 mb-6 max-w-2xl">
        Plataforma de requalificação profissional com IA. Descubra trilhas de estudo, áreas em alta e cursos recomendados.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
          <h2 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">
            IA de Carreira
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Sugestões baseadas no perfil do usuário.
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
          <h2 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">
            Alinhado a ODS
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Educação de qualidade e empregabilidade.
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
          <h2 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">
            Fácil de usar
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Interface simples e responsiva.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
