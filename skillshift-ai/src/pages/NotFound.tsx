import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <p className="text-7xl font-bold text-slate-800 dark:text-slate-100">404</p>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Página não encontrada
        </h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto">
          A rota que você tentou acessar não existe. Verifique o endereço ou volte para a página inicial.
        </p>
        <Link
          to="/"
          className="inline-block px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Voltar para a Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
