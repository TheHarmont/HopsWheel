import React from 'react';
import cn from "../../styles/Prize/Item.module.css";

const PrizeItem = ({ prize, onEdit, onDelete }) => {
    return (
        <div className={cn["prize-card"]}>
            <div className={cn["prize-info"]}>
                <h4 className={cn["prize-name"]}>{prize.name}</h4>
                <div className={cn["prize-meta"]}>
                    <div className={`${cn["prize-status"]} ${prize.isActive ? cn['active'] : cn['inactive']}`}>
                        {prize.isActive ? '🟢 Активен' : '🔴 Неактивен'}
                    </div>
                    <div className={cn["prize-drop-chance"]}>
                        <span className={cn["label"]}>Шанс падения:</span> <span className={cn["value"]}>{prize.weight}/10</span>
                    </div>
                </div>
            </div>
            <div className={cn["prize-actions"]}>
                <button
                    className={cn["btn-edit"]}
                    onClick={() => onEdit(prize.id)}
                    aria-label={`Редактировать ${prize.name}`}
                >
                    ✏️ Редактировать
                </button>
                <button
                    className={cn["btn-delete"]}
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