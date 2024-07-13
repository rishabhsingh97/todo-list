import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import ContextLayout from "./layout/ContextLayout";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export const mainRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<ContextLayout />}>
        <Route path="/" element={<MainLayout />}>
          <Route index path="/" element={<HomePage />} />
          <Route index path="/login" element={<LoginPage />} />
          <Route index path="/register" element={<RegisterPage />} />
        </Route>
      </Route>
    )
  
);
