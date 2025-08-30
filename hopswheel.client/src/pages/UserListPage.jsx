import React, { useState } from 'react';
import UserForm from '../components/User/UserForm';
import UserList from '../components/User/UserList';

function UserListPage() {
    const [currentUserId, setCurrentUserId] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSuccess = () => {
        setCurrentUserId(null);
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Управление пользователями</h1>

            {/* Форма создания или редактирования */}
            <UserForm userId={currentUserId} onSuccess={handleSuccess} />

            {/* Список пользователей */}
            <UserList key={refreshKey} onEdit={setCurrentUserId} />
        </div>
    );
}

export default UserListPage;