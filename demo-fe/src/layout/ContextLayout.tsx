import { Outlet } from "react-router-dom";
import { AppProvider } from "../context/AppContext"; 

const ContextLayout: React.FC = () => {
    return (
            <AppProvider>
                <Outlet />
            </AppProvider>
    );
}

export default ContextLayout;
