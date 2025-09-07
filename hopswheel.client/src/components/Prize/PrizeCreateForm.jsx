import React, { useState, useEffect } from 'react';
import prizeApi from '../../services/prize.service';
import "./PrizeForm.css";

const PrizeCreateForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        weight: 10,
        maxUses: 0,
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

        if (formData.maxUses < 0) {
            setError('Количество выпадений не может быть отрицательным');
            return;
        }

        const payload = {
            name: formData.name,
            weight: formData.weight,
            maxUses: formData.maxUses,
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
        <form onSubmit={handleSubmit} className="prize-form">
            <h3 className="form-title">➕ Создать приз</h3>
            {error && (
                <div className="form-error">
                    <span>⚠️</span> {error}
                </div>
            )}

            <div className="form-group">
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

            <div className="form-group">
                <label htmlFor="weight">Шанс падения: 1 - редко, 10 - часто</label>
                <input
                    id="weight"
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                    placeholder="Введите значение..."
                    disabled={loading}
                />
            </div>

            <div className="form-group">
                <label htmlFor="maxUses">Количество падений за смену</label>
                <input
                    id="maxUses"
                    type="number"
                    name="maxUses"
                    value={formData.maxUses}
                    onChange={handleChange}
                    required
                    placeholder="Введите значение..."
                    disabled={loading}
                />
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
                    'Создать приз'
                )}
            </button>
        </form>
    );
}

export default PrizeCreateForm;