import { useState } from 'react';

function App() {
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });
            const result = await response.json();
            setMessage(result.message);
            setText(''); // Очистка поля после отправки
        } catch (error) {
            setMessage('Error: ' + error.message);
        }
    };

    return (
        <div>
            <h1>Frontend v1.0</h1>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text"
            />
            <button onClick={handleSubmit}>Send</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default App;