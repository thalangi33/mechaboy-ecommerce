import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../state/store";

interface ProtectedRouteProps {
  children?: ReactElement;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log("user", user);
  if (user == null) {
    console.log("Redirecting to main page");
    return <Navigate to="/?showLogin=true" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
