import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth.service';
import cn from "../../styles/Auth/Login.module.css";

const Login = () => {
    const barName = "Рыжая Сова";

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data.detail ?? 'Неверный логин или пароль!');
        }
    };

    return (
        <div className={cn["login-container"]}>
            <div className={cn["login-card"]}>
                <h1 className={cn["bar-title"]}>🦉 {barName}</h1>
                <p className={cn["subtitle"]}>Ты знаешь что делать</p>

                {error && (
                    <div className={cn["error-alert"]}>
                        <span>⚠️</span> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className={cn["login-form"]}>
                    <div className={cn["input-group"]}>
                        <label htmlFor="username">Логин</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Ваше имя..."
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="username"
                        />
                    </div>

                    <div className={cn["input-group"]}>
                        <label htmlFor="password">Пароль</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <button type="submit" className={cn["btn-login"]}>
                        <span>Войти</span>
                        <span className={cn["btn-icon"]}>→</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;