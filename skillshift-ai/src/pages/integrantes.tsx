const integrantes = [
  { nome: "Leonardo", rm: "RM563065" },
  { nome: "Fabrício", rm: "RM563237" },
  { nome: "Pedro", rm: "RM562312" },
];

const Integrantes = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
        Integrantes do Projeto
      </h1>
      <p className="text-slate-700 dark:text-slate-200 mb-4">
        Lista dos participantes da equipe, conforme solicitado na avaliação.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {integrantes.map((m) => (
          <div key={m.rm} className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
            <h2 className="font-semibold text-slate-900 dark:text-slate-100">{m.nome}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-300">RM: {m.rm}</p>
            <p className="text-sm text-slate-500 dark:text-slate-300 mt-2">
              Função: desenvolvimento front-end
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Integrantes;
