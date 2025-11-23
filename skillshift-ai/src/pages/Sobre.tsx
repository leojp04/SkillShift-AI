const Sobre = () => {
  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
        Sobre o Projeto
      </h1>
      <p className="text-slate-700 dark:text-slate-200 mb-6 max-w-3xl">
        O SkillShift AI é um protótipo acadêmico focado no Futuro do Trabalho e requalificação profissional.
        Usamos React + TypeScript para orquestrar as interfaces, consumimos APIs para autenticação e IA, e
        validamos o fluxo de reskilling com trilhas sugeridas a partir do perfil do usuário.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <h2 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">Problema</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Automação e IA aceleram a obsolescência de habilidades; quem não se atualiza fica para trás.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <h2 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">Solução</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Mapear perfil (soft + aptidões), sugerir macro-áreas em alta e entregar trilhas de cursos para reskilling.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
          <h2 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">Proposta</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Entregar uma experiência simples, validável e pronta para evoluir com dados reais e integrações adicionais.
          </p>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
        ODS Relacionadas
      </h2>
      <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-200">
        <li>ODS 4 — Educação de qualidade (requalificação contínua)</li>
        <li>ODS 8 — Trabalho decente e crescimento econômico (empregabilidade com novas habilidades)</li>
        <li>ODS 9 — Indústria, inovação e infraestrutura (IA e automação para preparar a força de trabalho)</li>
        <li>ODS 10 — Redução das desigualdades (reskilling inclusivo para ampliar acesso a empregos qualificados)</li>
      </ul>
    </div>
  );
};

export default Sobre;
