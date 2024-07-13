import { useState } from "react";
import authApi from "../api/authApi";

const LoginPage: React.FC = () => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSave = async () => {
        const isLoggedIn = await authApi.login({username, password})
        if(isLoggedIn) {
            
        }
        else {

        }
    }

    return (
        <>
            <input type="text" value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
            <input type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
            <button type="submit" onClick={handleSave}>Login</button>
        </>
    );
}

export default LoginPage;