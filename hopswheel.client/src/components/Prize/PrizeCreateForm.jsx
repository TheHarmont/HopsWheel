import React, { useState, useEffect } from 'react';
import prizeApi from '../../services/prize.service';
import cn from "../../styles/Prize/Form.module.css";

const PrizeCreateForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        weight: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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

        if (!formData.name.trim()) {
            setError('Не заполнено название приза');
            return;
        }

        if (formData.weight < 1 || formData.weight > 10) {
            setError('Шанс выпадения должен быть от 1 до 10');
            return;
        }

        const payload = {
            name: formData.name,
            weight: formData.weight,
        };

        try {
            setLoading(true);
            await prizeApi.create(payload);
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.detail || 'Ошибка при создании приза');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={cn["prize-form"]}>
            <h3 className={cn["form-title"]}>➕ Создать приз</h3>
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

            <button
                type="submit"
                className={cn["btn-submit"]}
                disabled={loading}
                aria-busy={loading}
            >
                {loading ? (
                    <>
                        <div className={cn["spinner small"]}></div>
                        <span>Создание...</span>
                    </>
                ) : (
                    'Создать приз'
                )}
            </button>
        </form>
    );
}

export default PrizeCreateForm;