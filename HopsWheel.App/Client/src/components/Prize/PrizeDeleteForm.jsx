import React, { useState, useEffect } from 'react';
import prizeApi from '../../services/prize.service';
import "./PrizeDeleteForm.css";

const PrizeDeleteForm = ({ prizeId, onSuccess, onCancel }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [prize, setPrize] = useState(null);

    useEffect(() => {
        if (prizeId) {
            fetchPrize();
        }
    }, [prizeId]);

    const fetchPrize = async () => {
        try {
            setLoading(true);
            const data = await prizeApi.getById(prizeId);
            setPrize(data);
        } catch (err) {
            setError(err.response?.data?.detail || 'Не удалось загрузить приз');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!prizeId) return;

        try {
            setLoading(true);
            await prizeApi.delete(prizeId);
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.detail || 'Ошибка при удалении приза');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !prize) {
        return (
            <div className="prize-modal-overlay">
                <div className="prize-modal loading">
                    <div className="spinner"></div>
                    <p>Загружаем данные приза...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="prize-modal-overlay" onClick={onCancel}>
            <div className="prize-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>🦉 Подтвердите удаление приза</h3>
                    <button className="modal-close" onClick={onCancel} aria-label="Закрыть">
                        ✖
                    </button>
                </div>

                <div className="modal-body">
                    {error && (
                        <div className="alert-error">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    {prize ? (
                        <div className="prize-delete-card">
                            <div className="prize-field">
                                <span className="field-label">Название:</span>
                                <span className="field-value">{prize.name}</span>
                            </div>
                            <div className="prize-field">
                                <span className="field-label">Шанс выпадения:</span>
                                <span className="field-value">{prize.weight}/10</span>
                            </div>
                            <div className="prize-field">
                                <span className="field-label">Статус:</span>
                                <span className={`field-value status ${prize.isActive ? 'active' : 'inactive'}`}>
                                    {prize.isActive ? '🟢 Активен' : '🔴 Неактивен'}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>Приз не найден.</p>
                            <div className="owl-icon">🦉</div>
                        </div>
                    )}

                    <div className="confirm-section">
                        <p className="confirm-text">
                            ⚠️ Это действие <strong>нельзя отменить</strong>.<br />
                        </p>
                    </div>
                </div>

                <div className="modal-footer">
                    <button
                        className="btn-cancel"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        ← Вернуться
                    </button>
                    <button
                        className="btn-delete"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className="spinner small"></div>
                                Удаление...
                            </>
                        ) : (
                            '🔥 Удалить навсегда'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrizeDeleteForm;