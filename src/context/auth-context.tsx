import React, { useState, ReactNode } from "react";
import * as auth from "../utils/auth-provider";
import { User } from "../views/project-list/search-pannel";
import { http } from "../utils/http";
import { useMount } from "../utils";

interface LoginForm {
  username: string;
  password: string;
}

const bootstrapUser = async () => {
  let user = null;
  const token = await auth.getToken();
  if (token) {
    const data = await http("me", { token: token });
    user = data.user;
  }
  return user;
};

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

  const login = (form: LoginForm) => auth.login(form).then(setUser);
  const register = (form: LoginForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    bootstrapUser().then(setUser);
  });

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
