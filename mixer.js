import { useState } from "react";

const ColorMixer = () => {
    const [color1, setColor1] = useState("#000000");
    const [color2, setColor2] = useState("#ffffff");
    const [mixedColor, setMixedColor] = useState("#808080");
    const [copyStatus, setCopyStatus] = useState(null);

    const handleColor1Change = (event) => {
        setColor1(event.target.value);
        mixColors();
    };

    const handleColor2Change = (event) => {
        setColor2(event.target.value);
        mixColors();
    };

    const mixColors = () => {
        const rgb1 = hexToRgb(color1);
        const rgb2 = hexToRgb(color2);

        const mixedRgb = {
            r: Math.floor((rgb1.r + rgb2.r) / 2),
            g: Math.floor((rgb1.g + rgb2.g) / 2),
            b: Math.floor((rgb1.b + rgb2.b) / 2),
        };

        setMixedColor(rgbToHex(mixedRgb.r, mixedRgb.g, mixedRgb.b));
        setCopyStatus(null); // reset the copy status when colors are mixed
    };

    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16),
              }
            : null;
    };

    const rgbToHex = (r, g, b) => {
        return (
            "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
        );
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(mixedColor);
        setCopyStatus("Copied!");
        setTimeout(() => setCopyStatus(null), 2000); // Clear the message after 2 seconds
    };

    return (
        <div>
            <input type="color" value={color1} onChange={handleColor1Change} />
            <input type="color" value={color2} onChange={handleColor2Change} />
            <div
                style={{
                    backgroundColor: mixedColor,
                    width: "100px",
                    height: "100px",
                }}
            />
            {copyStatus ? (
                <p>{copyStatus}</p>
            ) : (
                <button onClick={copyToClipboard}>Copy Mixed Color Code</button>
            )}
        </div>
    );
};

export default ColorMixer;
