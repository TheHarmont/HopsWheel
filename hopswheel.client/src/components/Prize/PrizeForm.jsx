import React, { useState, useEffect } from 'react';
import prizeApi from '../../services/prize.service';

const PrizeForm = ({ prizeId, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        weight: 10,
        maxUses: 0,
        isActive: true,
    });

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (prizeId) {
            setIsEditing(true);
            fetchUser(prizeId);
        }
    }, [prizeId]);

    const fetchUser = async (id) => {
        try {
            setLoading(true);
            const data = await prizeApi.getById(id);
            setFormData({
                name: data.name,
                weight: data.weight,
                maxUses: data.maxUses,
                isActive: data.isActive,
            });
        } catch (err) {
            setError('Не удалось загрузить приз');
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
            name: formData.name,
            weight: formData.weight,
            maxUses: formData.maxUses,
            isActive: formData.isActive,
        };

        try {
            setLoading(true);
            if (isEditing) {
                // При обновлении добавляем Id
                await prizeApi.update({ ...payload, id: prizeId });
            } else {
                await prizeApi.create(payload);
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
            <h3>{isEditing ? 'Редактировать приз' : 'Создать приз'}</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{ marginBottom: '10px' }}>
                <label>
                    Название:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ marginLeft: '10px' }}
                    />
                </label>
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>
                    Название:
                    <input
                        type="text"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        required
                        style={{ marginLeft: '10px' }}
                    />
                </label>
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>
                    Название:
                    <input
                        type="text"
                        name="maxUses"
                        value={formData.maxUses}
                        onChange={handleChange}
                        required
                        style={{ marginLeft: '10px' }}
                    />
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

export default PrizeForm;