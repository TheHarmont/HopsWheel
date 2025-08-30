import React from 'react';

const UserItem = ({ user, onEdit }) => {
    return (
        <div
            style={{
                border: '1px solid #ddd',
                padding: '10px',
                marginBottom: '8px',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <div>
                <strong>{user.userName}</strong> | Роль: {user.role} |{' '}
                <span style={{ color: user.isActive ? 'green' : 'red' }}>
                    {user.isActive ? 'Активен' : 'Неактивен'}
                </span>
            </div>
            <button onClick={() => onEdit(user.id)}>Редактировать</button>
        </div>
    );
};

export default UserItem;