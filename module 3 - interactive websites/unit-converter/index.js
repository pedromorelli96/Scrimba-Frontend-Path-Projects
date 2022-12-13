/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const lengthEl = document.getElementById("length-el");
const volumeEl = document.getElementById("volume-el");
const massEl = document.getElementById("mass-el");

convertBtn.addEventListener("click", function () {
    const value = Number(numberInput.value);
    // prettier-ignore
    lengthEl.textContent = `${value} meters = ${(value * 3.281).toFixed(3)} feet | ${value} feet = ${(value / 3.281).toFixed(3)} meters`
    // prettier-ignore
    volumeEl.textContent = `${value} liters = ${(value * 0.264).toFixed(3)} gallons | ${value} gallons = ${(value / 0.264).toFixed(3)} liters`
    // prettier-ignore
    massEl.textContent = `${value} kilos = ${(value * 2.204).toFixed(3)} pounds | ${value} pounds = ${(value / 2.204).toFixed(3)} kilos`
});
