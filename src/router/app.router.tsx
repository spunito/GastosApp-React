import { LoginPage } from "@/auth/pages/LoginPage";
import { RegisterPage } from "@/auth/pages/RegisterPage";
import { AuthProvider } from "@/context/auth/AuthProvider";
import { GastosProvider } from "@/context/gastos/GastosProvider";
import { DashboardPage } from "@/gastos/Dashboard/DashboardPage";
import { HomePage } from "@/gastos/home/pages/HomePage";
import { createBrowserRouter } from "react-router";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider><GastosProvider><HomePage/></GastosProvider></AuthProvider>,
  },
  {
    path: "/login",
    element: <AuthProvider><GastosProvider><LoginPage/></GastosProvider></AuthProvider>,
  },
  {
    path: "/register",
    element: <AuthProvider><GastosProvider><RegisterPage/></GastosProvider></AuthProvider>,
  },
  {
    path: "/dashboard",
    element: <AuthProvider><GastosProvider><DashboardPage/></GastosProvider></AuthProvider>,
  },
]);