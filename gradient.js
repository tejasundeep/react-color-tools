import { useState } from "react";

export default function ColorGradient() {
    const [color1, setColor1] = useState("#ff0000");
    const [color2, setColor2] = useState("#00ff00");
    const [degree, setDegree] = useState(0);

    const handleColor1Change = (event) => {
        setColor1(event.target.value);
    };

    const handleColor2Change = (event) => {
        setColor2(event.target.value);
    };

    const handleDegreeChange = (event) => {
        setDegree(event.target.value);
    };

    const gradientStyle = {
        height: "100vh",
        backgroundImage: `linear-gradient(${degree}deg, ${color1}, ${color2})`,
    };

    return (
        <div style={gradientStyle}>
            <input type="color" value={color1} onChange={handleColor1Change} />
            <input type="color" value={color2} onChange={handleColor2Change} />
            <input
                type="range"
                min="0"
                max="360"
                value={degree}
                onChange={handleDegreeChange}
            />
        </div>
    );
}
