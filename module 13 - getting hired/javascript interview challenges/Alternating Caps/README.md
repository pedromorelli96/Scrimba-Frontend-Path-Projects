```js
/* Alternating Caps 
 Write a function that takes in a string of letters
 and returns a sentence in which every other letter is capitalized.

Example input: "I'm so happy it's Monday"
Example output: "I'M So hApPy iT'S MoNdAy"
*/

function altCaps(str) {
    // assemble each character back into a new string
    let newStr = "";
    // loop through the string
    for (let i = 0; i < str.length; i++) {
        // uppercase every character with an even index
        if (i % 2 === 0) {
            newStr += str[i].toUpperCase();
        } else {
            newStr += str[i];
        }
    }
    return newStr;
}

console.log(altCaps("When you visit Portland you have to go to VooDoo Donuts"));
```
