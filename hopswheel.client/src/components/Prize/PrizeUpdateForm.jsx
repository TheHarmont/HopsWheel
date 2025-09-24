import React, { useState, useEffect } from 'react';
import prizeApi from '../../services/prize.service';
import cn from "../../styles/Prize/Form.module.css";

const PrizeUpdateForm = ({ prizeId, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        weight: '',
        isActive: true
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (prizeId) {
            fetchPrize(prizeId);
        }
    }, [prizeId]);

    const fetchPrize = async (id) => {
        try {
            setLoading(true);
            const data = await prizeApi.getById(id);
            setFormData({
                name: data.name,
                weight: data.weight,
                isActive: data.isActive
            });
        } catch (err) {
            setError('Не удалось загрузить приз', err);
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

        if (!formData.name.trim()) {
            setError('Не заполнено название приза');
            return;
        }

        if (formData.weight < 1 || formData.weight > 10) {
            setError('Шанс выпадения должен быть от 1 до 10');
            return;
        }

        const payload = {
            id: prizeId,
            name: formData.name,
            weight: formData.weight,
            isActive: formData.isActive
        };

        try {
            setLoading(true);
            await prizeApi.update(payload);
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.detail || 'Ошибка при обновлении');
            console.error(err);
        } finally {
            setLoading(false);
        }

        if (loading) {
            return (
                <div className={cn["form-loading"]}>
                    <div className={cn["spinner"]}></div>
                    <p>Загрузка данных приза...</p>
                </div>
            );
        }
    };

    return (
        <form onSubmit={handleSubmit} className={cn["prize-form"]}>
            <div className={cn["form-header-with-cancel"]}>
                <h3 className={cn["form-title"]}>✏️ Редактировать приз</h3>
                <button
                    type="button"
                    className={cn["btn-cancel"]}
                    onClick={onCancel}
                    disabled={loading}
                >
                    Отмена
                </button>
            </div>

            {error && (
                <div className={cn["form-error"]}>
                    <span>⚠️</span> {error}
                </div>
            )}

            <div className={cn["form-group"]}>
                <label htmlFor="name">Название</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Введите название..."
                    disabled={loading}
                />
            </div>

            <div className={cn["form-group"]}>
                <label htmlFor="weight">Шанс падения</label>
                <input
                    id="weight"
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                    placeholder="1 - редко, 10 - часто"
                    disabled={loading}
                />
            </div>

            <div className={`${cn["form-group"]} ${cn["form-checkbox"]}`}>
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
                className={cn["btn-submit"]}
                disabled={loading}
                aria-busy={loading}
            >
                {loading ? (
                    <>
                        <div className={`${cn["spinner"]} ${cn["small"]}`}></div>
                        <span>Сохранение...</span>
                    </>
                ) : (
                    'Обновить профиль'
                )}
            </button>
        </form>
    );
};

export default PrizeUpdateForm;