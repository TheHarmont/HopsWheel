import React, { useState, useEffect } from 'react';
import wheelApi from '../../services/wheel.service';

import cn from '../../styles/Wheel/SpinHistory.module.css';

const SpinHistiry = () => {
    const [spinHistory, setSpinHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrizes = async () => {
            try {
                // Получаем историю
                const history = await wheelApi.getSpinHistory();
                setSpinHistory(Array.isArray(history) ? history : []);

            } catch (err) {
                console.error('Не удалось загрузить историю', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPrizes();
    }, []);

    if (loading) {
        return <div className={cn["wheel-container"]}>Загрузка призов...</div>;
    }

    return (
        <div className={cn["sidebar-panel"]}>
            {/* История вращений */}
            <div className={cn["history-panel"]}>
                <h3 className={cn["panel-title"]}>📜 История вращений</h3>
                {loading ? (
                    <p className={cn["loading-text"]}>Загрузка истории...</p>
                ) : spinHistory.length > 0 ? (
                    <ul className={cn["history-list"]}>
                        {spinHistory.map((entry, index) => (
                            <li key={index} className={cn["history-item"]}>
                                <div className={cn["history-prize"]}>{entry.prizeName || 'Неизвестно'}</div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className={cn["empty-state"]}>История пуста</p>
                )}
            </div>
        </div>
    );
}

export default SpinHistiry;