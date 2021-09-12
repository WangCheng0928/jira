import React, { useState, ReactNode } from "react";
import * as auth from "../utils/auth-provider";
import { User } from "../views/project-list/search-pannel";

interface LoginForm {
  username: string;
  password: string;
}

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: LoginForm) => Promise<void>;
      register: (form: LoginForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (form: LoginForm) =>
    auth.login(form).then((user) => setUser(user));
  const register = (form: LoginForm) =>
    auth.register(form).then((user) => setUser(user));
  const logout = () => auth.logout().then(() => setUser(null));

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在authProvider中使用");
  }
  return context;
};
