import { LoginPage } from "@/auth/pages/LoginPage";
import { RegisterPage } from "@/auth/pages/RegisterPage";
import { AuthProvider } from "@/context/auth/AuthProvider";
import { DashboardPage } from "@/gastos/Dashboard/DashboardPage";
import { HomePage } from "@/gastos/home/pages/HomePage";
import { createBrowserRouter } from "react-router";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider><HomePage/></AuthProvider>,
  },
  {
    path: "/login",
    element: <AuthProvider><LoginPage/></AuthProvider>,
  },
  {
    path: "/register",
    element: <AuthProvider><RegisterPage/></AuthProvider>,
  },
  {
    path: "/dashboard",
    element: <AuthProvider><DashboardPage/></AuthProvider>,
  },
]);