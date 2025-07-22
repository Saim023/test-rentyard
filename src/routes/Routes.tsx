import { type RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Condominiums from "../pages/Condominiums/Condominiums";
import { Payment } from "../pages/Payment/Payment";

export const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/condominiums", element: <Condominiums /> },
      { path: "/payment", element: <Payment /> },
    ],
  },
];
