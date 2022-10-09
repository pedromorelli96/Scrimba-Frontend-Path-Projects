import Dog from "./Dog.js";
import dogsData from "./data.js";

let currentDogIndex = 0;
let currentDog = new Dog(dogsData[currentDogIndex]);
document.getElementById("accept-button").addEventListener("click", yes);
document.getElementById("reject-button").addEventListener("click", no);

render();

function render() {
    document.getElementById("card").innerHTML = currentDog.getDogHtml();
}

function getNewDog() {
    currentDogIndex += 1;
    currentDog = new Dog(dogsData[currentDogIndex]);
    render();
}

function yes() {
    currentDog.setMatchStatus(true);
    getNewDog();
}

function no() {
    currentDog.setMatchStatus(false);
    getNewDog();
}
