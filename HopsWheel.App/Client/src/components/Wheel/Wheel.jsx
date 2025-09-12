// Импорт необходимых хуков React
import React, { useRef, useEffect, useState } from 'react';
// Импорт стилей для компонента
import './Wheel.css';
// Импорт функций для работы с API: получение призов и запуск вращения
import wheelApi from '../../services/wheel.service';
import { getCurrentUser } from '../../services/auth.service';

// Основной компонент "Колесо Фортуны"
const Wheel = () => {
    // Ссылка на элемент canvas для прямого доступа к контексту рисования
    const canvasRef = useRef(null);

    // Состояния компонента
    const [isSpinning, setIsSpinning] = useState(false); // Флаг: крутится ли колесо
    const [rotation, setRotation] = useState(0);         // Текущий угол поворота колеса (в градусах)
    const [result, setResult] = useState('');             // Результат вращения (выигранный приз)
    const [segments, setSegments] = useState([]);         // Список призов (секторов колеса)
    const [loading, setLoading] = useState(true);         // Флаг загрузки данных с сервера
    const [error, setError] = useState(false);            // Флаг ошибки при загрузке

    // Константы
    const spinDuration = 5000; // Длительность анимации вращения (в миллисекундах)
    const spinAngle = 3600;    // Минимальный угол вращения (10 полных оборотов)

    // Цвета для секторов колеса (циклически повторяются, если секторов больше 8)
    const colors = [
        '#FF6384', // красный
        '#36A2EB', // синий
        '#FFCE56', // жёлтый
        '#4BC0C0', // бирюзовый
        '#9966FF', // фиолетовый
        '#FF9F40', // оранжевый
        '#8AC24A', // зелёный
        '#E7E7E7', // серый
    ];

    // Эффект: загрузка призов при первом рендере компонента
    useEffect(() => {
        const fetchPrizes = async () => {
            try {
                const prizes = await wheelApi.getAvailablePrizes(); // Запрос к API за списком призов

                // Проверка, что данные корректны (массив и не пустой)
                if (Array.isArray(prizes) && prizes.length > 0) {
                    setSegments(prizes); // Сохраняем призы в состояние
                } else {
                    throw new Error('Некорректные данные призов');
                }
            } catch (err) {
                console.error('Не удалось загрузить призы:', err);
                setError(true); // Устанавливаем флаг ошибки
            } finally {
                setLoading(false); // Завершаем состояние загрузки
            }
        };

        fetchPrizes(); // Запускаем загрузку
    }, []); // Пустой массив зависимостей = выполнение один раз при монтировании

    // Функция отрисовки колеса на canvas
    const drawWheel = () => {
        // Не рисуем, если нет секторов или идёт загрузка
        if (segments.length === 0 || loading) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d'); // Получаем контекст рисования
        const centerX = canvas.width / 2;   // Центр по X
        const centerY = canvas.height / 2;  // Центр по Y
        const radius = Math.min(centerX, centerY) - 10; // Радиус колеса с отступом

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем холст

        const anglePerSegment = 360 / segments.length; // Угол одного сектора

        // Отрисовка каждого сектора
        for (let i = 0; i < segments.length; i++) {
            // Начальный и конечный угол сектора с учётом текущего поворота колеса
            const startAngle = ((i * anglePerSegment) + rotation) * (Math.PI / 180);
            const endAngle = ((i + 1) * anglePerSegment + rotation) * (Math.PI / 180);

            ctx.beginPath();
            ctx.moveTo(centerX, centerY); // Перемещаемся в центр
            ctx.arc(centerX, centerY, radius, startAngle, endAngle); // Рисуем дугу
            ctx.closePath();

            // Заливка и обводка сектора
            ctx.fillStyle = colors[i % colors.length]; // Цвет по циклу
            ctx.fill();
            ctx.strokeStyle = '#fff'; // Белая обводка
            ctx.lineWidth = 2;
            ctx.stroke();

            // Добавление текста внутри сектора
            ctx.save(); // Сохраняем текущее состояние контекста
            ctx.translate(centerX, centerY); // Перемещаем начало координат в центр
            // Поворачиваем на середину сектора
            ctx.rotate(startAngle + (anglePerSegment * Math.PI / 180) / 2);
            ctx.fillStyle = '#fff'; // Белый текст
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'right'; // Текст справа от центра
            ctx.textBaseline = 'middle'; // Вертикально по центру
            ctx.fillText(segments[i], radius - 15, 0); // Рисуем название приза
            ctx.restore(); // Восстанавливаем состояние (без поворота и сдвига)
        }

        // Отрисовка центрального круга (ядро колеса)
        ctx.beginPath();
        ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI);
        ctx.fillStyle = '#333'; // Тёмный цвет
        ctx.fill();

        // Отрисовка указателя (стрелки) справа от колеса
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.moveTo(centerX + radius + 10, centerY); // Кончик стрелки
        ctx.lineTo(centerX + radius - 20, centerY - 10); // Левый угол
        ctx.lineTo(centerX + radius - 20, centerY + 10); // Правый угол
        ctx.closePath();
        ctx.fill();
    };

    // Эффект: перерисовка колеса при изменении rotation, segments или loading
    useEffect(() => {
        if (!loading && segments.length > 0) {
            drawWheel(); // Перерисовываем колесо
        }
    }, [rotation, segments, loading]); // Зависимости: при их изменении — вызов

    // Функция запуска вращения колеса
    const startSpinning = async () => {
        // Блокировка повторного запуска во время вращения или загрузки
        if (isSpinning || loading) return;

        setIsSpinning(true); // Устанавливаем флаг вращения
        setResult('');        // Сбрасываем предыдущий результат
        setError('');         // Сбрасываем ошибку

        let serverResult;
        let user;
        try {
            user = getCurrentUser();
            serverResult = await wheelApi.performSpin(user.id); // Запрос к серверу за результатом

            // Извлечение имени приза (если сервер возвращает объект)
            const prizeName = typeof serverResult === 'object' ? serverResult.prizeName : serverResult;
            console.log('Выигранный приз:', prizeName);

            // Проверка: приз должен быть в списке (защита от несоответствия)
            if (!segments.includes(prizeName)) {
                throw new Error('Сервер вернул приз, которого нет в списке');
            }

            const winningIndex = segments.indexOf(prizeName); // Индекс выигрышного сектора
            const anglePerSegment = 360 / segments.length;    // Угол одного сектора

            // Целевой угол: чтобы выигрышный сектор оказался под указателем
            // Указатель справа → нужен правый край сектора у указателя
            const targetAngle = 360 - (winningIndex * anglePerSegment);

            // Добавляем случайное отклонение внутри сектора (чтобы не всегда в центре)
            const deviationAngle = (anglePerSegment - Math.random() * anglePerSegment);

            // Общий угол вращения: минимум оборотов + попадание в сектор
            const totalRotation = spinAngle + targetAngle;

            // Запуск анимации
            const startTimestamp = performance.now();

            const animate = (timestamp) => {
                const elapsed = timestamp - startTimestamp; // Прошло времени
                const progress = Math.min(elapsed / spinDuration, 1); // Прогресс от 0 до 1
                const easeOut = 1 - Math.pow(1 - progress, 3); // Плавное замедление в конце

                // Текущий угол поворота с плавным изменением
                const currentRotation = (easeOut * totalRotation) - deviationAngle;

                setRotation(currentRotation); // Обновляем состояние

                // Продолжаем анимацию, пока не завершится
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    // Анимация завершена
                    setResult(prizeName);     // Показываем результат
                    setIsSpinning(false);     // Снимаем флаг вращения
                }
            };

            requestAnimationFrame(animate); // Запускаем анимационный цикл
        } catch (err) {
            console.error('Ошибка при вращении:', err);
            setError('Не удалось определить выигрыш. Попробуйте снова.');
            setIsSpinning(false);
        }
    };

    // Отображение состояния загрузки
    if (loading) {
        return <div className="wheel-container">Загрузка призов...</div>;
    }

    // Отображение ошибки (если не удалось загрузить призы)
    if (error) {
        return <div className="wheel-container">Ошибка загрузки призов. Используем стандартные.</div>;
    }

    // Основной JSX: отображение колеса, кнопки и результата
    return (
        <div className="wheel-container">
            {/* Холст для отрисовки колеса */}
            <canvas
                ref={canvasRef}
                width="700"
                height="700"
                className="wheel-canvas"
            />
            {/* Кнопка запуска вращения */}
            <button onClick={startSpinning} disabled={isSpinning} className="spin-button">
                {isSpinning ? 'Крутится...' : 'Крутить!'}
            </button>
            {/* Отображение выигрыша */}
            {result && <p className="result">Вы выиграли: <strong>{result}</strong>!</p>}
            {/* Отображение ошибки (если была) */}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Wheel;