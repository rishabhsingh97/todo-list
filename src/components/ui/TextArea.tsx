import React from 'react';
import './TextArea.css';

interface TextAreaProps {
    label?: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, name, value, onChange, placeholder }) => {
    return (
        <label>
            {label && <span>{label}</span>}
            <br />
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                className="textarea"
                placeholder={placeholder}
            />
        </label>
    );
};

export default TextArea;
