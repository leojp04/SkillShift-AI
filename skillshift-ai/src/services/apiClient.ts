export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

type ApiOptions = RequestInit & { token?: string };

export async function apiFetch<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const headers = new Headers(options.headers ?? {});
  headers.set("Content-Type", "application/json");

  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const body = isJson ? await response.json() : undefined;

  if (!response.ok) {
    const mensagem =
      body && typeof body === "object" && "mensagem" in body
        ? (body as { mensagem: string }).mensagem
        : `Erro ${response.status}`;
    throw new Error(mensagem);
  }

  return body as T;
}
