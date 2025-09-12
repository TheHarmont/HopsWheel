import React, { useState } from 'react';
import PrizeUpdateForm from '../components/Prize/PrizeUpdateForm';
import PrizeCreateForm from '../components/Prize/PrizeCreateForm';
import PrizeDeleteForm from '../components/Prize/PrizeDeleteForm';
import PrizeList from '../components/Prize/PrizeList';
import "./PrizeListPage.css";

function PrizeListPage() {
    const [activeTab, setActiveTab] = useState('create'); // create или update
    const [currentPrizeId, setCurrentPrizeId] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleSuccess = () => {
        setRefreshKey(prev => prev + 1);

        //При любом успешном действии переводим в состояние create 
        //и очищаем выбранные объект
        if (activeTab === 'update') {
            setActiveTab('create'); 
        }
        setCurrentPrizeId(null);
        setIsDeleteModalOpen(false);
    };

    const handleEditPrize = (prizeId) => {
        setCurrentPrizeId(prizeId);
        setActiveTab('update');
    };

    const handleCancelEdit = () => {
        setCurrentPrizeId(null);
        setActiveTab('create');
    };

    const handleDeletePrize = (prizeId) => {
        setCurrentPrizeId(prizeId);
        setActiveTab('create');
        setIsDeleteModalOpen(true);
    };
    const handleCancelDelete = () => {
        setCurrentPrizeId(null);
        setActiveTab('create');
        setIsDeleteModalOpen(false);
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
                {activeTab === 'create' && <PrizeCreateForm onSuccess={handleSuccess}/>}
                {activeTab === 'update' && currentPrizeId && (
                    <PrizeUpdateForm
                        prizeId={currentPrizeId}
                        onSuccess={handleSuccess}
                        onCancel={handleCancelEdit}
                    />
                )}
                {activeTab === 'update' && !currentPrizeId && (
                    <div className="placeholder-message">
                        <p>Выберите приз из списка для редактирования</p>
                        <div className="owl-icon">🦉</div>
                    </div>
                )}
                {isDeleteModalOpen && currentPrizeId && (
                    <PrizeDeleteForm
                        prizeId={currentPrizeId}
                        onSuccess={handleSuccess}
                        onCancel={handleCancelDelete}
                    />
                )}

                <div className="list-column">
                    <PrizeList key={refreshKey} onEdit={handleEditPrize} onDelete={handleDeletePrize} />
                </div>
            </div>
        </div>
    );
}

export default PrizeListPage;