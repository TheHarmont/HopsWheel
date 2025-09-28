import React, { useState, useEffect } from 'react';
import wheelApi from '../../services/wheel.service';
import HistoryItem from './HistoryItem';

import cn from '../../styles/Wheel/SpinHistory.module.css';


const SpinHistory = () => {
    const [spinHistory, setSpinHistory] = useState([]);

    useEffect(() => {
        let intervalId;

        const fetchLatestPrizes = async () => {
            try {
                const latestHistory = await wheelApi.getSpinHistory(10);
                if (!Array.isArray(latestHistory)) return;

                const current = spinHistory;
                const newEntries = latestHistory.filter(
                    newEntry => !current.some(oldEntry => oldEntry.id === newEntry.id)
                );

                if (newEntries.length > 0) {
                    const updated = [...newEntries, ...current].slice(0, 10);
                    setSpinHistory(updated);
                }
            } catch (err) {
                console.error('Ошибка при обновлении истории:', err);
            }
        };

        fetchLatestPrizes();
        intervalId = setInterval(fetchLatestPrizes, 10_000);

        return () => clearInterval(intervalId);
    }, [spinHistory]);

    return (
        <div className={cn["sidebar-panel"]}>
            <div className={cn["history-panel"]}>
                <h3 className={cn["panel-title"]}>📜 История вращений</h3>
                <ul className={cn["history-list"]}>
                    {spinHistory.map((spin) => (
                        <HistoryItem key={spin.id} entry={spin} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SpinHistory;