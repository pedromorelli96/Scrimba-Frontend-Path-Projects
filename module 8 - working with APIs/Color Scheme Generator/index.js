import { schemeModes } from "./api.js";

let colorsArray = [];

const colors = document.getElementById("colors");
const colorInput = document.getElementById("color-input");
const modeSelect = document.getElementById("mode-select");
const backgroundColors = document.getElementById("background-colors");
const colorsHex = document.getElementById("colors-hex");

const baseUrl = "https://www.thecolorapi.com";
const endpoint = "/scheme";

function setModeOptions() {
    schemeModes.forEach((mode) => {
        const option = document.createElement("option");
        option.value = mode;
        option.text = mode;
        modeSelect.add(option);
    });
}

function getColorScheme() {
    const hex = colorInput.value.slice(1).toUpperCase();
    const mode = modeSelect.value;
    const query = `?hex=${hex}&mode=${mode}`;

    fetch(baseUrl + endpoint + query)
        .then((response) => response.json())
        .then((data) => {
            // data.colors[0...4].hex.value
            data.colors.forEach((color) => colorsArray.push(color.hex.value));
            renderColorScheme();
        });
}

function renderColorScheme() {
    let backgroundColorsHtml = ``;
    let colorsHexHtml = ``;

    colorsArray.forEach((colorHex) => {
        backgroundColorsHtml += `
            <div
                style="background-color:${colorHex}"
                data-bgcolor="${colorHex}"
            ></div>
        `;

        colorsHexHtml += `
            <p 
                data-bgcolor="${colorHex}"
            >${colorHex}</p>`;
    });

    backgroundColors.innerHTML = backgroundColorsHtml;
    colorsHex.innerHTML = colorsHexHtml;
    colorsArray = [];
}

setModeOptions();

document.addEventListener("submit", function (e) {
    e.preventDefault();
    getColorScheme();
});

colors.addEventListener("click", function (e) {
    if (e.target.dataset.bgcolor) {
        navigator.clipboard.writeText(e.target.dataset.bgcolor);
        e.target.textContent = "Copied!";

        if (e.target.parentElement.id === "background-colors") {
            setTimeout(() => {
                e.target.textContent = "";
            }, 1000);
        } else {
            setTimeout(() => {
                e.target.textContent = e.target.dataset.bgcolor;
            }, 1000);
        }
    }
});
