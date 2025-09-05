import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth.service';
import "./Login.css"

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
        <div className="login-sheet">
            <h2>{barName}</h2>
            <div className = "error-group">
                {error && (<p className = "error-message">{error}</p>)}
            </div>
            <form onSubmit={handleSubmit}>
                <div className= "input-group">
                    <label>Логин:</label>
                    <input
                        type="text"
                        placeholder="Имя..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="LoginInput"
                    />
                </div>
                <div className="input-group">
                    <label>Пароль:</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="LoginInput"
                    />
                </div>
                <button type="submit" className="submit-line-button">Войти</button>
            </form>
        </div>
    );
};

export default Login;