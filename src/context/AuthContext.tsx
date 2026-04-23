import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type UserRole = "buyer" | "provider";
export interface StoredUser {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: UserRole;
  createdAt: number;
}

interface AuthCtx {
  user: StoredUser | null;
  signup: (u: Omit<StoredUser, "createdAt">) => { ok: boolean; error?: string };
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  updateProfile: (patch: Partial<StoredUser>) => void;
}

const Ctx = createContext<AuthCtx | null>(null);
const USERS_KEY = "sharefood:users";
const SESSION_KEY = "sharefood:session";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    const s = localStorage.getItem(SESSION_KEY);
    if (s) setUser(JSON.parse(s));
  }, []);

  const getUsers = (): StoredUser[] => JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  const saveUsers = (u: StoredUser[]) => localStorage.setItem(USERS_KEY, JSON.stringify(u));

  const signup: AuthCtx["signup"] = (u) => {
    const users = getUsers();
    if (users.some((x) => x.email.toLowerCase() === u.email.toLowerCase()))
      return { ok: false, error: "An account with this email already exists." };
    users.push({ ...u, createdAt: Date.now() });
    saveUsers(users);
    return { ok: true };
  };

  const login: AuthCtx["login"] = (email, password) => {
    const users = getUsers();
    const found = users.find(
      (x) => x.email.toLowerCase() === email.toLowerCase() && x.password === password
    );
    if (!found) return { ok: false, error: "Invalid email or password." };
    setUser(found);
    localStorage.setItem(SESSION_KEY, JSON.stringify(found));
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const updateProfile = (patch: Partial<StoredUser>) => {
    if (!user) return;
    const updated = { ...user, ...patch };
    setUser(updated);
    localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
    const users = getUsers().map((x) => (x.email === user.email ? updated : x));
    saveUsers(users);
  };

  return <Ctx.Provider value={{ user, signup, login, logout, updateProfile }}>{children}</Ctx.Provider>;
};

export const useAuth = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used within AuthProvider");
  return v;
};
