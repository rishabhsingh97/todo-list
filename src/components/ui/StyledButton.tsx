import React from "react";
import { Link } from "react-router-dom";
import styles from "./StyledButton.module.css";

interface StyledButtonProps {
    label: string;
    href?: string;
    type?: "primary" | "secondary" | "warning";
    submit?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
}

const StyledButton: React.FC<StyledButtonProps> = ({ 
    label, 
    href, 
    type = "primary", 
    onClick, 
    submit = false, 
    disabled = false 
}) => {
    if (href) {
        return (
            <Link className={`${styles.button} ${styles[type]} ${disabled ? styles.disabled : ""}`} to={disabled ? "#" : href}>
                {label}
            </Link>
        );
    } else {
        return (
            <button 
                type={submit ? "submit" : "button"} 
                className={`${styles.button} ${styles[type]} ${disabled ? styles.disabled : ""}`} 
                onClick={onClick} 
                disabled={disabled}
            >
                {label}
            </button>
        );
    }
};

export default StyledButton;
