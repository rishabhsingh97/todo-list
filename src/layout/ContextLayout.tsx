import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { NotificationProvider } from "../context/NotificationContext";

const ContextLayout: React.FC = () => {
    return (
        <NotificationProvider>
            <AuthProvider>
                <Outlet />
            </AuthProvider>
        </NotificationProvider>
    );
}

export default ContextLayout;
