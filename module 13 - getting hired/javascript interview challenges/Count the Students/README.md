```js
/*
Alex from Scrimba wants to know how many new students have attended 
Scrimba's weekly Town Hall event this year. 

He has an array of first-time attendees for each month of the year. 
Help him find the total number of attendees! Your function should
take in an array and return a number representing the total number
of new attendees. 

Example input: [1,2,3]
Example output: 6
 */

const studentCount = [50, 53, 61, 67, 60, 70, 78, 80, 80, 81, 90, 110];

function sumArray(arr) {
    // initialize a new variable to hold the sum of the arr
    let sum = 0;
    // loop through the studentCount arr, add each value to the sum
    arr.forEach((item) => (sum += item));
    // after done looping, return the sum
    return sum;
}

console.log(sumArray(studentCount));
```
