import Dog from "./Dog.js";
import dogsData from "./data.js";

let currentDogIndex = 0;
let currentDog = new Dog(dogsData[currentDogIndex]);
const acceptButton = document.getElementById("accept-button");
const rejectButton = document.getElementById("reject-button");
const restartButton = document.getElementById("restart-button");

acceptButton.addEventListener("click", yes);
rejectButton.addEventListener("click", no);
restartButton.addEventListener("click", restart);

render();

function render() {
    document.getElementById("card").innerHTML = currentDog.getDogHtml();
}

function showBadge() {
    document.getElementById("badge").style.display = "inline";
}

function getNewDog() {
    currentDogIndex += 1;
    if (dogsData[currentDogIndex]) {
        currentDog = new Dog(dogsData[currentDogIndex]);
        render();
    } else {
        noMoreDogs();
    }
}

function noMoreDogs() {
    document.getElementById("card").innerHTML = `
        <div class="no-dogs">
            <h1>🐶⁉</h1>
            <h2>There are no more dogs in your area</h2>
            <p>Click the paw logo to try again</p>
        </div>
    `;
    document.getElementById("actions").classList.add("hide");
}

function yes() {
    if (!currentDog.hasBeenSwiped) {
        currentDog.setMatchStatus(true);
        render();
        showBadge();
        setTimeout(getNewDog, 2000);
    }
}

function no() {
    if (!currentDog.hasBeenSwiped) {
        currentDog.setMatchStatus(false);
        render();
        showBadge();
        setTimeout(getNewDog, 2000);
    }
}

function restart() {
    currentDogIndex = 0;
    currentDog = new Dog(dogsData[currentDogIndex]);
    document.getElementById("actions").classList.remove("hide");
    render();
}
