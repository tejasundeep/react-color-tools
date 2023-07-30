import { useState } from "react";

const ColorPallette = () => {
    const [colors, setColors] = useState([]);

    const generatePalette = () => {
        const generateColor = () => {
            const goldenRatio = 0.618033988749895;
            const hue = Math.random();
            const saturation = 0.5;
            const value = 0.95;

            const h = (hue + goldenRatio) % 1;
            const s = saturation;
            const v = value;

            const rgbColor = hsvToRgb(h, s, v);
            return `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`;
        };

        const randomColors = Array.from({ length: 5 }, () => generateColor());

        setColors(randomColors);
    };

    const hsvToRgb = (h, s, v) => {
        let r, g, b;
        const i = Math.floor(h * 6);
        const f = h * 6 - i;
        const p = v * (1 - s);
        const q = v * (1 - f * s);
        const t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0:
                (r = v), (g = t), (b = p);
                break;
            case 1:
                (r = q), (g = v), (b = p);
                break;
            case 2:
                (r = p), (g = v), (b = t);
                break;
            case 3:
                (r = p), (g = q), (b = v);
                break;
            case 4:
                (r = t), (g = p), (b = v);
                break;
            case 5:
                (r = v), (g = p), (b = q);
                break;
            default:
                break;
        }
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255),
        };
    };

    return (
        <div>
            <button onClick={generatePalette}>Generate Palette</button>
            <div style={{ display: "flex", marginTop: "1rem" }}>
                {colors.map((color, index) => (
                    <div
                        key={index}
                        style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: color,
                            marginRight: "0.5rem",
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default ColorPallette;
