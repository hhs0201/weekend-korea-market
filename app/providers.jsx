"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

const AuthContext = createContext(null);

const LOCAL_USER_KEY = "weekend-korea-market-local-user-v1";

function makeLocalUser(email = "local@weekend.market", name = "주말투자자") {
  return {
    id: "local-user",
    email,
    user_metadata: {
      name,
      avatar_url: ""
    },
    app_metadata: {
      provider: "local"
    }
  };
}

export function Providers({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authMessage, setAuthMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      if (!isSupabaseConfigured || !supabase) {
        const raw = window.localStorage.getItem(LOCAL_USER_KEY);
        if (raw) {
          const localUser = JSON.parse(raw);
          if (mounted) setUser(localUser);
        }
        if (mounted) setLoading(false);
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(data.session);
      setUser(data.session?.user || null);
      setLoading(false);
    }

    initAuth();

    if (!isSupabaseConfigured || !supabase) {
      return () => {
        mounted = false;
      };
    }

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user || null);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    setAuthMessage("");
    if (!isSupabaseConfigured || !supabase) {
      const localUser = makeLocalUser("google-demo@weekend.market", "구글 체험 사용자");
      window.localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(localUser));
      setUser(localUser);
      setAuthMessage("Supabase 환경변수가 없어 로컬 체험 로그인으로 진행했어요.");
      return { error: null };
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: typeof window !== "undefined" ? window.location.origin : undefined
      }
    });
    if (error) setAuthMessage(error.message);
    return { error };
  };

  const signInWithEmail = async (email) => {
    setAuthMessage("");
    if (!email) return { error: { message: "이메일을 입력해주세요." } };

    if (!isSupabaseConfigured || !supabase) {
      const localUser = makeLocalUser(email, email.split("@")[0] || "주말투자자");
      window.localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(localUser));
      setUser(localUser);
      setAuthMessage("Supabase 환경변수가 없어 로컬 체험 로그인으로 진행했어요.");
      return { error: null };
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined
      }
    });
    setAuthMessage(error ? error.message : "로그인 링크를 이메일로 보냈어요.");
    return { error };
  };

  const signOut = async () => {
    setAuthMessage("");
    if (!isSupabaseConfigured || !supabase) {
      window.localStorage.removeItem(LOCAL_USER_KEY);
      setUser(null);
      return;
    }
    await supabase.auth.signOut();
  };

  const value = useMemo(() => ({
    authMessage,
    isSupabaseConfigured,
    loading,
    session,
    signInWithEmail,
    signInWithGoogle,
    signOut,
    user
  }), [authMessage, loading, session, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside Providers");
  return context;
}
