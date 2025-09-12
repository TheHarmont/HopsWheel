import React, { useState } from 'react';
import UserCreateForm from '../components/User/UserCreateForm';
import UserUpdateForm from '../components/User/UserUpdateForm';
import UserList from '../components/User/UserList';
import "./UserListPage.css";

function UserListPage() {
    const [activeTab, setActiveTab] = useState('create'); // create или update
    const [currentUserId, setCurrentUserId] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSuccess = () => {
        setRefreshKey(prev => prev + 1);
        if (activeTab === 'update') {
            setActiveTab('create'); // после успешного обновления — возвращаемся на создание
        }
    };

    const handleEditUser = (userId) => {
        setCurrentUserId(userId);
        setActiveTab('update');
    };

    const handleCancelUpdate = () => {
        setActiveTab('create');
        setCurrentUserId(null);
    };

    return (
        <div className="user-management-page">
            <h1 className="page-title">Управление пользователями</h1>

            <div className="tabs">
                <button
                    className={`tab-btn ${activeTab === 'create' ? 'active' : ''}`}
                    onClick={() => setActiveTab('create')}
                >
                    ➕ Создать
                </button>
                <button
                    className={`tab-btn ${activeTab === 'update' ? 'active' : ''}`}
                    onClick={() => setActiveTab('update')}
                    disabled={!currentUserId}
                >
                    ✏️ Изменить
                </button>
            </div>

            <div className="user-layout">

                {activeTab === 'create' && <UserCreateForm onSuccess={handleSuccess} />}
                {activeTab === 'update' && currentUserId && (
                    <UserUpdateForm
                        userId={currentUserId}
                        onSuccess={handleSuccess}
                        onCancel={handleCancelUpdate}
                    />
                )}
                {activeTab === 'update' && !currentUserId && (
                    <div className="placeholder-message">
                        <p>Выберите пользователя из списка для редактирования</p>
                        <div className="owl-icon">🦉</div>
                    </div>
                )}


                <div className="list-column">
                    <UserList key={refreshKey} onEdit={handleEditUser} />
                </div>
            </div>
        </div>
    );
}

export default UserListPage;