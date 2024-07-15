import React from "react";
import "./Dropdown.css";

interface DropdownProps {
    type: "label" | "label_icon";
    label?: string;
    inputType: string;
    name: string;
    value: string | number; 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: React.ReactNode; 
    iconHandler?: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ type, label = "", inputType, name, value, onChange, icon = null, iconHandler }) => {
    switch (type) {
        case "label":
            return (
                <label>
                    <span>{label}</span>
                    <br />
                    <input
                        placeholder={label}
                        type={inputType}
                        name={name}
                        className="input"
                        value={value}
                        onChange={onChange}
                    />
                </label>
            );

        case "label_icon":
            return (
                <label>
                    <span>{label}</span>
                    <br />
                    <div className="input-with-icon">
                        <input
                            placeholder={label}
                            type={inputType}
                            name={name}
                            className="input"
                            value={value}
                            onChange={onChange}
                        />
                        <div className="input-icon" onClick={iconHandler}>
                            {icon}
                        </div>
                    </div>
                </label>
            );

        default:
            return (
                <input
                    placeholder={label}
                    type={inputType}
                    name={name}
                    className="input"
                    value={value}
                    onChange={onChange}
                />
            );
    }
};

export default Dropdown;
