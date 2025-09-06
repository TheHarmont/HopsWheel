import React from 'react';
import "./UserItem.css";

const UserItem = ({ user, onEdit }) => {
    return (
        <div className="user-card">
            <div className="user-info">
                <h4 className="user-name">{user.userName}</h4>
                <div className="user-role">Роль: <span>{user.role === 'barmen' ? 'Бармен' : user.role}</span></div>
                <div className={`user-status ${user.isActive ? 'active' : 'inactive'}`}>
                    {user.isActive ? '🟢 Активен' : '🔴 Неактивен'}
                </div>
            </div>
            <button
                className="btn-edit"
                onClick={() => onEdit(user.id)}
                aria-label={`Редактировать ${user.userName}`}
            >
                ✏️ Редактировать
            </button>
        </div>
    );
};

export default UserItem;