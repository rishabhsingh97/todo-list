import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import ContextLayout from "./layout/ContextLayout";
import HomePage from "./pages/HomePage";
import AuthLayout from "./layout/AuthLayout";
import PrivateLayout from "./layout/PrivateLayout";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AddToDoCardPage from "./pages/AddToDoCardPage";

export const mainRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<ContextLayout />}>
            <Route index path="/" element={<Navigate to="/home" />} />
            <Route path="/" element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>
            <Route path="/" element={<PrivateLayout />}>
                <Route index path="/home" element={<HomePage />} />
                <Route path="/addcard" element={<AddToDoCardPage />} />
            </Route>
        </Route>
    )

);
