const Sobre = () => {
  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
        Sobre o Projeto
      </h1>
      <p className="text-slate-700 dark:text-slate-200 mb-6 max-w-3xl">
        O SkillShift AI é um projeto acadêmico que simula uma plataforma de requalificação profissional usando
        React, TypeScript e integração com API. Ele também demonstra o uso correto de GitFlow e versionamento no GitHub.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <h2 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">Problema</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Muitos profissionais estão sendo substituídos por automação e IA.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <h2 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">Solução</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Oferecer rotas de estudo e cursos alinhados ao mercado.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <h2 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">Proposta</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Ser simples de usar e fácil de manter.
          </p>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
        ODS Relacionadas
      </h2>
      <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-200">
        <li>ODS 4 — Educação de qualidade</li>
        <li>ODS 8 — Trabalho decente e crescimento econômico</li>
      </ul>
    </div>
  );
};

export default Sobre;
