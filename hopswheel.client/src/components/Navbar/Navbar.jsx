import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, getCurrentUser, isAuthenticated } from '../../services/auth.service';

import cn from "../../styles/Navbar/Navbar.module.css";

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
                className={`${cn["navbar-trigger"]} ${isOpen ? cn['open'] : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Открыть меню"
            >
                <span>✦</span>
            </div>

                <nav className={`${cn["navbar-panel"]} ${isOpen ? cn['open'] : ''}`}>
                <div className={cn["navbar-content"]}>
                    <h3 className={cn["menu-title"]}>Меню</h3>
                    <p className={cn["user-greeting"]}>Привет, <strong>{user.username}</strong>!</p>
                    <ul className={cn["nav-links"]}>
                        <li><Link to="/" onClick={() => setIsOpen(false)}>Главная</Link></li>
                        <li><Link to="/prizes" onClick={() => setIsOpen(false)}>Настройка призов</Link></li>
                        <li><Link to="/users" onClick={() => setIsOpen(false)}>Список пользователей</Link></li>
                        <li><Link to="/statistics" onClick={() => setIsOpen(false)}>Статистика</Link></li>
                    </ul>
                    <button onClick={handleLogout} className={cn["logout-btn"]}>
                        Выйти
                    </button>
                </div>
            </nav>

            {isOpen && (
                <div
                    className={cn["navbar-backdrop"]}
                    onClick={() => setIsOpen(false)}
                    aria-label="Закрыть меню"
                />
            )}
        </>
    );
};

export default Navbar;