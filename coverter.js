import React, { useState } from "react";

function ColorConverter() {
    const [colorInput, setColorInput] = useState("");
    const [colorOutput, setColorOutput] = useState("");
    const [copyStatus, setCopyStatus] = useState("");

    const hexToRgb = (hex) => {
        let r = 0,
            g = 0,
            b = 0;

        if (hex.length === 4) {
            r = "0x" + hex[1] + hex[1];
            g = "0x" + hex[2] + hex[2];
            b = "0x" + hex[3] + hex[3];
        } else if (hex.length === 7) {
            r = "0x" + hex[1] + hex[2];
            g = "0x" + hex[3] + hex[4];
            b = "0x" + hex[5] + hex[6];
        }

        return `rgb(${+r},${+g},${+b})`;
    };

    const rgbToHex = (rgb) => {
        let sep = rgb.indexOf(",") > -1 ? "," : " ";
        rgb = rgb.substr(4).split(")")[0].split(sep);

        let r = (+rgb[0]).toString(16),
            g = (+rgb[1]).toString(16),
            b = (+rgb[2]).toString(16);

        if (r.length === 1) r = "0" + r;
        if (g.length === 1) g = "0" + g;
        if (b.length === 1) b = "0" + b;

        return "#" + r + g + b;
    };

    const handleInputChange = (e) => {
        let input = e.target.value;
        setColorInput(input);
        setCopyStatus("");

        let isRgb = /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/.exec(input);
        let isHex = /^#([0-9a-f]{3}){1,2}$/i.exec(input);

        if (isRgb) {
            setColorOutput(rgbToHex(input));
        } else if (isHex) {
            setColorOutput(hexToRgb(input));
        } else {
            setColorOutput("");
        }
    };

    const copyToClipboard = () => {
        if (colorOutput) {
            navigator.clipboard.writeText(colorOutput);
            setCopyStatus("Color code copied to clipboard");

            // Reset the status after 2 seconds
            setTimeout(() => {
                setCopyStatus("");
            }, 2000);
        }
    };

    return (
        <div>
            <h1>Color Converter</h1>
            <input
                type="text"
                value={colorInput}
                placeholder="Enter hex or rgb color"
                onChange={handleInputChange}
            />
            {colorOutput && (
                <p onClick={copyToClipboard} style={{ cursor: "pointer" }}>
                    {colorOutput} (Click to copy)
                </p>
            )}
            <p>{copyStatus}</p>
        </div>
    );
}

export default ColorConverter;
