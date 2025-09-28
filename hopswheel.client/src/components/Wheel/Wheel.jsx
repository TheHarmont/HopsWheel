import React, { useRef, useEffect, useState } from 'react';
import wheelApi from '../../services/wheel.service';
import { getCurrentUser } from '../../services/auth.service';
import PrizePool from './PrizePool';

import cn from '../../styles/Wheel/Wheel.module.css';
import SpinHistiry from './SpinHistory';

const Wheel = () => {
    const canvasRef = useRef(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState({
        spinId: '',
        prizeName: ''
    });
    const [segments, setSegments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showResultModal, setShowResultModal] = useState(false);

    const [prizes, setPrizes] = useState([]);

    const spinDuration = 5000;
    const spinAngle = 3600;

    const colors = [
        '#e67e22',
        '#8b4513',
        '#27ae60',
        '#c0392b',
        '#f39c12',
        '#2c1810',
        '#a8d5ba',
        '#d35400',
    ];

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!showResultModal) return;

        const duration = 5000;
        const interval = 30;
        const step = (interval / duration) * 100;

        const timer = setInterval(() => {
            setProgress(prev => {
                const next = prev + step;
                if (next >= 100) {
                    clearInterval(timer);
                    handleAward(result.spinId);
                    return 0;
                }
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [showResultModal, result.spinId]);

    useEffect(() => {
        const fetchPrizes = async () => {
            try {
                const availablePrizes = await wheelApi.getAvailablePrizes();

                // Получаем полный список призов
                setSegments(availablePrizes);
                setPrizes(availablePrizes);

            } catch (err) {
                console.error('Не удалось загрузить данные:', err);
                setError('Ошибка загрузки данных: ' + err.response.data.detail);
            } finally {
                setLoading(false);
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
            ctx.font = 'bold 1.2rem Georgia, serif';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = 'rgba(0,0,0,1)';
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
        ctx.translate(centerX + radius + 20, centerY);
        ctx.beginPath();
        ctx.moveTo(-40, 0);      // ← ОСТРИЁ (самая левая точка, смотрит влево!)
        ctx.lineTo(40, -25);      // верхний правый угол хвоста
        ctx.lineTo(40, 25);       // нижний правый угол хвоста
        ctx.closePath();
        ctx.fillStyle = '#e67e22';
        ctx.strokeStyle = '#6b4226';
        ctx.lineWidth = 3;
        ctx.fill();
        ctx.stroke();
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
        setResult({
            spinId: '',
            prizeName: ''
        });
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
                    setResult({
                        spinId: serverResult.spinId,
                        prizeName: serverResult.prizeName
                    });
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

    const handleAward = async (id) => {
        await wheelApi.winConfirm(id);
        setShowResultModal(false);
    };

    const handleCancel = () => {
        setShowResultModal(false);
    };

    if (loading) {
        return <div className={cn["wheel-container"]}>Загрузка призов...</div>;
    }

    if (error) {
        return <div className={`${cn["wheel-container"]} ${cn["error-state"]}`}>{error}</div>;
    }

    return (
        <div className={cn["wheel-container"]}>
            <div className={cn["wheel-layout"]}>
                <div className={cn["sidebar-panel"]}>
                    <SpinHistiry />
                </div>

                {/* Колесо */}
                <div className={cn["wheel-section"]}>
                    <canvas
                        ref={canvasRef}
                        width="700"
                        height="700"
                        className={cn["wheel-canvas"]}
                    />

                    <button
                        onClick={startSpinning}
                        disabled={isSpinning}
                        className={cn["spin-button"]}
                        aria-label="Крутить колесо фортуны"
                    >
                        {isSpinning ? (
                            <>
                                <span className={cn["spinner"]}></span>
                                Крутится...
                            </>
                        ) : (
                            '🦉 Крутить колесо!'
                        )}
                    </button>

                    {error && <p className={cn["error-message"]}>{error}</p>}
                </div>

                <div className={cn["sidebar-panel"]}>
                    <PrizePool prizes={prizes} />
                </div>
            </div>

            {/* Модальное окно*/}
            {showResultModal && (
                <div className={cn["prize-modal-overlay"]}>
                    <div className={cn["prize-modal"]} onClick={(e) => e.stopPropagation()}>
                        <div className={cn["modal-header"]}>
                            <h2>🎉 Поздравляем!</h2>
                        </div>

                        <div className={cn["modal-body"]}>
                            <div className={cn["prize-display"]}>
                                <div className={cn["prize-icon"]}>🎁</div>
                                <h3 className={cn["prize-name"]}>{result.prizeName}</h3>
                                <p className={cn["prize-description"]}>Вы выиграли этот приз!</p>
                            </div>
                        </div>

                        <div className={cn["modal-footer"]}>
                            <button
                                className={cn["btn-cancel"]}
                                onClick={handleCancel}
                            >
                                ← Отменить
                            </button>
                            <button
                                className={cn["btn-award"]}
                                onClick={() => handleAward(result.spinId)}
                                disabled={progress >= 100}
                                style={{ position: 'relative', overflow: 'hidden' }}
                            >
                                <span>
                                    🎯 Выдать приз ({Math.ceil(5 - (progress / 100) * 5)}s)
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wheel;