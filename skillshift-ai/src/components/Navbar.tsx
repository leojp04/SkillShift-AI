import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

const base =
  "px-3 py-2 rounded-md text-sm font-medium transition-colors";
const active =
  "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900";
const inactive =
  "text-slate-700 dark:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-800";

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { usuario, logout } = useAuth();

  return (
    <nav
      role="navigation"
      aria-label="Navegação principal"
      className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
        <Link
          to="/"
          className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100"
        >
          SkillShift <span className="text-indigo-500">AI</span>
        </Link>
        <div className="flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
          >
            Início
          </NavLink>
          <NavLink
            to="/sobre"
            className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
          >
            Sobre
          </NavLink>
          <NavLink
            to="/integrantes"
            className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
          >
            Integrantes
          </NavLink>
          <NavLink
            to="/recomendacoes"
            className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
          >
            Recomendações
          </NavLink>
          <NavLink
            to="/faq"
            className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
          >
            FAQ
          </NavLink>
          <NavLink
            to="/contato"
            className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
          >
            Contato
          </NavLink>
          {usuario ? (
            <div className="flex items-center gap-2 ml-2">
              <span className="text-sm text-slate-700 dark:text-slate-200">
                Olá, {usuario.nome ?? "usuário"}
              </span>
              <NavLink
                to="/perfil"
                className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
              >
                Perfil
              </NavLink>
              <button
                type="button"
                onClick={logout}
                className="px-3 py-2 rounded-md text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              >
                Sair
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              <NavLink
                to="/login"
                className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
              >
                Login
              </NavLink>
              <NavLink
                to="/cadastro"
                className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
              >
                Cadastro
              </NavLink>
            </div>
          )}
          <button
            onClick={toggleTheme}
            aria-label="Alternar entre tema claro e escuro"
            aria-pressed={theme === "dark"}
            className="ml-2 px-3 py-2 rounded-md text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
};
