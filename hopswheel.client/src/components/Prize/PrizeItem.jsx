import React from 'react';

const PrizeItem = ({ prize, onEdit }) => {
    return (
        <div
            style={{
                border: '1px solid #ddd',
                padding: '10px',
                marginBottom: '8px',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <div>
                <strong>{prize.name}</strong> |{' '}
                <span style={{ color: prize.isActive ? 'green' : 'red' }}>
                    {prize.isActive ? 'Активен' : 'Неактивен'}
                </span>
                <p>{prize.weight}</p>
                <p>{prize.maxUses}</p>
            </div>
            <button onClick={() => onEdit(prize.id)}>Редактировать</button>
        </div>
    );
};

export default PrizeItem;