```js
import podcasts from "./data.js";

/* Night at the Scrimbies 

It's time for the Scrimbies, a prestigious award show for podcast hosts.
We need to assemble a list of podcast hosts so we can start handing out awards. 

Write a function that takes in the podcast data and
returns a flat array of podcast hosts. There are quite a few ways to approach
this, but try solving the problem using reduce(). 

Once you have a flat array of hosts, write a second function to randomly assign each host a prize
from the awards array. 

Example output: ["🏆 Alex Booker", "⭐ Bob Smith", "💎 Camilla Lambert" ...] 

*/
const awards = ["🏆", "⭐", "💎", "🥇", "👑"];

function getHosts(data) {
    // reduce the podcasts data down to a list of hosts
    return data.reduce((acc, curr) => {
        // add curr.hosts to the acc array
        return acc.concat(curr.hosts);
        // or
        // return [...acc, ...curr.hosts]
    }, []);
}

function assignAwards(data) {
    // use getHosts() to get a flat array of podcasts hosts
    const hosts = getHosts(data);
    // map through my array of hosts. for each:
    return hosts.map((host) => {
        // use Math.random to generate a rand num between 0 and length of award arr
        const randIndex = Math.floor(Math.random() * awards.length);
        // use the rand num to access a random award index
        // use string literal to concast a random award to each host
        return `${awards[randIndex]} ${host}`;
    });
}

//console.log(getHosts(podcasts));
console.log(assignAwards(podcasts));
```
