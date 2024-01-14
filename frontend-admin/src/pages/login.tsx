import React from "react";
import LoginForm from "../components/login-form";

const Login = () => {
  return (
    <div className="flex h-screen">
      <div className="m-auto w-80 h-80">
        <h2 className="text-2xl font-bold tracking-tight mb-5">Admin page</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
