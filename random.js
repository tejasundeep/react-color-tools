import { useState } from 'react';

const RandomColor = () => {
    const [color, setColor] = useState('#ffffff');
    const [status, setStatus] = useState('');

    const generateRandomColor = () => {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        setColor(randomColor);
        setStatus('');  // clear the status when a new color is generated
    }

    const copyToClipboard = async () => {
        if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(color);
                setStatus('Copied to clipboard!');

                // reset the status after 2 seconds
                setTimeout(() => setStatus(''), 2000);
            } catch (err) {
                setStatus('Failed to copy');
            }
        } else {
            setStatus('Browser does not support clipboard API');
        }
    }

    return (
        <div style={{ backgroundColor: color, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
                <button onClick={generateRandomColor} style={{ fontSize: '20px', padding: '10px 20px' }}>
                    Generate new color
                </button>
                <button onClick={copyToClipboard} style={{ fontSize: '20px', padding: '10px 20px' }}>
                    Copy color
                </button>
            </div>
            <div>
                <h2>{color}</h2>
                <p>{status}</p>
            </div>
        </div>
    );
}

export default RandomColor;
