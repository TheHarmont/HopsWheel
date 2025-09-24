import React, { useState } from 'react';
import PrizeUpdateForm from '../components/Prize/PrizeUpdateForm';
import PrizeCreateForm from '../components/Prize/PrizeCreateForm';
import PrizeDeleteForm from '../components/Prize/PrizeDeleteForm';
import PrizeList from '../components/Prize/PrizeList';
import cn from "../styles/Prize/ListPage.module.css";

function PrizesPage() {
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
        <div className={cn["prize-management-page"]}>
            <h1 className={cn["page-title"]}>Управление призами</h1>

            <div className={cn["tabs"]}>
                <button
                    className={`${cn["tab-btn"]} ${activeTab === 'create' ? cn['active'] : ''}`}
                    onClick={() => setActiveTab('create')}>
                    ➕ Создать
                </button>
                <button
                    className={`${cn["tab-btn"]} ${activeTab === 'update' ? cn['active'] : ''}`}
                    onClick={() => setActiveTab('update')}
                    disabled={!currentPrizeId}
                >
                    ✏️ Изменить
                </button>
            </div>

            <div className={cn["prize-layout"]}>
                {activeTab === 'create' && <PrizeCreateForm onSuccess={handleSuccess}/>}
                {activeTab === 'update' && currentPrizeId && (
                    <PrizeUpdateForm
                        prizeId={currentPrizeId}
                        onSuccess={handleSuccess}
                        onCancel={handleCancelEdit}
                    />
                )}
                {activeTab === 'update' && !currentPrizeId && (
                    <div className={cn["placeholder-message"]}>
                        <p>Выберите приз из списка для редактирования</p>
                        <div className={cn["owl-icon"]}>🦉</div>
                    </div>
                )}
                {isDeleteModalOpen && currentPrizeId && (
                    <PrizeDeleteForm
                        prizeId={currentPrizeId}
                        onSuccess={handleSuccess}
                        onCancel={handleCancelDelete}
                    />
                )}

                <div className={cn["list-column"]}>
                    <PrizeList key={refreshKey} onEdit={handleEditPrize} onDelete={handleDeletePrize} />
                </div>
            </div>
        </div>
    );
}

export default PrizesPage;