const integrantes = [
  {
    nome: "Leonardo José Pereira",
    rm: " 563065",
    foto: "/Leonardo.jpg",
  },
  {
    nome: "Fabrício Henrique Pereira",
    rm: " 563237",
    foto: "/Fabricio.jpg",
  },
  {
    nome: "Pedro Henrique de Oliveira",
    rm: " 562312",
    foto: "/Pedro.jpeg",
  },
];

const Integrantes = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
        Integrantes do Projeto
      </h1>
      <p className="text-slate-700 dark:text-slate-200 mb-4 max-w-3xl">
        Time responsável pelo SkillShift AI, cobrindo front-end em React+TS, API em Quarkus e IA em Python para
        recomendações de carreira.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {integrantes.map((m) => (
          <div
            key={m.rm}
            className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm overflow-hidden"
          >
            {m.foto && (
              <img
                src={m.foto}
                alt={m.nome}
                className={`w-full h-80 object-cover ${
                  m.nome.includes("Fabrício") ? "object-center" : "object-top"
                } rounded-t-2xl mb-3 border border-slate-200 dark:border-slate-700`}
              />
            )}
            <h2 className="font-semibold text-slate-900 dark:text-slate-100">{m.nome}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-300">RM: {m.rm}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Integrantes;
