import { useState, useEffect } from 'react';

import cn from '../../styles/Wheel/SpinHistory.module.css';

const HistoryItem = ({ spin }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 10);

        return () => clearTimeout(timer);
    }, []);

    return (
        <li
            className={`${cn["history-item"]} ${isVisible ? cn["visible"] : ''}`}
        >
            <div className={cn["history-prize"]}>{spin.prizeName || 'Неизвестно'}</div>
        </li>
    );
};

export default HistoryItem;
