import { Outlet, useNavigate } from "react-router-dom";
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
            <Link className={styles.h1} to="/home"><span>ToDo List</span></Link>
            <main className={styles.main}>
                <Outlet />
                <Link to="/addcard" className={styles.addButtonBox}>
                    <div className="addButton"><Icons icon="user" size="2rem" /></div>
                </Link>
            </main>
        </>
    );
}

export default PrivateLayout;