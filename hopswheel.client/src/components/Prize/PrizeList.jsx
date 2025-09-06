import React, { useState, useEffect } from 'react';
import prizeService from '../../services/prize.service';
import PrizeItem from './PrizeItem';

const PrizeList = ({ onEdit }) => {
    const [prizes, setPrizes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await prizeService.getAll();
            setPrizes(data);
        } catch (err) {
            console.error('Ошибка загрузки призов:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Загрузка пользователей...</p>;

    return (
        <div>
            <h2>Список призов</h2>
            {prizes.length === 0 ? (
                <p>Призы не найдены</p>
            ) : (
                prizes.map((prize) => (
                    <PrizeItem key={prize.id} prize={prize} onEdit={onEdit} />
                ))
            )}
        </div>
    );
};

export default PrizeList;