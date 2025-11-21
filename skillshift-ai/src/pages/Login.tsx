import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config/api";

type LoginResponse = {
  token: string;
  usuario: {
    nome?: string;
    [key: string]: unknown;
  };
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro(null);

    try {
      const resposta = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (resposta.ok) {
        const data: LoginResponse = await resposta.json();
        localStorage.setItem("skillshift_token", data.token);
        localStorage.setItem("skillshift_usuario", JSON.stringify(data.usuario));
        window.dispatchEvent(new Event("auth-change"));
        navigate("/recomendacoes");
        return;
      }

      if (resposta.status === 400) {
        const body = await resposta.json();
        setErro(body?.mensagem ?? "Credenciais inválidas.");
      } else {
        setErro("Erro ao realizar login. Tente novamente.");
      }
    } catch (error: unknown) {
      const mensagem = error instanceof Error ? error.message : "Erro desconhecido";
      setErro(`Erro ao conectar com o servidor: ${mensagem}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-lg space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Entrar no SkillShift AI
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            Utilize suas credenciais para acessar as recomendações personalizadas.
          </p>
        </div>

        {erro && (
          <div className="text-sm text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-md px-3 py-2">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="senha"
              className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1"
            >
              Senha
            </label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm"
              placeholder="Sua senha"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
