import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "@/context/auth/AuthContext";



export const PrivateRoute = ({ children }:any) => {
  const { state } = useContext(AuthContext);

  if (state.isLoading) {
  return <div>Cargando...</div>; // o un spinner
}

  // Si no hay usuario -> redirige al login
  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};