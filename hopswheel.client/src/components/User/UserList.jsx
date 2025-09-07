import React, { useState, useEffect } from 'react';
import userApi from '../../services/user.service';
import UserItem from './UserItem';
import "./UserList.css";

const UserList = ({ onEdit }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showInactive, setShowInactive] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await userApi.getAll();
            const dataSorted = data.sort((a, b) => a.userName.localeCompare(b.userName));
            setUsers(dataSorted);
        } catch (err) {
            console.error('Ошибка загрузки пользователей:', err);
        } finally {
            setLoading(false);
        }
    };

    // Фильтрация пользователей
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.userName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesActiveFilter = showInactive || user.isActive;
        return matchesSearch && matchesActiveFilter;
    });

    if (loading) {
        return (
            <div className="list-loading">
                <div className="spinner"></div>
                <p>Загрузка списка пользователей...</p>
            </div>
        );
    }

    return (
        <div className="user-list-container">
            <h2 className="list-title">📋 Список пользователей</h2>
            <div className="user-filter-container">
                <div className="filter-controls">
                    <input
                        type="text"
                        placeholder="Поиск по имени..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button
                        type="button"
                        onClick={() => setShowInactive(!showInactive)}
                        className="btn-toggle-inactive"
                    >
                        {showInactive ? 'Скрыть неактивных' : 'Показать неактивных'}
                    </button>
                </div>
            </div>

            {filteredUsers.length === 0 ? (
                <div className="empty-state">
                    <p>Пользователи не найдены</p>
                    <div className="empty-icon">🦉</div>
                </div>
            ) : (
                <div className="users-grid-container">
                    <div className="users-grid">
                        {filteredUsers.map((user) => (
                            <UserItem key={user.id} user={user} onEdit={onEdit} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;