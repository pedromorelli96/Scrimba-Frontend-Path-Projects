```js
import mediaData from "./data.js";

/* Find All Unique Tags 

As a software dev at ScrimFlix, you're working on a feature 
to let users browse TV shows by tag. The first step is to collect all 
the tags from our data into a new array. Then we'll need 
to filter out the duplicate tags. 

Write a function that takes in the media data and returns
a flat array of unique tags.

Expected output: 
["supernatural", "horror", "drama",
"fantasy", "reality", "home improvement", "comedy", "sci-fi", "adventure"]

*/

function getUniqueTags(data) {
    const tags = data.map((podcast) => podcast.tags).flat();
    const uniqueTags = {};

    // filter tags arr
    return tags.filter((tag) => {
        // look up the tag in the uniqueTags obj
        if (!uniqueTags[tag]) {
            uniqueTags[tag] = true;
            // if it's not the, we have a unique item
            // put the item in our object with a value of true
            return true;
        }
        return false;
    });
}

console.log(getUniqueTags(mediaData));
```
