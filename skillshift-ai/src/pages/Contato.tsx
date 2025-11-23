import { type FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const Contato = () => {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const nome = (formData.get("nome") as string | null)?.trim() ?? "";
    const email = (formData.get("email") as string | null)?.trim() ?? "";
    const mensagem = (formData.get("mensagem") as string | null)?.trim() ?? "";

    if (!nome || !email || !mensagem) {
      setStatus("error");
      return;
    }

    try {
      setStatus("loading");
      // Mock de envio realista
      console.log("Contato enviado:", { nome, email, mensagem });
      // Exemplo para futura integração:
      // await fetch("/api/contato", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ nome, email, mensagem }),
      // });
      form.reset();
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      if (status === "loading") {
        // evita travar no loading se ocorrer erro inesperado
        setStatus((prev) => (prev === "loading" ? "idle" : prev));
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Contato</h1>
      <p className="text-slate-700 dark:text-slate-200 mb-6 max-w-3xl">
        Entre em contato com a equipe do projeto para dúvidas, sugestões ou parcerias.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-slate-200 dark:border-slate-700"
      >
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
            Nome
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm"
            placeholder="Seu nome"
            aria-required="true"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm"
            placeholder="seu@email.com"
            aria-required="true"
            required
          />
        </div>
        <div>
          <label htmlFor="mensagem" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
            Mensagem
          </label>
          <textarea
            id="mensagem"
            name="mensagem"
            className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm min-h-[120px]"
            placeholder="Como podemos ajudar?"
            aria-required="true"
            required
          />
        </div>
        <div className="space-y-2">
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Enviando..." : "Enviar mensagem"}
          </button>
          {status === "success" && (
            <p className="text-sm text-emerald-400">Mensagem enviada com sucesso!</p>
          )}
          {status === "error" && <p className="text-sm text-rose-400">Não foi possível enviar. Tente novamente.</p>}
        </div>
      </form>
    </div>
  );
};

export default Contato;
