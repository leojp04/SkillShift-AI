const faqs = [
  {
    pergunta: "O que é a SkillShift AI?",
    resposta:
      "Uma plataforma que usa IA para sugerir trilhas de requalificação profissional, conectando você a cursos e áreas em alta.",
  },
  {
    pergunta: "Preciso pagar para usar?",
    resposta:
      "Este projeto é um protótipo acadêmico e não exige pagamento. Em um cenário real, haveria planos gratuitos e pagos.",
  },
  {
    pergunta: "Como as recomendações são geradas?",
    resposta:
      "As sugestões combinam dados de mercado, perfil do usuário e regras pré-configuradas. Quando a API não está ativa, usamos dados mock.",
  },
  {
    pergunta: "Posso salvar minhas trilhas favoritas?",
    resposta:
      "Na versão atual, o salvamento é local. Em uma versão completa, você teria cadastro e sincronização em nuvem.",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto py-10 px-4 space-y-6">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            FAQ - Perguntas Frequentes
          </h1>
          <p className="text-slate-700 dark:text-slate-200 max-w-3xl">
            Reunimos aqui as dúvidas mais comuns sobre a plataforma SkillShift AI e como ela pode ajudar na sua
            requalificação profissional.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq) => (
            <div
              key={faq.pergunta}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 shadow-sm"
            >
              <p className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                {faq.pergunta}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {faq.resposta}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
