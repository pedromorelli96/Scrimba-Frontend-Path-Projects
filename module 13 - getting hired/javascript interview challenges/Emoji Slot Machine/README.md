```js
/*
   Let's create an emoji slot machine! Replace the hardcoded 
   data with random fruit emojis from an emojis API. 
   
   - Request emoji food data from the API resource below. Log it and look at it!
        - Write a function that takes in the data and returns a new array of only
        fruit emoji objects
        - Write a function to get 9 random fruits from your new array of fruit 
        
   - Load nine random fruits into the slot machine
*/

const slotMachine = document.querySelector(".emoji-slots-game");
const food =
    "https://apis.scrimba.com/emojihub/api/all/category/food-and-drink";

function makeFruitArray(arr) {
    // filter by group prop, looking for a str that includes the word "fruit"
    return arr.filter((emoji) => emoji.group.includes("fruit"));
}

function getRandomFruits(arr) {
    // initialize a new arr to hold 9 random fruits
    const randomFruits = [];
    // create a loop 0 - 9
    for (let i = 0; i < 9; i++) {
        // generate a random num
        // use the random number as an index to choose a random fruit from the fruit arr
        // push the random fruit into new arr
        let randNum = Math.floor(Math.random() * arr.length);
        randomFruits.push(arr[randNum]);
    }
    console.log(randomFruits.length);
    return randomFruits;
}

// write your fetch request here
fetch(food)
    .then((response) => response.json())
    .then((result) => makeFruitArray(result))
    .then((fruits) => getRandomFruits(fruits))
    .then((fruit) => {
        fruit.forEach((fruit) => {
            slotMachine.innerHTML += `
                <li>
                    ${fruit.htmlCode}
                </li>
            `;
        });
    })
    .catch((err) => console.log(err));
```
