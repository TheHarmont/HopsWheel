import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.login(username, password);
            const user = authService.getCurrentUser();
            // Перенаправляем по ролям
            if (user.roles.includes('admin')) {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError('Неверный логин или пароль');
        }
    };

    return (
        <div style={{ maxWidth: '300px', margin: 'auto', padding: '2rem' }}>
            <h2>Вход</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Логин:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ display: 'block', width: '100%', marginBottom: '10px' }}
                    />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ display: 'block', width: '100%', marginBottom: '10px' }}
                    />
                </div>
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default Login;