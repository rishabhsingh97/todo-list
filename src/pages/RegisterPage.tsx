import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StyledButton from '../components/ui/StyledButton';
import Icons from '../components/Icons';
import { useNotification } from '../context/NotificationContext';
import InputBox from '../components/ui/Inputbox';
import { useAuth } from '../context/AuthContext';

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { showNotification } = useNotification();
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            showNotification('Passwords do not match.', 'error');
            return;
        }

        setIsSubmitting(true);

        try {
            const payload = {
                username,
                password
            };

            const registered = await register(payload);

            if (registered) {
                showNotification('Registration successful!', 'success');
                navigate('/login');
            }
            else {
                showNotification('Registration failed. Please try again.', 'error');
            }
        }
        catch (error) {
            showNotification('Registration failed. Please try again.', 'error');
            console.error('Registration failed', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="authForm register" onSubmit={handleRegister}>
            <h2 className="h2">Register at TodoList</h2>
            <div>
                <InputBox
                    inputType="text"
                    type="authLabel"
                    value={username}
                    name="name"
                    placeholder="Name"
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
            <div>
                <InputBox
                    inputType={`${confirmPasswordVisible ? "text" : "password"}`}
                    type="authLabel"
                    value={confirmPassword}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    icon={<Icons icon="eyeOpen" size="1rem" />}
                    iconClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                />
            </div>
            <StyledButton submit={true} label="Register" disabled={!isSubmitting} />
            <span>Already have an account ? <Link to="/login">Login</Link></span>
        </form>
    );
};

export default RegisterPage;
