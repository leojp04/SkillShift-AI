import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type AuthUser = {
  id: string;
  nome: string;
  email: string;
  senha: string;
};

type LoginPayload = {
  email: string;
  senha: string;
};

type RegisterPayload = {
  nome: string;
  email: string;
  senha: string;
};

type UpdatePasswordPayload = {
  senhaAtual: string;
  novaSenha: string;
};

type AuthContextValue = {
  usuario: AuthUser | null;
  login: (dados: LoginPayload) => Promise<void>;
  logout: () => void;
  cadastrar: (dados: RegisterPayload) => Promise<void>;
  atualizarSenha: (dados: UpdatePasswordPayload) => Promise<void>;
};

const USERS_KEY = "skillshift_usuarios";
const CURRENT_USER_KEY = "skillshift_usuario_logado";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `user-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const readUsuarios = (): AuthUser[] => {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as AuthUser[];
  } catch {
    // ignore parse errors
  }
  return [];
};

const saveUsuarios = (usuarios: AuthUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(usuarios));
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<AuthUser | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as AuthUser;
      setUsuario(parsed);
    } catch {
      setUsuario(null);
    }
  }, []);

  const login = async ({ email, senha }: LoginPayload) => {
    const usuarios = readUsuarios();
    const found = usuarios.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha
    );
    if (!found) {
      throw new Error("E-mail ou senha inválidos.");
    }
    setUsuario(found);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(found));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const cadastrar = async ({ nome, email, senha }: RegisterPayload) => {
    const usuarios = readUsuarios();
    const jaExiste = usuarios.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (jaExiste) {
      throw new Error("Já existe um usuário com este e-mail.");
    }
    const novo: AuthUser = {
      id: createId(),
      nome,
      email,
      senha,
    };
    const atualizados = [...usuarios, novo];
    saveUsuarios(atualizados);
    setUsuario(novo);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(novo));
  };

  const atualizarSenha = async ({ senhaAtual, novaSenha }: UpdatePasswordPayload) => {
    if (!usuario) {
      throw new Error("Usuário não autenticado.");
    }
    const usuarios = readUsuarios();
    const idx = usuarios.findIndex((u) => u.id === usuario.id);
    if (idx === -1) throw new Error("Usuário não encontrado.");
    if (usuarios[idx].senha !== senhaAtual) {
      throw new Error("Senha atual incorreta.");
    }
    const atualizado: AuthUser = { ...usuarios[idx], senha: novaSenha };
    usuarios[idx] = atualizado;
    saveUsuarios(usuarios);
    setUsuario(atualizado);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(atualizado));
  };

  const value = useMemo(
    () => ({ usuario, login, logout, cadastrar, atualizarSenha }),
    [usuario]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
};
