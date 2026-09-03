import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Role } from "./types";
import { supabase, supabaseConfigured } from "./supabase";
import type { Session, User } from "@supabase/supabase-js";

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  role: Role;
  region: string | null;
}

export const roleLabels: Record<Role, string> = {
  citizen: "Citizen",
  surveyor: "Surveyor",
  officer: "Government officer",
  verifier: "Community verifier",
  admin: "Administrator",
  bank: "Bank",
};

export function roleHome(role: Role): string {
  return role === "surveyor"
    ? "/surveyor"
    : role === "officer"
      ? "/government"
      : role === "verifier"
        ? "/verification"
        : role === "admin"
          ? "/admin"
          : role === "bank"
            ? "/bank"
            : "/dashboard";
}

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  configError: string | null;
  signIn: (email: string, password: string) => Promise<{ error: string | null; role: Role | null }>;
  signUp: (input: {
    email: string;
    password: string;
    fullName: string;
    role: Role;
    region: string;
  }) => Promise<{ needsEmailConfirmation: boolean; error: string | null }>;
  saveProfile: (
    input: Partial<Pick<Profile, "full_name" | "role" | "region">>,
  ) => Promise<{ error: string | null }>;
  signOut: () => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function roleFromMetadata(value: unknown): Role {
  return value === "surveyor" ||
    value === "officer" ||
    value === "verifier" ||
    value === "admin" ||
    value === "bank"
    ? value
    : value === "government"
      ? "officer"
      : value === "community"
        ? "verifier"
        : "citizen";
}

function roleForDatabase(role: Role) {
  return role === "officer" ? "government" : role === "verifier" ? "community" : role;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const configError = supabaseConfigured
    ? null
    : "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env.local.";

  const loadProfile = async (user: User | null) => {
    if (!user) {
      setProfile(null);
      return;
    }
    const { data } = await supabase
      .from("profiles")
      .select("id, full_name, email, role, region")
      .eq("id", user.id)
      .maybeSingle();
    setProfile(
      data
        ? { ...data, role: roleFromMetadata(data.role) }
        : {
            id: user.id,
            full_name: (user.user_metadata.full_name as string | undefined) ?? null,
            email: user.email ?? null,
            role: roleFromMetadata(user.user_metadata.role),
            region: (user.user_metadata.region as string | undefined) ?? null,
          },
    );
  };

  useEffect(() => {
    if (!supabaseConfigured) {
      setLoading(false);
      return;
    }
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      loadProfile(data.session?.user ?? null).finally(() => mounted && setLoading(false));
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      loadProfile(nextSession?.user ?? null).finally(() => setLoading(false));
    });
    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextValue = {
    session,
    user: session?.user ?? null,
    profile,
    loading,
    configError,
    async signIn(email, password) {
      if (configError) return { error: configError, role: null };
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      return {
        error: error?.message ?? null,
        role: data.user ? roleFromMetadata(data.user.user_metadata.role) : null,
      };
    },
    async signUp({ email, password, fullName, role, region }) {
      if (configError) return { needsEmailConfirmation: false, error: configError };
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName, role, region } },
      });
      if (error) return { needsEmailConfirmation: false, error: error.message };
      if (data.user) {
        await supabase
          .from("profiles")
          .upsert({
            id: data.user.id,
            full_name: fullName,
            email,
            role: roleForDatabase(role),
            region,
          });
      }
      return { needsEmailConfirmation: !data.session, error: null };
    },
    async saveProfile(input) {
      if (!session?.user) return { error: "You must be signed in." };
      const values = input.role ? { ...input, role: roleForDatabase(input.role) } : input;
      const { error } = await supabase
        .from("profiles")
        .upsert({ id: session.user.id, email: session.user.email, ...values });
      if (!error) await loadProfile(session.user);
      return { error: error?.message ?? null };
    },
    async signOut() {
      if (!supabaseConfigured) return { error: configError };
      const { error } = await supabase.auth.signOut();
      if (!error) {
        setSession(null);
        setProfile(null);
      }
      return { error: error?.message ?? null };
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
