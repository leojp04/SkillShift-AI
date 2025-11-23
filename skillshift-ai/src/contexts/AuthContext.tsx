import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  changePassword as apiChangePassword,
  fetchMe,
  loginUser,
  registerUser,
  type AuthResponse,
  type SimpleUser,
} from "../services/authApi";

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
  usuario: SimpleUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (dados: LoginPayload) => Promise<void>;
  logout: () => void;
  cadastrar: (dados: RegisterPayload) => Promise<void>;
  atualizarSenha: (dados: UpdatePasswordPayload) => Promise<void>;
};

const TOKEN_KEY = "skillshift_token";
const USER_KEY = "skillshift_usuario";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const persistAuth = (res: AuthResponse) => {
  localStorage.setItem(TOKEN_KEY, res.token);
  localStorage.setItem(USER_KEY, JSON.stringify(res.usuario));
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<SimpleUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (!storedToken) {
      setLoading(false);
      return;
    }
    setToken(storedToken);
    fetchMe(storedToken)
      .then((user) => setUsuario(user))
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setUsuario(null);
        setToken(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async ({ email, senha }: LoginPayload) => {
    setError(null);
    const res = await loginUser({ email, senha });
    persistAuth(res);
    setUsuario(res.usuario);
    setToken(res.token);
  };

  const logout = () => {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  const cadastrar = async ({ nome, email, senha }: RegisterPayload) => {
    setError(null);
    const res = await registerUser({ nome, email, senha });
    persistAuth(res);
    setUsuario(res.usuario);
    setToken(res.token);
  };

  const atualizarSenha = async ({ senhaAtual, novaSenha }: UpdatePasswordPayload) => {
    if (!token) throw new Error("Usuário não autenticado.");
    setError(null);
    await apiChangePassword(token, { senhaAtual, novaSenha });
  };

  const value = useMemo(
    () => ({ usuario, token, loading, error, login, logout, cadastrar, atualizarSenha }),
    [usuario, token, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
};
