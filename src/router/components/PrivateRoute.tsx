import { Navigate, Outlet } from "react-router";
import { useContext, type JSX } from "react";
import { AuthContext } from "@/context/auth/AuthContext";

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { state } = useContext(AuthContext);

  if (!state.user?.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
