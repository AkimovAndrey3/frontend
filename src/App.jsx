import { useState } from 'react';

function App() {
    const [text, setText] = useState('');
    const [secondText, setSecondText] = useState('');
    const [data, setData] = useState([]);

    const handleSubmit = async () => {
        if (!text) return; // Пропускаем пустой ввод
        try {
            const response = await fetch('http://127.0.0.1:8000/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });
            const result = await response.json();
            setSecondText(result.message); // Выводим сообщение во второе поле
            setTimeout(() => setSecondText(''), 2000); // Очищаем поле через 2 секунды
            setText(''); // Очищаем первое поле после отправки
        } catch (error) {
            setSecondText('Error: ' + error.message);
            setTimeout(() => setSecondText(''), 2000);
        }
    };

    const handleRead = async () => {
        const response = await fetch('http://127.0.0.1:8000/read');
        const result = await response.json();
        setData(result.data);
        setSecondText(result.message || 'Data loaded successfully!');
        setTimeout(() => setSecondText(''), 2000);
    };

    return (
        <div>
            <h1>Frontend v2.0</h1>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to save"
            />
            <button onClick={handleSubmit}>Send</button>
            <input
                type="text"
                value={data}
                readOnly
                placeholder="Second input (shows messages)"
            />
            <button onClick={handleRead}>Read Data</button>
        </div>
    );
}

export default App;