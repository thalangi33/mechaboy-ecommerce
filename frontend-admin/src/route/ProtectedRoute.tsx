import React, { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { User } from "../context/AuthContext";

interface ProtectedRouteProps {
  user: User;
  children?: ReactElement;
}

const ProtectedRoute = ({ user, children }: ProtectedRouteProps) => {
  console.log("user", user);
  if (user.token == null) {
    console.log("Redirecting to login page");
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
