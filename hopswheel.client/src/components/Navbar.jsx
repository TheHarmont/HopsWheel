import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, isAdmin } from '../utils/auth';
import authService from '../services/authService';

import "./Navbar.css"

const Navbar = () => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();
    const [isOpen, setIsOpen] = useState(false);

    const isAuthenticated = () => {
        // Убедимся, что функция определена
        return !!authService.getCurrentUser();
    };

    const handleLogout = () => {
        setIsOpen(false);
        authService.logout();
        navigate('/login');
    };

    if (!isAuthenticated()) {
        return null;
    }

    return (
        <>
            <div
                className={`navbar-trigger ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>✦</span> 
            </div>

            <nav className={`navbar-panel ${isOpen ? 'open' : ''}`}>
                <div className="navbar-content">
                    <h3>Меню</h3>
                    <p>Привет, {user.username}!</p>
                    <ul>
                        <li><Link to="/" onClick={() => setIsOpen(false)}>Главная</Link></li>
                        <li><Link to="/prizes" onClick={() => setIsOpen(false)}>Настройка призов</Link></li>
                        <li><Link to="/users" onClick={() => setIsOpen(false)}>Список пользователей</Link></li>
                        <li><Link to="/statistics" onClick={() => setIsOpen(false)}>Статистика</Link></li>
                    </ul>
                    <button onClick={handleLogout} className="logout-btn">
                        Выйти
                    </button>
                </div>
            </nav>
        </>
    );
};

export default Navbar;