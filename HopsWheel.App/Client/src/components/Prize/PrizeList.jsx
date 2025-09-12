import React, { useState, useEffect } from 'react';
import prizeApi from '../../services/prize.service';
import PrizeItem from './PrizeItem';
import "./PrizeList.css";

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
            <div className="list-loading">
                <div className="spinner"></div>
                <p>Загрузка списка призов...</p>
            </div>
        );
    }

    return (
        <div className="prize-list-container">
            <h2 className="list-title">📋 Список призов</h2>
            <div className="prize-filter-container">
                <div className="filter-controls">
                    <input
                        type="text"
                        placeholder="Поиск по названию..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            {filteredPrizes.length === 0 ? (
                <div className="empty-state">
                    <p>Призы не найдены</p>
                    <div className="empty-icon">🦉</div>
                </div>
            ) : (
                <div className="prizes-grid-container">
                    <div className="prizes-grid">
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