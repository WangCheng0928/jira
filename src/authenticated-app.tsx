import React from "react";
import { ProjectListScreen } from "./views/project-list";
import { useAuth } from "./context/auth-context";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();

  return (
    <>
      <button onClick={logout}>登出</button>
      <ProjectListScreen />
    </>
  );
};
