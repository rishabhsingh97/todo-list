import React from 'react';
import styles from './TextArea.module.css';

interface TextAreaProps {
    label?: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, name, value, onChange, placeholder }) => {
    return (
        <label className={styles.label}>
            {label && <span>{label}</span>}
            <br />
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                className={styles.textarea}
                placeholder={placeholder}
            />
        </label>
    );
};

export default TextArea;
