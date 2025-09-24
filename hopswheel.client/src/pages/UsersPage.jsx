import React, { useState } from 'react';
import UserCreateForm from '../components/User/UserCreateForm';
import UserUpdateForm from '../components/User/UserUpdateForm';
import UserList from '../components/User/UserList';
import cn from "../styles/User/ListPage.module.css";

function UsersPage() {
    const [activeTab, setActiveTab] = useState('create'); // create или update
    const [currentUserId, setCurrentUserId] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSuccess = () => {
        setRefreshKey(prev => prev + 1);
        if (activeTab === 'update') {
            setActiveTab('create'); // после успешного обновления — возвращаемся на создание
        }
        setCurrentUserId(null);
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
        <div className={cn["user-management-page"]}>
            <h1 className={cn["page-title"]}>Управление пользователями</h1>

            <div className={cn["tabs"]}>
                <button
                    className={`${cn["tab-btn"]} ${activeTab === 'create' ? cn['active'] : ''} `}
                    onClick={() => setActiveTab('create')}
                >
                    ➕ Создать
                </button>
                <button
                    className={`${cn["tab-btn"]} ${activeTab === 'update' ? cn['active'] : ''} `}
                    onClick={() => setActiveTab('update')}
                    disabled={!currentUserId}
                >
                    ✏️ Изменить
                </button>
            </div>

            <div className={cn["user-layout"]}>

                {activeTab === 'create' && <UserCreateForm onSuccess={handleSuccess} />}
                {activeTab === 'update' && currentUserId && (
                    <UserUpdateForm
                        userId={currentUserId}
                        onSuccess={handleSuccess}
                        onCancel={handleCancelUpdate}
                    />
                )}
                {activeTab === 'update' && !currentUserId && (
                    <div className={cn["placeholder-message"]}>
                        <p>Выберите пользователя из списка для редактирования</p>
                        <div className={cn["owl-icon"]}>🦉</div>
                    </div>
                )}


                <div className={cn["list-column"]}>
                    <UserList key={refreshKey} onEdit={handleEditUser} />
                </div>
            </div>
        </div>
    );
}

export default UsersPage;