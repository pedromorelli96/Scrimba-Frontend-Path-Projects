```js
/* Find anagrams in an array   

When two words have the exact same letters, they are anagrams. 

Each item in the anagrams array is an anagram of a Scrimba teacher's
first and last name, plus the phrase "Scrimba teacher". 

Write a function to determine which strings in the array are 
anagrams of "Bob Ziroll Scrimba Teacher".

Your function should take two parameters: the phrase you want to compare to
the anagrams, and an array of anagrams. The function should return
a new array of anagrams that match the phrase. 

Example input: treat, ["tater", "tree", "teart", "tetra", "heart", "hamster"]
Example output: ["tater", "teart", "tetra"]

Bonus: What other teachers are represented in these anagrams? 
 */

const anagrams = [
    "moz biblical torchbearers",
    "it's razorbill beachcomber",
    "och mcrobbie trailblazers",
    "bib chorizo cellarmaster",
    "thor scribble carbimazole",
    "zilla borscht abercrombie",
    "brazil scorcher batmobile",
    "dame shelburne characterizing",
    "uber englishman characterized",
    "agnes rhumbline characterized",
    "rehab scrutinized charlemagne",
    "dreams zurich interchangeable",
    "bam hamster technocratic",
    "mechatronic masterbatch",
    "bam ratchet mechatronics",
];

function sortPhrase(phrase) {
    return phrase.toLowerCase().split("").sort().join("").trim();
}

function isAnagramInArray(anagram, arr) {
    // use .filter()
    // use sortPhrase() to sort both the input phrase and the current phrase in the array
    // compare the two words to return true or false
    return arr.filter((item) => {
        const word1 = sortPhrase(anagram);
        const word2 = sortPhrase(item);

        return word1 === word2;
    });
}

console.log(isAnagramInArray("Tom Chant Scrimba Teacher", anagrams));
//console.log(isAnagramInArray("treat", ["tater", "tree", "teart", "tetra", "heart", "hamster"]))
```
