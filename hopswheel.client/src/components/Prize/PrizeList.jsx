import React, { useState, useEffect } from 'react';
import prizeApi from '../../services/prize.service';
import PrizeItem from './PrizeItem';
import cn from "../../styles/Prize/List.module.css";

const PrizeList = ({ onEdit , onDelete}) => {
    const [prizes, setPrizes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPrizes();
    }, []);

    const fetchPrizes = async () => {
        try {
            setLoading(true);
            const data = await prizeApi.getAll();
            const dataSorted = data.sort((a, b) => a.name.localeCompare(b.name))
            setPrizes(dataSorted);
        } catch (err) {
            console.error('Ошибка загрузки призов:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredPrizes = prizes.filter(prize => {
        const matchesSearch = prize.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    if (loading) {
        return (
            <div className={cn["list-loading"]}>
                <div className={cn["spinner"]}></div>
                <p>Загрузка списка призов...</p>
            </div>
        );
    }

    return (
        <div className={cn["prize-list-container"]}>
            <h2 className={cn["list-title"]}>📋 Список призов</h2>
            <div className={cn["prize-filter-container"]}>
                <div className={cn["filter-controls"]}>
                    <input
                        type="text"
                        placeholder="Поиск по названию..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={cn["search-input"]}
                    />
                </div>
            </div>

            {filteredPrizes.length === 0 ? (
                <div className={cn["empty-state"]}>
                    <p>Призы не найдены</p>
                    <div className={cn["empty-icon"]}>🦉</div>
                </div>
            ) : (
                    <div className={cn["prizes-grid-container"]}>
                        <div className={cn["prizes-grid"]}>
                        {filteredPrizes.map((prize) => (
                            <PrizeItem key={prize.id} prize={prize} onEdit={onEdit} onDelete={onDelete} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PrizeList;