```js
import products from "./data.js";

/*
    You're online shopping for holiday gifts, but money is tight
    so we need to look at the cheapest items first. 
    Use the built in sort() method to write a function that returns a new array of
    products sorted by price, cheapest to most expensive. 
    
    Then log the item and the price to the console: 
    
    💕,0
    🍬,0.89
    🍫,0.99
    🧁,0.99
    📚,0.99
    ... continued
*/

/* 

positive num - a before b 
neg - b before a 
0 - nothing changes 

*/

/*
a - b sorts numbers in ascending order and 
b - a sorts numbers in descending order 
*/

function sortProducts(data) {
    return data.sort((a, b) => {
        return a.price - b.price;
    });
}

const listByCheapest = sortProducts(products);
// console.log(listByCheapest);

listByCheapest.forEach((item) => console.log(item.product, item.price));
```
