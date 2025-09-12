import React from 'react';
import "./PrizeItem.css";

const PrizeItem = ({ prize, onEdit, onDelete }) => {
    return (
        <div className="prize-card">
            <div className="prize-info">
                <h4 className="prize-name">{prize.name}</h4>
                <div className="prize-meta">
                    <div className={`prize-status ${prize.isActive ? 'active' : 'inactive'}`}>
                        {prize.isActive ? '🟢 Активен' : '🔴 Неактивен'}
                    </div>
                    <div className="prize-drop-chance">
                        <span className="label">Шанс падения:</span> <span className="value">{prize.weight}/10</span>
                    </div>
                </div>
            </div>
            <div className="prize-actions">
                <button
                    className="btn-edit"
                    onClick={() => onEdit(prize.id)}
                    aria-label={`Редактировать ${prize.name}`}
                >
                    ✏️ Редактировать
                </button>
                <button
                    className="btn-delete"
                    onClick={() => onDelete(prize.id)}
                    aria-label={`Удалить ${prize.name}`}
                >
                    🗑️ Удалить
                </button>
            </div>
        </div>
    );
};

export default PrizeItem;