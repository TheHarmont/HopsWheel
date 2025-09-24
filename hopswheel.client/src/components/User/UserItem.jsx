import React from 'react';
import cn from "../../styles/User/Item.module.css";

const UserItem = ({ user, onEdit }) => {
    return (
        <div className={cn["user-card"]}>
            <div className={cn["user-info"]}>
                <h4 className={cn["user-name"]}>{user.userName}</h4>
                <div className={cn["user-role"]}>Роль: <span>{user.role}</span></div>
                <div className={`${cn["user-status"]} ${user.isActive ? cn['active'] : cn['inactive']}`}>
                    {user.isActive ? '🟢 Активен' : '🔴 Неактивен'}
                </div>
            </div>
            <button
                className={cn["btn-edit"]}
                onClick={() => onEdit(user.id)}
                aria-label={`Редактировать ${user.userName}`}
            >
                ✏️ Редактировать
            </button>
        </div>
    );
};

export default UserItem;