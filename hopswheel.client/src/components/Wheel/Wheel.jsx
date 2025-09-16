import React, { useRef, useEffect, useState } from 'react';
import './Wheel.css';
import wheelApi from '../../services/wheel.service';
import { getCurrentUser } from '../../services/auth.service';

const Wheel = () => {
    const canvasRef = useRef(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState('');
    const [segments, setSegments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showResultModal, setShowResultModal] = useState(false);

    // История и призы
    const [prizes, setPrizes] = useState([]);
    const [spinHistory, setSpinHistory] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(true);

    const spinDuration = 5000;
    const spinAngle = 3600;

    const colors = [
        '#e67e22', // оранжевый (основной)
        '#8b4513', // коричневый (седло)
        '#27ae60', // зелёный (бархат)
        '#c0392b', // бордовый (вино)
        '#f39c12', // янтарный
        '#2c1810', // тёмно-коричневый
        '#a8d5ba', // мягкий зелёный (мох)
        '#d35400', // тыквенный
    ];

    useEffect(() => {
        const fetchPrizes = async () => {
            try {
                const availablePrizes = await wheelApi.getAvailablePrizes();
                if (Array.isArray(availablePrizes) && availablePrizes.length > 0) {
                    setSegments(availablePrizes);
                } else {
                    throw new Error('Некорректные данные призов');
                }

                // Получаем полный список призов
                setPrizes(Array.isArray(availablePrizes) ? availablePrizes : []);

                // Получаем историю
                //const history = await wheelApi.getSpinHistory();
                const history = [];
                setSpinHistory(Array.isArray(history) ? history.slice(0, 10) : []); // последние 10

            } catch (err) {
                console.error('Не удалось загрузить данные:', err);
                setError('Ошибка загрузки данных');
            } finally {
                setLoading(false);
                setHistoryLoading(false);
            }
        };

        fetchPrizes();
    }, []);

    const drawWheel = () => {
        if (segments.length === 0 || loading) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const anglePerSegment = 360 / segments.length;

        for (let i = 0; i < segments.length; i++) {
            const startAngle = ((i * anglePerSegment) + rotation) * (Math.PI / 180);
            const endAngle = ((i + 1) * anglePerSegment + rotation) * (Math.PI / 180);

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();

            ctx.fillStyle = colors[i % colors.length];
            ctx.fill();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(startAngle + (anglePerSegment * Math.PI / 180) / 2);
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 16px Georgia, serif';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = 'rgba(0,0,0,0.7)';
            ctx.shadowBlur = 4;
            ctx.fillText(segments[i], radius - 20, 0);
            ctx.restore();
        }

        ctx.beginPath();
        ctx.arc(centerX, centerY, 25, 0, 2 * Math.PI);
        const gradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 25);
        gradient.addColorStop(0, '#8B4513');
        gradient.addColorStop(1, '#5D2906');
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.save();
        ctx.translate(centerX + radius + 10, centerY);
        ctx.fillStyle = '#e67e22';
        ctx.beginPath();
        ctx.ellipse(0, 0, 12, 18, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(-5, -4, 3, 0, Math.PI * 2);
        ctx.arc(5, -4, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(-5, -4, 1.5, 0, Math.PI * 2);
        ctx.arc(5, -4, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    };

    useEffect(() => {
        if (!loading && segments.length > 0) {
            drawWheel();
        }
    }, [rotation, segments, loading]);

    const startSpinning = async () => {
        if (isSpinning || loading) return;

        setIsSpinning(true);
        setResult('');
        setError('');
        setShowResultModal(false);

        let serverResult;
        let user;
        try {
            user = getCurrentUser();
            serverResult = await wheelApi.performSpin(user.id);

            const prizeName = typeof serverResult === 'object' ? serverResult.prizeName : serverResult;

            if (!segments.includes(prizeName)) {
                throw new Error('Сервер вернул приз, которого нет в списке');
            }

            const winningIndex = segments.indexOf(prizeName);
            const anglePerSegment = 360 / segments.length;
            const targetAngle = 360 - (winningIndex * anglePerSegment);
            const deviationAngle = (anglePerSegment - Math.random() * anglePerSegment);
            const totalRotation = spinAngle + targetAngle;

            const startTimestamp = performance.now();

            const animate = (timestamp) => {
                const elapsed = timestamp - startTimestamp;
                const progress = Math.min(elapsed / spinDuration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentRotation = (easeOut * totalRotation) - deviationAngle;

                setRotation(currentRotation);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    setResult(prizeName);
                    setIsSpinning(false);
                    setTimeout(() => {
                        setShowResultModal(true);
                    }, 500);
                }
            };

            requestAnimationFrame(animate);
        } catch (err) {
            console.error('Ошибка при вращении:', err);
            setError('Не удалось определить выигрыш. Попробуйте снова.');
            setIsSpinning(false);
        }
    };

    const handleAward = () => {
        console.log('Выдать приз:', result);
        setShowResultModal(false);
    };

    const handleCancel = () => {
        console.log('Отмена выдачи приза:', result);
        setShowResultModal(false);
    };

    if (loading) {
        return <div className="wheel-container">Загрузка призов...</div>;
    }

    if (error) {
        return <div className="wheel-container error-state">{error}</div>;
    }

    return (
        <div className="wheel-container">
            <div className="wheel-layout">
                {/* Колесо */}
                <div className="wheel-section">
                    <canvas
                        ref={canvasRef}
                        width="700"
                        height="700"
                        className="wheel-canvas"
                    />

                    <button
                        onClick={startSpinning}
                        disabled={isSpinning}
                        className="spin-button"
                        aria-label="Крутить колесо фортуны"
                    >
                        {isSpinning ? (
                            <>
                                <span className="spinner"></span>
                                Крутится...
                            </>
                        ) : (
                            '🦉 Крутить колесо!'
                        )}
                    </button>

                    {result && !showResultModal && (
                        <div className="result-preview">
                            <p>Приз: <strong>{result}</strong></p>
                        </div>
                    )}

                    {error && <p className="error-message">{error}</p>}
                </div>

                {/* Панель справа */}
                <div className="sidebar-panel">
                    {/* Список всех призов */}
                    <div className="prizes-list-panel">
                        <h3 className="panel-title">🎯 Все призы</h3>
                        <ul className="prizes-list">
                            {prizes.length > 0 ? (
                                prizes.map((prize, index) => (
                                    <li key={index} className="prize-item">
                                        <span className="prize-icon">🎁</span>
                                        <span className="prize-name">{prize}</span>
                                    </li>
                                ))
                            ) : (
                                <li className="empty-state">Призы не найдены</li>
                            )}
                        </ul>
                    </div>

                    {/* История вращений */}
                    <div className="history-panel">
                        <h3 className="panel-title">📜 История вращений</h3>
                        {historyLoading ? (
                            <p className="loading-text">Загрузка истории...</p>
                        ) : spinHistory.length > 0 ? (
                            <ul className="history-list">
                                {spinHistory.map((entry, index) => (
                                    <li key={index} className="history-item">
                                        <div className="history-prize">{entry.prizeName || 'Неизвестно'}</div>
                                        <div className="history-date">
                                            {new Date(entry.timestamp).toLocaleString('ru-RU', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="empty-state">История пуста</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Модальное окно с результатом */}
            {showResultModal && (
                <div className="prize-modal-overlay" onClick={handleCancel}>
                    <div className="prize-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>🎉 Поздравляем!</h2>
                            <button className="modal-close" onClick={handleCancel} aria-label="Закрыть">
                                ✖
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="prize-display">
                                <div className="prize-icon">🎁</div>
                                <h3 className="prize-name">{result}</h3>
                                <p className="prize-description">Вы выиграли этот приз в колесе фортуны!</p>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                className="btn-cancel"
                                onClick={handleCancel}
                            >
                                ← Отменить
                            </button>
                            <button
                                className="btn-award"
                                onClick={handleAward}
                            >
                                🎯 Выдать приз
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wheel;