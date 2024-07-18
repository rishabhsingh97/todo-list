import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

import styles from './AuthLayout.module.css';

const AuthLayout: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
            return;
        }
        else {
            setLoading(false);
        }
    }, [isAuthenticated, navigate]);

    if (loading) {
        return <Loading />;
    }

    return (
        <main className={`${styles.main} roboto-regular`}>
            <div>
                <Outlet />
            </div>
        </main>
    );
};

export default AuthLayout;
