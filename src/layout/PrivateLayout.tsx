import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

import styles from "./PrivateLayout.module.css";
import { Link } from "react-router-dom";
import Icons from "../components/Icons";

const PrivateLayout: React.FC = () => {

    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const location = useLocation();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }
        else {
            setLoading(false);
        }
    }, [isAuthenticated]);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <div className={styles.header}>
                {(location.pathname !== "/" && location.pathname !== "/home") && <Link className={styles.navBack} to="/">{'<'}</Link>}
                <Link className={styles.h1} to="/home"><span>ToDo List</span></Link>
            </div>
            <main className={styles.main}>
                <Outlet />
                <Link to="/todo/add" className={styles.addButtonBox}>
                    <div className={styles.addButton}>+</div>
                </Link>
            </main>
        </>
    );
}

export default PrivateLayout;