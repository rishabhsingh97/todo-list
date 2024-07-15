import { createContext, useContext, useEffect, useState } from 'react';

interface NotificationContextProps {
    showNotification: (message: string, type: string) => void;
}

interface NotificationProviderProps {
    children: React.ReactNode
}

interface ToastProps {
    message: string;
    type: string;
    duration?: number;
    onClose: () => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

function NotificationToast({ message, type, duration = 3000, onClose }: ToastProps) {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className={`toast ${type}`}>
            {message}
        </div>
    );
};

export const useNotification = (): NotificationContextProps => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
    const [notification, setNotification] = useState<string>("");
    const [type, setType] = useState<string>("");

    const showNotification = (message: string, type: string) => {
        setNotification(message);
        setType(type);
    };

    const hideNotification = () => {
        setNotification("");
        setType("")
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <NotificationToast message={notification} type={type} onClose={hideNotification} />
        </NotificationContext.Provider>
    );
};

