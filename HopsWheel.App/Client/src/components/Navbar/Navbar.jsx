import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, getCurrentUser, isAuthenticated } from '../../services/auth.service';

import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const user = getCurrentUser();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        setIsOpen(false);
        logout();
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
                aria-label="Открыть меню"
            >
                <span>✦</span>
            </div>

            <nav className={`navbar-panel ${isOpen ? 'open' : ''}`}>
                <div className="navbar-content">
                    <h3 className="menu-title">Меню</h3>
                    <p className="user-greeting">Привет, <strong>{user.username}</strong>!</p>
                    <ul className="nav-links">
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

            {isOpen && (
                <div
                    className="navbar-backdrop"
                    onClick={() => setIsOpen(false)}
                    aria-label="Закрыть меню"
                />
            )}
        </>
    );
};

export default Navbar;