import { FormEvent, useEffect, useState } from "react";
import { API_BASE } from "../config/api";

type ApiUsuario = {
  idUsuario?: number;
  nome: string;
  email: string;
  senhaHash?: string;
  idade: number;
  escolaridade: string;
  areaAtual: string;
  nivelRisco: number;
  tipoPerfil: "USER" | "ADMIN" | "EMPRESA";
  criadoEm?: string;
};

type ApiMensagem = {
  mensagem: string;
};

type UsuarioForm = {
  nome: string;
  email: string;
  senha: string;
  idade: string;
  escolaridade: string;
  areaAtual: string;
  nivelRisco: string;
  tipoPerfil: "USER" | "ADMIN" | "EMPRESA" | "";
};

const initialForm: UsuarioForm = {
  nome: "",
  email: "",
  senha: "",
  idade: "",
  escolaridade: "",
  areaAtual: "",
  nivelRisco: "",
  tipoPerfil: "",
};

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<ApiUsuario[]>([]);
  const [form, setForm] = useState<UsuarioForm>(initialForm);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [deletandoId, setDeletandoId] = useState<number | null>(null);

  const loadUsuarios = async () => {
    setLoading(true);
    setErro(null);
    try {
      const res = await fetch(`${API_BASE}/usuarios`);
      if (!res.ok) {
        const body: ApiMensagem = await res.json();
        throw new Error(body?.mensagem ?? "Erro ao carregar usuários.");
      }
      const data: ApiUsuario[] = await res.json();
      setUsuarios(data);
    } catch (e: unknown) {
      const mensagem = e instanceof Error ? e.message : "Erro desconhecido.";
      setErro(mensagem);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsuarios();
  }, []);

  const handleChange = (campo: keyof UsuarioForm, valor: string) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const resetarForm = () => {
    setForm(initialForm);
    setEditandoId(null);
  };

  const validarForm = () => {
    if (!form.nome.trim()) return "Nome é obrigatório.";
    if (!form.email.trim()) return "E-mail é obrigatório.";
    if (!editandoId && !form.senha.trim()) return "Senha é obrigatória.";
    if (!form.idade.trim() || Number.isNaN(Number(form.idade))) return "Idade inválida.";
    const idadeNum = Number(form.idade);
    if (idadeNum < 16 || idadeNum > 80) return "Idade deve estar entre 16 e 80.";
    if (!form.escolaridade.trim()) return "Escolaridade é obrigatória.";
    if (!form.areaAtual.trim()) return "Área atual é obrigatória.";
    if (!form.tipoPerfil) return "Selecione um tipo de perfil.";
    if (form.nivelRisco) {
      const nr = Number(form.nivelRisco);
      if (Number.isNaN(nr) || nr < 0 || nr > 100) return "Nível de risco deve estar entre 0 e 100.";
    }
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const mensagemValidacao = validarForm();
    if (mensagemValidacao) {
      setErro(mensagemValidacao);
      return;
    }

    setSalvando(true);
    setErro(null);

    try {
      const payload: ApiUsuario = {
        nome: form.nome.trim(),
        email: form.email.trim(),
        senhaHash: form.senha.trim()
          ? form.senha.trim()
          : editandoId
          ? undefined
          : "",
        idade: Number(form.idade),
        escolaridade: form.escolaridade.trim(),
        areaAtual: form.areaAtual.trim(),
        nivelRisco: form.nivelRisco ? Number(form.nivelRisco) : 0,
        tipoPerfil: (form.tipoPerfil || "USER").toUpperCase() as ApiUsuario["tipoPerfil"],
      };

      const metodo = editandoId ? "PUT" : "POST";
      const url = editandoId
        ? `${API_BASE}/usuarios/${editandoId}`
        : `${API_BASE}/usuarios`;

      const res = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body: ApiMensagem = await res.json();
        throw new Error(body?.mensagem ?? "Erro ao salvar usuário.");
      }

      resetarForm();
      await loadUsuarios();
    } catch (e: unknown) {
      const mensagem = e instanceof Error ? e.message : "Erro ao salvar usuário.";
      setErro(mensagem);
    } finally {
      setSalvando(false);
    }
  };

  const editar = (usuario: ApiUsuario) => {
    setEditandoId(usuario.idUsuario ?? null);
    setForm({
      nome: usuario.nome ?? "",
      email: usuario.email ?? "",
      senha: "",
      idade: usuario.idade?.toString() ?? "",
      escolaridade: usuario.escolaridade ?? "",
      areaAtual: usuario.areaAtual ?? "",
      nivelRisco: usuario.nivelRisco?.toString() ?? "",
      tipoPerfil: (usuario.tipoPerfil as UsuarioForm["tipoPerfil"]) ?? "",
    });
  };

  const cancelarEdicao = () => {
    resetarForm();
  };

  const deletar = async (id?: number) => {
    if (!id) {
      setErro("ID inválido.");
      return;
    }

    setDeletandoId(id);
    setErro(null);
    try {
      const res = await fetch(`${API_BASE}/usuarios/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const body: ApiMensagem = await res.json();
        throw new Error(body?.mensagem ?? "Erro ao excluir usuário.");
      }

      if (editandoId === id) resetarForm();
      await loadUsuarios();
    } catch (e: unknown) {
      const mensagem = e instanceof Error ? e.message : "Erro ao excluir usuário.";
      setErro(mensagem);
    } finally {
      setDeletandoId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Usuários
        </h1>
        <p className="text-slate-700 dark:text-slate-200">
          Cadastre e gerencie usuários da plataforma SkillShift AI.
        </p>
      </div>

      {erro && (
        <div className="text-sm text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 px-3 py-3 rounded-lg">
          {erro}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">
            {editandoId ? "Editar usuário" : "Adicionar novo usuário"}
          </h2>
          {editandoId && (
            <button
              type="button"
              onClick={cancelarEdicao}
              className="text-sm text-slate-500 hover:underline"
            >
              Cancelar edição
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              Nome
            </label>
            <input
              value={form.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              E-mail
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              Senha
            </label>
            <input
              type="password"
              value={form.senha}
              onChange={(e) => handleChange("senha", e.target.value)}
              placeholder={editandoId ? "Deixe em branco para manter" : "Senha inicial"}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
              required={!editandoId}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              Idade
            </label>
            <input
              type="number"
              min="16"
              max="80"
              value={form.idade}
              onChange={(e) => handleChange("idade", e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              Escolaridade
            </label>
            <input
              value={form.escolaridade}
              onChange={(e) => handleChange("escolaridade", e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              Área atual
            </label>
            <input
              value={form.areaAtual}
              onChange={(e) => handleChange("areaAtual", e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              Nível de risco (0 a 100)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={form.nivelRisco}
              onChange={(e) => handleChange("nivelRisco", e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              Tipo de perfil
            </label>
            <select
              value={form.tipoPerfil}
              onChange={(e) =>
                handleChange("tipoPerfil", e.target.value as UsuarioForm["tipoPerfil"])
              }
              className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100"
              required
            >
              <option value="">Selecione</option>
              <option value="USER">Usuário</option>
              <option value="ADMIN">Admin</option>
              <option value="EMPRESA">Empresa</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={salvando}
          className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {salvando
            ? "Salvando..."
            : editandoId
            ? "Atualizar usuário"
            : "Adicionar usuário"}
        </button>
      </form>

      <div className="space-y-4">
        {loading ? (
          <p className="text-slate-500 dark:text-slate-400 text-sm">Carregando usuários...</p>
        ) : usuarios.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400 text-sm">Nenhum usuário cadastrado.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                  <th className="py-2 pr-4">Nome</th>
                  <th className="py-2 pr-4">E-mail</th>
                  <th className="py-2 pr-4">Idade</th>
                  <th className="py-2 pr-4">Escolaridade</th>
                  <th className="py-2 pr-4">Área atual</th>
                  <th className="py-2 pr-4">Tipo</th>
                  <th className="py-2 pr-4">Nível de risco</th>
                  <th className="py-2 pr-4">Criado em</th>
                  <th className="py-2 pr-0 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {usuarios.map((usuario) => (
                  <tr key={usuario.idUsuario}>
                    <td className="py-3 pr-4 text-slate-900 dark:text-slate-100">
                      {usuario.nome}
                    </td>
                    <td className="py-3 pr-4 text-slate-600 dark:text-slate-300">
                      {usuario.email}
                    </td>
                    <td className="py-3 pr-4 text-slate-600 dark:text-slate-300">
                      {usuario.idade}
                    </td>
                    <td className="py-3 pr-4 text-slate-600 dark:text-slate-300">
                      {usuario.escolaridade}
                    </td>
                    <td className="py-3 pr-4 text-slate-600 dark:text-slate-300">
                      {usuario.areaAtual}
                    </td>
                    <td className="py-3 pr-4 text-slate-600 dark:text-slate-300">
                      {usuario.tipoPerfil}
                    </td>
                    <td className="py-3 pr-4 text-slate-600 dark:text-slate-300">
                      {usuario.nivelRisco?.toFixed(1) ?? "0"}
                    </td>
                    <td className="py-3 pr-4 text-slate-500 dark:text-slate-400">
                      {usuario.criadoEm ?? "—"}
                    </td>
                    <td className="py-3 pr-0 text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => editar(usuario)}
                          className="text-xs text-slate-600 dark:text-slate-300 hover:underline"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => deletar(usuario.idUsuario)}
                          disabled={deletandoId === usuario.idUsuario}
                          className="text-xs text-red-500 hover:underline disabled:opacity-60"
                        >
                          {deletandoId === usuario.idUsuario ? "Excluindo..." : "Excluir"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Usuarios;
