"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useSession, signOut } from "@/lib/auth-client";
import api from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data: session, isPending } = useSession();
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const syncUser = useCallback(async (user) => {
    try {
      const res = await api.post("/api/jwt", {
        email: user.email,
        name: user.name,
        image: user.image,
      });
      localStorage.setItem("rentgear_token", res.data.token);
      setDbUser(res.data.user);
    } catch (err) {
      console.error("JWT sync failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isPending) return;
    let active = true;

    const initAuth = async () => {
      await Promise.resolve();
      if (!active) return;

      if (session?.user) {
        await syncUser(session.user);
      } else {
        localStorage.removeItem("rentgear_token");
        setDbUser(null);
        setLoading(false);
      }
    };

    initAuth();
    return () => {
      active = false;
    };
  }, [session, isPending, syncUser]);

  const logout = async () => {
    await signOut();
    localStorage.removeItem("rentgear_token");
    setDbUser(null);
  };

  const refreshUser = async () => {
    if (session?.user) await syncUser(session.user);
  };

  return (
    <AuthContext.Provider
      value={{
        user: dbUser,
        session,
        loading: isPending || loading,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
