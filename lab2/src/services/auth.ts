const TOKEN_KEY = "lab2_token";
const USER_KEY = "lab2_user";

type User = { email: string; name: string };

export function isAuthenticated(): boolean {
  return Boolean(localStorage.getItem(TOKEN_KEY));
}

export function getUser(): User | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function login(payload: { email: string; name?: string }) {
  localStorage.setItem(TOKEN_KEY, crypto.randomUUID());
  localStorage.setItem(
    USER_KEY,
    JSON.stringify({ email: payload.email, name: payload.name ?? "Admin" }),
  );
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
