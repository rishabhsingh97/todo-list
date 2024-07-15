import styles from "./InputBox.module.css";

interface InputBoxProps {
    type: "authLabel" | "authLabel_password" | "todo_card";
    label?: string | undefined;
    inputType: any;
    name: any;
    value: any;
    placeholder?: string;
    onChange: any;
    icon?: React.ReactNode;
    iconClick?: any;
}

const InputBox: React.FC<InputBoxProps> = ({ type, inputType, name, value, onChange, icon = null, placeholder = "", iconClick }) => {

    switch (type) {

        case "authLabel": {
            return (
                <label className={styles.label}>
                    <span className={styles.icon}>
                        {icon}
                    </span>
                    <input
                        name={name}
                        type={inputType}
                        className={styles.input}
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                    />
                </label>
            );
            break;
        }

        case "authLabel_password": {
            return (
                <label className={styles.label}>
                    <span className={styles.icon} onClick={iconClick}>
                        {icon}
                    </span>
                    <input
                        name={name}
                        type={inputType}
                        className={styles.input}
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                    />
                </label>
            );
            break;
        }

        case "todo_card": {
            return (
                <label className={styles.label}>
                    <span className={styles.icon} onClick={iconClick}>
                        {icon}
                    </span>
                    <input
                        name={name}
                        type={inputType}
                        className={styles.input}
                        placeholder={placeholder}
                        onChange={onChange}
                        value={value}
                    />
                </label>
            );
            break;
        }

    }
}

export default InputBox;