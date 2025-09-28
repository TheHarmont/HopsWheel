import React, { useState } from 'react';

import cn from '../../styles/Wheel/PrizePool.module.css';

const PrizePool = ({ prizes }) => {
    // Если призов мало — просто покажем их без анимации
    const shouldAnimate = prizes.length > 5; // или другое пороговое значение

    return (
        <div className={cn["sidebar-panel"]}>
            <div className={cn["prizes-list-panel"]}>
                <h3 className={cn["panel-title"]}>🎯 Все призы</h3>

                {prizes.length === 0 ? (
                    <div className={cn["empty-state"]}>Призы не найдены</div>
                ) : shouldAnimate ? (
                    <div className={cn["prizes-list-container"]}>
                        <div className={cn["prizes-list-scroll"]}>
                            {/* Первый клон */}
                            {prizes.map((prize, index) => (
                                <div key={`first-${index}`} className={cn["prize-item"]}>
                                    <span className={cn["prize-icon"]}>🎁</span>
                                    <span className={cn["prize-name"]}>{prize}</span>
                                </div>
                            ))}
                            {/* Второй клон — для зацикливания */}
                            {prizes.map((prize, index) => (
                                <div key={`second-${index}`} className={cn["prize-item"]}>
                                    <span className={cn["prize-icon"]}>🎁</span>
                                    <span className={cn["prize-name"]}>{prize}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    // Статический список, если призов мало
                    <ul className={cn["prizes-list"]}>
                        {prizes.map((prize, index) => (
                            <li key={index} className={cn["prize-item"]}>
                                <span className={cn["prize-icon"]}>🎁</span>
                                <span className={cn["prize-name"]}>{prize}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default PrizePool;