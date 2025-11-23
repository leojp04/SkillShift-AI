const faqs = [
  {
    pergunta: "O que é a SkillShift AI?",
    resposta:
      "Uma plataforma que usa IA para sugerir macro-áreas e cursos de requalificação, conectando você a trilhas alinhadas ao seu perfil.",
  },
  {
    pergunta: "Como as recomendações são geradas?",
    resposta:
      "Você informa 10 notas (Big Five + aptidões) e a IA retorna a macro-área sugerida e um cluster de cursos recomendados.",
  },
  {
    pergunta: "Preciso me cadastrar para usar?",
    resposta:
      "Para gerar recomendações, não. O cadastro é usado para salvar o histórico das consultas no backend e acessar depois no perfil.",
  },
  {
    pergunta: "Que dados ficam salvos no histórico?",
    resposta:
      "Armazenamos a macro-área sugerida e os cursos recomendados de cada consulta, vinculados ao seu usuário autenticado.",
  },
  {
    pergunta: "Quais APIs o app usa?",
    resposta:
      "Uma API de autenticação/histórico (Render) para login e salvar consultas, e uma API de IA (Render) para calcular macro-áreas e cursos.",
  },
  {
    pergunta: "Tem algum custo?",
    resposta: "Não. É um protótipo acadêmico, gratuito para testes.",
  },
];

const FAQ = () => {
  return (
    <section
      className="min-h-screen bg-slate-50 dark:bg-slate-950"
      aria-labelledby="faq-title"
    >
      <div className="max-w-6xl mx-auto py-10 px-6 space-y-6">
        <header className="space-y-3">
          <h1
            id="faq-title"
            className="text-3xl font-bold text-slate-900 dark:text-slate-100"
          >
            FAQ - Perguntas Frequentes
          </h1>
          <p className="text-slate-700 dark:text-slate-200 max-w-3xl">
            Reunimos aqui as dúvidas mais comuns sobre a plataforma SkillShift AI e como ela pode ajudar na sua
            requalificação profissional.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq) => (
            <div
              key={faq.pergunta}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 shadow-sm"
            >
              <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                {faq.pergunta}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {faq.resposta}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
