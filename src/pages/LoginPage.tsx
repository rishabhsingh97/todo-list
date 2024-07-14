import React, { useState, FormEvent } from "react";
import authApi from "../api/authApi";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const payload = {
                username,
                password,
            };
            const response = await authApi.login(payload);
            if (response) {
                const { access, refresh } = response;
                localStorage.setItem("access_token", access);
                localStorage.setItem("refresh_token", refresh);
                navigate("/");
            }
        } catch (error) {
            setError('Invalid credentials. Please try again.');
            console.error('Login failed', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
