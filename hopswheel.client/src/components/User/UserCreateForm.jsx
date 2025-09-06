import React, { useState, useEffect } from 'react';
import userApi from '../../services/user.service';
import "./UserForm.css"; // используем тот же файл стилей

const UserCreateForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        role: 'barmen',
    });

    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadRoles() {
            try {
                const rolesFromServer = await userApi.getAllRoles();
                setRoles(rolesFromServer);
            } catch (error) {
                setError('Ошибка загрузки ролей');
                console.error('Ошибка загрузки ролей:', error);
            }
        }
        loadRoles();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.password.trim()) {
            setError('Пароль обязателен');
            return;
        }

        const payload = {
            userName: formData.userName.trim(),
            password: formData.password.trim(),
            role: formData.role,
        };

        try {
            setLoading(true);
            await userApi.create(payload);
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.detail || 'Ошибка при создании пользователя');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="user-form">
            <h3 className="form-title">➕ Создать нового пользователя</h3>

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
                <label htmlFor="password">Пароль</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
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

            <button
                type="submit"
                className="btn-submit"
                disabled={loading}
                aria-busy={loading}
            >
                {loading ? (
                    <>
                        <div className="spinner small"></div>
                        <span>Создание...</span>
                    </>
                ) : (
                    'Создать пользователя'
                )}
            </button>
        </form>
    );
};

export default UserCreateForm;