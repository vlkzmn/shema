import { authClient } from "../http/authClient";

function login(password: string): Promise<string> {
  return authClient.post("/login", { password });
}

function refresh(): Promise<string> {
  return authClient.get("/refresh");
}

export const authService = { login, refresh };
