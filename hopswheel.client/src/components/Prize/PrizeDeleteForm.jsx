import React, { useState, useEffect } from 'react';
import prizeApi from '../../services/prize.service';
import cn from "../../styles/Prize/DeleteForm.module.css";

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
            <div className={cn["prize-modal-overlay"]}>
                <div className={`${cn["prize-modal"]} ${cn["loading"]}`}>
                    <div className={cn["spinner"]}></div>
                    <p>Загружаем данные приза...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={cn["prize-modal-overlay"]} onClick={onCancel}>
            <div className={cn["prize-modal"]} onClick={(e) => e.stopPropagation()}>
                <div className={cn["modal-header"]}>
                    <h3>🦉 Подтвердите удаление приза</h3>
                    <button className={cn["modal-close"]} onClick={onCancel} aria-label="Закрыть">
                        ✖
                    </button>
                </div>

                <div className={cn["modal-body"]}>
                    {error && (
                        <div className={cn["alert-error"]}>
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    {prize ? (
                        <div className={cn["prize-delete-card"]}>
                            <div className={cn["prize-field"]}>
                    <span className={cn["field-label"]}>Название:</span>
                                <span className={cn["field-value"]}>{prize.name}</span>
                            </div>
                            <div className={cn["prize-field"]}>
                                <span className={cn["field-label"]}>Шанс выпадения:</span>
                                <span className={cn["field-value"]}>{prize.weight}/10</span>
                            </div>
                            <div className={cn["prize-field"]}>
                                <span className={cn["field-label"]}>Статус:</span>
                                <span className={`${cn["field-value"]} ${cn["status"]} ${prize.isActive ? cn['active'] : cn['inactive']}`}>
                                    {prize.isActive ? '🟢 Активен' : '🔴 Неактивен'}
                                </span>
                            </div>
                        </div>
                    ) : (
                            <div className={cn["empty-state"]}>
                            <p>Приз не найден.</p>
                                <div className={cn["owl-icon"]}>🦉</div>
                        </div>
                    )}

                    <div className={cn["confirm-section"]}>
                        <p className={cn["confirm-text"]}>
                            ⚠️ Это действие <strong>нельзя отменить</strong>.<br />
                        </p>
                    </div>
                </div>

                <div className={cn["modal-footer"]}>
                    <button
                        className={cn["btn-cancel"]}
                        onClick={onCancel}
                        disabled={loading}
                    >
                        ← Вернуться
                    </button>
                    <button
                        className={cn["btn-delete"]}
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className={`${cn["spinner"]} ${cn["small"]}`}></div>
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