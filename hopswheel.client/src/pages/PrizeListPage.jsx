import React, { useState } from 'react';
import PrizeForm from '../components/Prize/PrizeForm';
import PrizeList from '../components/Prize/PrizeList';

function PrizeListPage() {
    const [currentUserId, setCurrentUserId] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSuccess = () => {
        setCurrentUserId(null);
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Управление призами</h1>

            {/* Форма создания или редактирования */}
            <PrizeForm userId={currentUserId} onSuccess={handleSuccess} />

            {/* Список пользователей */}
            <PrizeList key={refreshKey} onEdit={setCurrentUserId} />
        </div>
    );
}

export default PrizeListPage;