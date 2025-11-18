const Contato = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
        Contato
      </h1>
      <p className="text-slate-700 dark:text-slate-200 mb-6 max-w-3xl">
        Entre em contato com a equipe do projeto para dúvidas, sugestões ou parcerias.
      </p>

      <form className="space-y-4 bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-slate-200 dark:border-slate-700">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
            Nome
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm"
            placeholder="Seu nome"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
            E-mail
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm"
            placeholder="seu@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
            Mensagem
          </label>
          <textarea
            className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm min-h-[120px]"
            placeholder="Como podemos ajudar?"
          />
        </div>
        <button
          type="button"
          className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
        >
          Enviar (mock)
        </button>
      </form>
    </div>
  );
};

export default Contato;
