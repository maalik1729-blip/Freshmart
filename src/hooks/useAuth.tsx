import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthCtx {
  user: any | null;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, displayName: string) => Promise<any>;
  signOut: () => Promise<void>;
}

const Ctx = createContext<AuthCtx>({
  user: null,
  isAdmin: false,
  isSuperAdmin: false,
  loading: true,
  signIn: async () => ({}),
  signUp: async () => ({}),
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUser = async (token: string) => {
    try {
      const res = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const u = await res.json();
        setUser(u);
        const superAdmin = u.isSuperAdmin || u.email === "admin";
        setIsSuperAdmin(superAdmin);
        setIsAdmin(u.isAdmin || superAdmin);
      } else {
        localStorage.removeItem("freshmart_token");
        setUser(null);
        setIsAdmin(false);
        setIsSuperAdmin(false);
      }
    } catch (err) {
      console.error("Auth fetch error:", err);
      localStorage.removeItem("freshmart_token");
      setUser(null);
      setIsAdmin(false);
      setIsSuperAdmin(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("freshmart_token");
    if (token) {
      fetchUser(token).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || "Failed to sign in");
    }
    const data = await res.json();
    localStorage.setItem("freshmart_token", data.token);
    setUser(data.user);
    const superAdmin = data.user.isSuperAdmin || data.user.email === "admin";
    setIsSuperAdmin(superAdmin);
    setIsAdmin(data.user.isAdmin || superAdmin);
    return data;
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, display_name: displayName }),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || "Failed to sign up");
    }
    const data = await res.json();
    localStorage.setItem("freshmart_token", data.token);
    setUser(data.user);
    const superAdmin = data.user.isSuperAdmin || data.user.email === "admin";
    setIsSuperAdmin(superAdmin);
    setIsAdmin(data.user.isAdmin || superAdmin);
    return data;
  };

  const signOut = async () => {
    localStorage.removeItem("freshmart_token");
    setUser(null);
    setIsAdmin(false);
    setIsSuperAdmin(false);
  };

  return (
    <Ctx.Provider value={{ user, isAdmin, isSuperAdmin, loading, signIn, signUp, signOut }}>
      {children}
    </Ctx.Provider>
  );
};

export const useAuth = () => useContext(Ctx);