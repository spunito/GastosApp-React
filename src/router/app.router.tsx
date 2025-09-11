import { LoginPage } from "@/auth/pages/LoginPage";
import { RegisterPage } from "@/auth/pages/RegisterPage";
import { DashboardPage } from "@/gastos/Dashboard/DashboardPage";
import { HomePage } from "@/gastos/home/pages/HomePage";
import { createBrowserRouter } from "react-router";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/register",
    element: <RegisterPage/>,
  },
  {
    path: "/dashboard",
    element: <DashboardPage/>,
  },
]);