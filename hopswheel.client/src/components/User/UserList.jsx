import React, { useState, useEffect } from 'react';
import userApi from '../../services/userApi';
import UserItem from './UserItem';

const UserList = ({ onEdit }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await userApi.getAll();
            setUsers(data);
        } catch (err) {
            console.error('Ошибка загрузки пользователей:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Загрузка пользователей...</p>;

    return (
        <div>
            <h2>Список пользователей</h2>
            {users.length === 0 ? (
                <p>Пользователи не найдены</p>
            ) : (
                users.map((user) => (
                    <UserItem key={user.id} user={user} onEdit={onEdit} />
                ))
            )}
        </div>
    );
};

export default UserList;