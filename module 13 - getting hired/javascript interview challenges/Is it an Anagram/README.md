```js
/* 

Anagrams are groups of words that can be spelled with the same letters. 
For example, the letters in "pea" can be rearrange to spell "ape", and 
the letters in "allergy" can be rearranged to spell "gallery."

Write a function to check if two strings of lowercase letters are anagrams. 
Return true if the word is an anagram. Return false if it isn't. 

Example input: "allergy", "gallery"
Example output: true

Example input: "rainbow", "crossbow"
Example output: false

save - vase 

save - aesv
vase - aesv

aesv === aesv? ANAGRAM!

*/

function isAnagram(str1, str2) {
    // are the strings the same length? if yes return false.
    if (str1.length !== str2.length) return false;

    // split string into an array
    // sort
    // join the array back together as a string
    const newStr1 = str1.split("").sort().join("");

    // repeat with second word
    const newStr2 = str2.split("").sort().join("");

    // are the two words equal? true or false
    return newStr1 === newStr2;
}

//console.log(isAnagram("allergy", "gallery"));
console.log(isAnagram("inch", "chin"));
console.log(isAnagram("night", "thing"));
//console.log(isAnagram("treasure", "measure"));
```
