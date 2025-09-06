import React, { useState, useEffect } from 'react';
import userService from '../../services/user.service';
import UserItem from './UserItem';
import "./UserList.css";

const UserList = ({ onEdit }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await userService.getAll();
            setUsers(data);
        } catch (err) {
            console.error('Ошибка загрузки пользователей:', err);
        } finally {
            setLoading(false);
        }
    };

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
            {users.length === 0 ? (
                <div className="empty-state">
                    <p>Пользователи не найдены</p>
                    <div className="empty-icon">🦉</div>
                </div>
            ) : (
                <div className="users-grid">
                    {users.map((user) => (
                        <UserItem key={user.id} user={user} onEdit={onEdit} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserList;