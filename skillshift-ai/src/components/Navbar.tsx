import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

const base = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
const active = "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900";
const inactive = "text-slate-700 dark:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-800";

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { usuario, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      <NavLink to="/" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
        Início
      </NavLink>
      <NavLink to="/sobre" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
        Sobre
      </NavLink>
      <NavLink to="/integrantes" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
        Integrantes
      </NavLink>
      <NavLink to="/recomendacoes" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
        Recomendações
      </NavLink>
      {usuario && (
        <NavLink to="/historico" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
          Histórico
        </NavLink>
      )}
      <NavLink to="/faq" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
        FAQ
      </NavLink>
      <NavLink to="/contato" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
        Contato
      </NavLink>
      {usuario ? (
        <div
          className={`flex items-center ${isMobile ? "flex-col items-start" : "flex-row items-center"} gap-3 ${
            isMobile ? "" : "ml-2"
          }`}
        >
          <span className="px-3 py-2 text-sm font-medium text-slate-900 dark:text-slate-100 opacity-80 select-none">
            Olá, {usuario.nome ?? "usuário"}
          </span>
          <NavLink to="/perfil" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
            Perfil
          </NavLink>
          <button
            type="button"
            onClick={logout}
            className={`${base} bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100`}
          >
            Sair
          </button>
        </div>
      ) : (
        <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-2 ${isMobile ? "" : "ml-2"}`}>
          <NavLink to="/login" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
            Login
          </NavLink>
          <NavLink to="/cadastro" className={({ isActive }) => `${base} ${isActive ? active : inactive}`}>
            Cadastro
          </NavLink>
        </div>
      )}
      <button
        onClick={toggleTheme}
        aria-label="Alternar entre tema claro e escuro"
        aria-pressed={theme === "dark"}
        className={`${base} bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 ${
          isMobile ? "" : "ml-2"
        }`}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </>
  );

  return (
    <nav
      role="navigation"
      aria-label="Navegação principal"
      className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
        <Link to="/" className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
          SkillShift <span className="text-indigo-500">AI</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="sm:hidden px-3 py-2 rounded-md text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-label="Abrir menu de navegação"
          >
            ☰
          </button>
          <div className="hidden sm:flex items-center gap-2">
            <NavLinks />
          </div>
        </div>
      </div>
      {open && (
        <div className="sm:hidden border-t border-slate-200 dark:border-slate-700 px-4 pb-3 flex flex-col gap-2">
          <NavLinks isMobile />
        </div>
      )}
    </nav>
  );
};
