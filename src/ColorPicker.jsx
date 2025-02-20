import {useState} from "react";
import Color from "color";

function ColorPicker() {

    const [color, setColor] = useState("#FFFFFF");


    const handleColorChange = (event) => {
        setColor(event.target.value);
    }

    const displayHEX = () => {
        const displayText = `HEX: ${color.toUpperCase()}`;

        return displayText;
    }

    const hexToRGB = (hexColor) => {
        const rbgColor = Color(hexColor).rgb().string().toUpperCase();
        const displayText = `${rbgColor.slice(0, 3)}: ${rbgColor.slice(3)}`;
        return displayText;
    }

    const hexToHSL = (hexColor) => {
        //const hslColor = Color(hexColor).hsl().string().toUpperCase();
        const h = Color(hexColor).hsl().hue();
        const s = Color(hexColor).hsl().saturationl();
        const l = Color(hexColor).hsl().lightness();


        // Format the values: remove decimal places for whole numbers
        const formattedH = formatNumber(h);
        const formattedS = formatNumber(s);
        const formattedL = formatNumber(l); 

        const displayText = `HSL: (${formattedH}, ${formattedS}%, ${formattedL}%)`;

        return displayText;
    }

    const formatNumber = (number) => {
        return Number.isInteger(number) ? number : number.toFixed(2);
    };



    const adaptDisplayTextToBackground = () => {
        return (Color(color).rgb().red() < 230 || Color(color).rgb().green() < 230 || Color(color).rgb().blue() < 230) ? "" : " display-text-dark";
    }


    return (
        <div className="color-picker-container">
            <h1 className="title">Color Picker</h1>
            <div className={"color-display" + adaptDisplayTextToBackground()} style={{backgroundColor: color}}>
                <p>{displayHEX()}</p>
                <p>{hexToRGB(color)}</p>
                <p>{hexToHSL(color)}</p>
            </div>
            <label>Select a color:</label>
            <input type="color" value={color} onChange={handleColorChange} />
        </div>
    );
}

export default ColorPicker