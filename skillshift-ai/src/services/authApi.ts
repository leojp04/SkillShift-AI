import { apiFetch } from "./apiClient";

export type SimpleUser = { id: string; nome: string; email: string };

export type AuthResponse = {
  token: string;
  usuario: SimpleUser;
};

export type RegisterPayload = { nome: string; email: string; senha: string };
export type LoginPayload = { email: string; senha: string };

export async function registerUser(data: RegisterPayload): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function loginUser(data: LoginPayload): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function fetchMe(token: string): Promise<SimpleUser> {
  return apiFetch<SimpleUser>("/me", { token });
}

export async function changePassword(
  token: string,
  payload: { senhaAtual: string; novaSenha: string }
): Promise<{ mensagem: string }> {
  try {
    // Tenta PATCH (contrato esperado)
    return await apiFetch<{ mensagem: string }>("/me/password", {
      method: "PATCH",
      token,
      body: JSON.stringify(payload),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message.toLowerCase() : "";
    // Alguns servers Quarkus expostos podem aceitar apenas PUT para esse recurso.
    if (msg.includes("404") || msg.includes("405") || msg.includes("target resource method")) {
      try {
        return await apiFetch<{ mensagem: string }>("/me/password", {
          method: "PUT",
          token,
          body: JSON.stringify(payload),
        });
      } catch (errPut) {
        const msgPut = errPut instanceof Error ? errPut.message.toLowerCase() : "";
        if (msgPut.includes("404") || msgPut.includes("405") || msgPut.includes("target resource method")) {
          // Último fallback: POST
          return apiFetch<{ mensagem: string }>("/me/password", {
            method: "POST",
            token,
            body: JSON.stringify(payload),
          });
        }
        throw errPut;
      }
    }
    throw err;
  }
}
