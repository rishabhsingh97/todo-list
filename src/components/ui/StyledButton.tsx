import React from "react";
import { Link } from "react-router-dom";
import "./StyledButton.css";

interface StyledButtonProps {
    label: string;
    href?: string;
    type?: "primary" | "secondry";
    submit?: boolean
    onClick?: any;
    disabled?: boolean;
}

const StyledButton: React.FC<StyledButtonProps> = ({ label, href, type, onClick, submit, disabled = false }) => {
    if (href) {
        return (
            <Link className={`button ${type} ${disabled ? "disabled" : ""}`} to={disabled ? "#" : href}>
                {label}
            </Link>
        );
    }
    else {
        return (
            <button type={submit ? "submit" : "button"} className={`button ${type}${disabled ? "disabled" : ""}`} onClick={onClick} disabled={disabled}>
                {label}
            </button>
        );
    }
};

export default StyledButton;
