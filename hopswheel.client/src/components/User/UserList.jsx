import React, { useState, useEffect } from 'react';
import userApi from '../../services/user.service';
import UserItem from './UserItem';
import cn from "../../styles/User/List.module.css";

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
            <div className={cn["list-loading"]}>
                <div className={cn["spinner"]}></div>
                <p>Загрузка списка пользователей...</p>
            </div>
        );
    }

    return (
        <div className={cn["user-list-container"]}>
            <h2 className={cn["list-title"]}>📋 Список пользователей</h2>
            <div className={cn["user-filter-container"]}>
                <div className={cn["filter-controls"]}>
                    <input
                        type="text"
                        placeholder="Поиск по имени..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={cn["search-input"]}
                    />
                    <button
                        type="button"
                        onClick={() => setShowInactive(!showInactive)}
                        className={cn["btn-toggle-inactive"]}
                    >
                        {showInactive ? 'Скрыть неактивных' : 'Показать неактивных'}
                    </button>
                </div>
            </div>

            {filteredUsers.length === 0 ? (
                <div className={cn["empty-state"]}>
                    <p>Пользователи не найдены</p>
                    <div className={cn["empty-icon"]}>🦉</div>
                </div>
            ) : (
                    <div className={cn["users-grid-container"]}>
                        <div className={cn["users-grid"]}>
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