// prettier-ignore
const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];
// prettier-ignore
const charactersWithoutSymbols = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
// prettier-ignore
const charactersWithoutNumbers = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"]
// prettier-ignore
const justLetters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

let password1El = document.getElementById("password1");
let password2El = document.getElementById("password2");
let passwordSizeEl = document.getElementById("password-size");
let sizeEl = document.getElementById("size");
let symbolsToggleEl = document.getElementById("symbols-toggle");
let numbersToggleEl = document.getElementById("numbers-toggle");

passwordSizeEl.textContent = "Password size: " + sizeEl.value + " characters";

function generatePasswords() {
    let password1 = "";
    let password2 = "";

    if (symbolsToggleEl.checked && numbersToggleEl.checked) {
        for (let i = 0; i < sizeEl.value; i++) {
            password1 +=
                characters[Math.floor(Math.random() * characters.length)];
            password2 +=
                characters[Math.floor(Math.random() * characters.length)];
        }
    } else if (symbolsToggleEl.checked) {
        for (let i = 0; i < sizeEl.value; i++) {
            password1 +=
                charactersWithoutNumbers[
                    Math.floor(Math.random() * charactersWithoutNumbers.length)
                ];
            password2 +=
                charactersWithoutNumbers[
                    Math.floor(Math.random() * charactersWithoutNumbers.length)
                ];
        }
    } else if (numbersToggleEl.checked) {
        for (let i = 0; i < sizeEl.value; i++) {
            password1 +=
                charactersWithoutSymbols[
                    Math.floor(Math.random() * charactersWithoutSymbols.length)
                ];
            password2 +=
                charactersWithoutSymbols[
                    Math.floor(Math.random() * charactersWithoutSymbols.length)
                ];
        }
    } else {
        for (let i = 0; i < sizeEl.value; i++) {
            password1 +=
                justLetters[Math.floor(Math.random() * justLetters.length)];
            password2 +=
                justLetters[Math.floor(Math.random() * justLetters.length)];
        }
    }

    password1El.textContent = password1;
    password2El.textContent = password2;
}

function updateTextInput(value) {
    passwordSizeEl.textContent = "Password size: " + value + " characters";
}

let lastPassword1 = "";
let lastPassword2 = "";

function copyPassword1() {
    if (password1El.textContent === "Copied to clipboard! 📋") {
        password1El.textContent = lastPassword1;
    } else {
        lastPassword1 = password1El.textContent;
        navigator.clipboard.writeText(password1El.textContent);
        password1El.textContent = "Copied to clipboard! 📋";
    }
    // alert("Copied the password: " + password1El.textContent)
}

function copyPassword2() {
    if (password2El.textContent === "Copied to clipboard! 📋") {
        password2El.textContent = lastPassword2;
    } else {
        lastPassword2 = password2El.textContent;
        navigator.clipboard.writeText(password2El.textContent);
        password2El.textContent = "Copied to clipboard! 📋";
    }
    // alert("Copied the password: " + password2El.textContent)
}
