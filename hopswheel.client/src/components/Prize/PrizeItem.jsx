import React from 'react';
import "./PrizeItem.css";

const PrizeItem = ({ prize, onEdit }) => {
    return (
        <div className="prize-card">
            <div className="prize-info">
                <h4 className="prize-name">{prize.name}</h4>
                <div className="prize-meta">
                    <div className={`prize-status ${prize.isActive ? 'active' : 'inactive'}`}>
                        {prize.isActive ? '🟢 Активен' : '🔴 Неактивен'}
                    </div>
                    <div className="prize-drop-chance">
                        <span className="label">Шанс падения:</span> <span className="value">{prize.weight}</span>
                    </div>
                    <div className="prize-drop-count">
                        <span className="label">Количество падений:</span> <span className="value">{prize.maxUses === 0 ? '∞' : prize.maxUses}</span>
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
                    onClick={() => onDelete(prize.id)} // ← добавь обработчик в пропсы
                    aria-label={`Удалить ${prize.name}`}
                >
                    🗑️ Удалить
                </button>
            </div>
        </div>
    );
};

export default PrizeItem;