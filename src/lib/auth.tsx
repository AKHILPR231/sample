import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type AdminUser = {
  name: string;
  role: string;
  avatarUrl?: string;
};

type AuthContextValue = {
  user: AdminUser | null;
  isAuthenticated: boolean;
  signIn: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Mock auth provider.
 *
 * `signIn` currently fakes a successful Microsoft Entra ID sign-in so the flow
 * is clickable end-to-end. To wire real SSO, replace the body of `signIn` with
 * an MSAL (`@azure/msal-browser` / `@azure/msal-react`) login and set the user
 * from the returned account.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);

  const signIn = useCallback(() => {
    setUser({
      name: "Sophie Martinez",
      role: "CRM Manager",
    });
  }, []);

  const signOut = useCallback(() => setUser(null), []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: user !== null, signIn, signOut }),
    [user, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
