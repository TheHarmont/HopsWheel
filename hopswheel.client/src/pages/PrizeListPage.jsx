import React, { useState } from 'react';
import PrizeUpdateForm from '../components/Prize/PrizeUpdateForm';
import PrizeCreateForm from '../components/Prize/PrizeCreateForm';
import PrizeList from '../components/Prize/PrizeList';
import "./PrizeListPage.css";

function PrizeListPage() {
    const [activeTab, setActiveTab] = useState('create'); // create или update
    const [currentPrizeId, setCurrentPrizeId] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSuccess = () => {
        setRefreshKey(prev => prev + 1);
        if (activeTab === 'update') {
            setActiveTab('create'); // после успешного обновления — возвращаемся на создание
        }
    };

    const handleEditPrize = (prizeId) => {
        setCurrentPrizeId(prizeId);
        setActiveTab('update');
    };

    const handleCancelUpdate = () => {
        setActiveTab('create');
        setCurrentPrizeId(null);
    };

    return (
        <div className="prize-management-page">
            <h1 className="page-title">Управление призами</h1>

            <div className="tabs">
                <button
                    className={`tab-btn ${activeTab === 'create' ? 'active' : ''}`}
                    onClick={() => setActiveTab('create')}>
                    ➕ Создать
                </button>
                <button
                    className={`tab-btn ${activeTab === 'update' ? 'active' : ''}`}
                    onClick={() => setActiveTab('update')}
                    disabled={!currentPrizeId}
                >
                    ✏️ Изменить
                </button>
            </div>

            <div className="prize-layout">
                {activeTab === 'create' && <PrizeCreateForm onSuccess={handleSuccess} />}
                {activeTab === 'update' && currentPrizeId && (
                    <PrizeUpdateForm
                        prizeId={currentPrizeId}
                        onSuccess={handleSuccess}
                        onCancel={handleCancelUpdate}
                    />
                )}
                {activeTab === 'update' && !currentPrizeId && (
                    <div className="placeholder-message">
                        <p>Выберите приз из списка для редактирования</p>
                        <div className="owl-icon">🦉</div>
                    </div>
                )}

                <div className="list-column">
                    <PrizeList key={refreshKey} onEdit={handleEditPrize} />
                </div>
            </div>
        </div>
    );
}

export default PrizeListPage;