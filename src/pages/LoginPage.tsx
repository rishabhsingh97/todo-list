import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "../components/ui/Inputbox";
import StyledButton from "../components/ui/StyledButton";
import { Link } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";
import Icons from "../components/Icons";
import { useAuth } from "../context/AuthContext";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const navigate = useNavigate();

    const { showNotification } = useNotification();
    const { login } = useAuth();

    useEffect(() => {
        if (username && password) {
            setIsSubmitting(true);
        }
        else {
            setIsSubmitting(false);
        }
    }, [username, password]);

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const payload = {
                username,
                password,
            };

            const loggedIn = await login(payload);
            if (loggedIn) {
                showNotification("login successfull", "success");
                navigate("/home");
            }
        }
        catch (error) {
            showNotification("Invalid credentials, please try again", "error");
            console.error('Login failed', error);
        }
    };

    return (
        <>
            <form className="authForm login" onSubmit={handleLogin}>
                <h2 className="h2">Log in to ToDo List</h2>
                <div>
                    <InputBox
                        inputType="text"
                        type="authLabel"
                        value={username}
                        name="username"
                        placeholder="username"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <InputBox
                        inputType={`${passwordVisible ? "text" : "password"}`}
                        type="authLabel_password"
                        value={password}
                        name="password"
                        placeholder="Password"
                        icon={<Icons icon="eyeOpen" size="1rem" />}
                        iconClick={() => setPasswordVisible(!passwordVisible)}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                </div>
                <StyledButton submit={true} label="Login" disabled={!isSubmitting} />

                    <span>Don't have account? <Link to="/register">Register</Link></span>
            </form >
        </>
    );
};

export default LoginPage;