import React, { useState } from "react";
import { LoginForm } from "./login";
import { RegisterForm } from "./register";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <>
      {isRegister ? <LoginForm /> : <RegisterForm />}
      <button
        onClick={() => {
          setIsRegister(!isRegister);
        }}
      >
        切换到{isRegister ? "注册" : "登录"}
      </button>
    </>
  );
};
