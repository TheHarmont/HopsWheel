import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, isAdmin } from '../utils/auth';
import authService from '../services/authService';

const Navbar = () => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    if (!isAuthenticated()) {
        return null; // Скрыть навигацию, если не авторизован
    }

    return (
        <nav style={{ padding: '1rem', marginBottom: '1rem' }}>
            <span>Привет, {user.username}!</span>
            &nbsp;|&nbsp;
            <Link to="/">Главная</Link>
            &nbsp;|&nbsp;
            <Link to="/user">Личный кабинет</Link>
            &nbsp;|&nbsp;
            <Link to="/users">Список пользователей</Link>
            &nbsp;|&nbsp;
            <button onClick={handleLogout} style={{ border: 'none', cursor: 'pointer' }}>
                Выйти
            </button>
        </nav>
    );
};

export default Navbar;