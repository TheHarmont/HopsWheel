import React, { useState, useEffect } from 'react';
import userApi from '../../services/user.service';
import "./UserForm.css";

const UserUpdateForm = ({ userId, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        userName: '',
        role: 'barmen',
        isActive: true,
    });

    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (userId) {
            fetchUser(userId);
        }
    }, [userId]);

    const fetchUser = async (id) => {
        try {
            setLoading(true);
            const data = await userApi.getById(id);
            const rolesFromServer = await userApi.getAllRoles();
            setRoles(rolesFromServer);

            setFormData({
                userName: data.userName,
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
            id: userId,
            userName: formData.userName.trim(),
            role: formData.role,
            isActive: formData.isActive,
        };

        try {
            setLoading(true);
            await userApi.update(payload);
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.detail || 'Ошибка при обновлении');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="form-loading">
                <div className="spinner"></div>
                <p>Загрузка данных пользователя...</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="user-form">
            <div className="form-header-with-cancel">
                <h3 className="form-title">✏️ Редактировать пользователя</h3>
                <button
                    type="button"
                    className="btn-cancel"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Отмена
                </button>
            </div>

            {error && (
                <div className="form-error">
                    <span>⚠️</span> {error}
                </div>
            )}

            <div className="form-group">
                <label htmlFor="userName">Имя пользователя</label>
                <input
                    id="userName"
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                    placeholder="Введите имя..."
                    disabled={loading}
                />
            </div>

            <div className="form-group">
                <label htmlFor="role">Роль</label>
                <select
                    id="role"
                    className="custom-select"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    disabled={loading}
                >
                    {roles.map((role) => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group form-checkbox">
                <label>
                    <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <span>Активен</span>
                </label>
            </div>

            <button
                type="submit"
                className="btn-submit"
                disabled={loading}
                aria-busy={loading}
            >
                {loading ? (
                    <>
                        <div className="spinner small"></div>
                        <span>Сохранение...</span>
                    </>
                ) : (
                    'Обновить профиль'
                )}
            </button>
        </form>
    );
};

export default UserUpdateForm;