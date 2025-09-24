import React, { useState } from 'react';

import cn from '../../styles/Wheel/Prizepool.module.css';

const PrizePool = ({ prizes }) => {

    return (
        <div className={cn["sidebar-panel"]}>
            {/* Список всех призов */}
            <div className={cn["prizes-list-panel"]}>
                <h3 className={cn["panel-title"]}>🎯 Все призы</h3>
                <ul className={cn["prizes-list"]}>
                    {prizes.length > 0 ? (
                        prizes.map((prize, index) => (
                            <li key={index} className={cn["prize-item"]}>
                                <span className={cn["prize-icon"]}>🎁</span>
                                <span className={cn["prize-name"]}>{prize}</span>
                            </li>
                        ))
                    ) : (
                        <li className={cn["empty-state"]}>Призы не найдены</li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default PrizePool;