import { useState, useEffect } from "react";

function convertHexToShadedRgba(hexColor, opacity = 1, numberOfShades = 10) {
    let rgbaColor = convertHexToRgba(hexColor, opacity);
    let shadesArray = [];

    if (rgbaColor) {
        for (let i = 0; i < numberOfShades; i++) {
            let adjustedRgbaColor = rgbaColor.map((colorValue, index) =>
                index < 3 ? Math.floor(colorValue * ((i + 1) / numberOfShades)) : colorValue
            );
            shadesArray.push(convertRgbaToCssString(adjustedRgbaColor));
        }
    }

    return shadesArray;
}

function convertHexToRgba(hexColor, opacity = 1) {
    let rgbColor = convertHexToRgb(hexColor);
    return rgbColor ? [...rgbColor, opacity] : null;
}

function convertHexToRgb(hexColor) {
    let rgbComponents = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
    return rgbComponents
        ? [
              parseInt(rgbComponents[1], 16),
              parseInt(rgbComponents[2], 16),
              parseInt(rgbComponents[3], 16),
          ]
        : null;
}

function convertRgbaToCssString(rgbaColor) {
    return `rgba(${rgbaColor.join(",")})`;
}

export default function ColorShadesGenerator() {
    const [selectedColor, setSelectedColor] = useState({ hex: "#663399", alpha: 1 }); // Default color
    const [colorShades, setColorShades] = useState([]);
    const [hoveredShadeIndex, setHoveredShadeIndex] = useState(null);
    const [copiedShadeColor, setCopiedShadeColor] = useState(null);

    useEffect(() => {
        if (/^#[0-9A-F]{6}$/i.test(selectedColor.hex)) {
            setColorShades(convertHexToShadedRgba(selectedColor.hex, selectedColor.alpha));
        }
    }, [selectedColor]);

    const copyShadeToClipboard = (shadeColor) => {
        navigator.clipboard.writeText(shadeColor);
        setCopiedShadeColor(shadeColor);
        setTimeout(() => setCopiedShadeColor(null), 2000); // Reset copiedColor after 2 seconds
    };

    return (
        <div>
            <h1>Color Shades Generator</h1>

            <input
                type="color"
                value={selectedColor.hex}
                onChange={(event) =>
                    setSelectedColor((prevColor) => ({
                        ...prevColor,
                        hex: event.target.value,
                    }))
                }
            />

            <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={selectedColor.alpha}
                onChange={(event) =>
                    setSelectedColor((prevColor) => ({
                        ...prevColor,
                        alpha: parseFloat(event.target.value),
                    }))
                }
            />

            <div>
                {colorShades.map((shade, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: shade,
                            padding: "10px",
                            margin: "10px",
                            position: "relative",
                        }}
                        onMouseEnter={() => setHoveredShadeIndex(index)}
                        onMouseLeave={() => setHoveredShadeIndex(null)}
                    >
                        {shade}
                        {hoveredShadeIndex === index && (
                            <button
                                style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                }}
                                onClick={() => copyShadeToClipboard(shade)}
                            >
                                {copiedShadeColor === shade ? "Copied!" : "Copy"}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
