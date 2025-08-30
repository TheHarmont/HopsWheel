import React, { useState, useEffect } from 'react';
import userApi from '../../services/userApi';

const UserForm = ({ userId, onSuccess }) => {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        role: 'barmen', // значение по умолчанию
        isActive: true,
    });

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (userId) {
            setIsEditing(true);
            fetchUser(userId);
        }
    }, [userId]);

    const fetchUser = async (id) => {
        try {
            setLoading(true);
            const data = await userApi.getById(id);
            setFormData({
                userName: data.userName,
                password: '', // пароль не возвращается при GET
                role: data.role,
                isActive: data.isActive,
            });
        } catch (err) {
            setError('Не удалось загрузить пользователя');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const payload = {
            userName: formData.userName,
            password: formData.password,
            role: formData.role,
        };

        try {
            setLoading(true);
            if (isEditing) {
                // При обновлении добавляем Id
                await userApi.update({ ...payload, id: userId });
            } else {
                await userApi.create(payload);
            }
            onSuccess(); // Успешно — обновить список
        } catch (err) {
            setError(err.response.data.detail);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditing) return <p>Загрузка...</p>;

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
            <h3>{isEditing ? 'Редактировать пользователя' : 'Создать пользователя'}</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{ marginBottom: '10px' }}>
                <label>
                    Имя пользователя:
                    <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                        style={{ marginLeft: '10px' }}
                    />
                </label>
            </div>

            {!isEditing && (
                <div style={{ marginBottom: '10px' }}>
                    <label>
                        Пароль:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required={!isEditing}
                            style={{ marginLeft: '10px' }}
                        />
                    </label>
                </div>
            )}

            <div style={{ marginBottom: '10px' }}>
                <label>
                    Роль:
                    <select name="role" value={formData.role} onChange={handleChange} style={{ marginLeft: '10px' }}>
                        <option value="barmen">Barmen</option>
                    </select>
                </label>
            </div>

            {isEditing && (
                <div style={{ marginBottom: '10px' }}>
                    <label>
                        Активен:
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleChange}
                            style={{ marginLeft: '10px' }}
                        />
                    </label>
                </div>
            )}

            <button type="submit" disabled={loading}>
                {loading ? 'Сохранение...' : isEditing ? 'Обновить' : 'Создать'}
            </button>
        </form>
    );
};

export default UserForm;