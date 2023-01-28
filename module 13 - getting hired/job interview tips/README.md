# Job Interview Tips

## 🔰 Truthy and Falsy values

A set of unique values that either evaluate to `true` (_truthy_) or `false` (_falsy_).

### ❌ Falsy values:

-   the keyword `false`
-   the value of zero `0`, `-0` and big int zero `0n`
-   empty string `""`
-   `null`
-   `undefined`
-   `NaN`

### ✔️ Truthy values:

    - all values are truthy unless they are defined as falsy.

<br>

## 🔰 `const` vs `let` vs `var`

-   `var` is a **lexical scoped** variable (_deprecated_) that _can_ be reassigned.

    -   the variable declaration is _hoisted_ and has an `undefined` value.

        ```js
        if (false) {
            var firstNameVar = "Dylan";
        }

        console.log(firstNameVar); // undefined
        ```

-   `const` and `let` are **block scoped** variables.

    -   the variable declaration only exists inside the curly braces.

        ```js
        if (false) {
            let firstNameLet = "Dylan";
        }

        console.log(firstNameLet); // Error! firstNameLet is not defined
        ```

    -   `let` variable _can_ be reassigned.
    -   `const` variable **cannot** be reassigned.
        -   _Note_: you can _mutate_ the value of a `const` such as **object** properties `{}` or **array** elements `[]`.

<br>

## 🔰 `==` vs `===`

-   `==` (_double equals_) compares **only** the `value`.

-   `===` (_triple equals_) compares **both** the `type` and the `value`.

    -   _Note_: generally speaking, it is better to _always_ use `===` (_triple equals_).

<br>

## 🔰 `map()` vs `filter()` vs `reduce()`

-   `map()` _modifies_ an array and returns a new **array**.

    ```js
    const nums = [1, 2, 3, 4, 5];

    const numsAddOne = nums.map((value) => value + 1);

    console.log(numsAddOne); // [2, 3, 4, 5, 6]
    ```

-   `filter()` returns a new **array** with all the elements that _pass_ the test implemented by the provided function.

    ```js
    const nums = [1, 2, 3, 4, 5];

    const evenNums = nums.filter((value) => value % 2 === 0);
    // value % 2 === 0 returns `true` only if value is even

    console.log(evenNums); // [2, 4]
    ```

-   `reduce()` executes a _reducer_ function for each array element and returns a **single value**.

        ```js
        const nums = [1, 2, 3, 4, 5];

        const numsAddOneEvens = nums.reduce((acc, current) => {
            current = current + 1;

            if (current % 2 === 0) {
                acc.push(current);
            }

            return acc;
        }, []);

        console.log(numsAddOneEvens); // [2, 4, 6]
        ```

        ```js
        const array1 = [1, 2, 3, 4, 5];

        const initialValue = 0;
        const sumWithInitial = array1.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            initialValue
        );

        console.log(sumWithInitial); // 15
        ```

    <br>

## 🔰 `undefined` vs `null`

The main difference between these primitive values is _intent_.

-   `undefined` value represents something that **does not exist**.

-   `null` value represents **intentional** absence of value.

    ```js
    null == undefined; // true

    null === undefined; // false
    ```

<br>

## 🔰 Data types

### - Primitives

-   `boolean`
-   `string`
-   `number`
-   `null`
-   `undefined`
-   `bigInt`
-   `symbol`

### - Non-primitives

-   `array []`
-   `object {}`
-   `class`
-   `Map`
-   `Set`

<br>

## 🔰 Spread & Rest operators `...`

-   The **Spread** operator can be used to _unwrap_ an array or an object.

    ```js
    const users = ["Dylan", "Per", "Dollan"];

    const allUsers = ["Olivia", ...users];

    console.log(allUsers); // ["Olivia", "Dylan", "Per", "Dollan"]
    ```

    ```js
    const user = {
        firstName: "Dylan",
        lastName: "Israel",
    };

    const fullUser = {
        channel: "codingtutorials360",
        ...user,
    };

    console.log(fullUser);
    //{
    //    channel: "codingtutorials360",
    //    firstName: "Dylan",
    //    lastName: "Israel"
    //}
    ```

-   The **Rest** operator allows a function to receive an _indefinite number of arguments_ as an array.

    ```js
    function addNums(...nums) {
        // <-- rest parameter
        return nums.reduce(
            (total, current) => {
                return total + current;
            },
            0 // initial value
        );
    }

    console.log(addNums(1, 2, 3)); // 6

    console.log(addNums(1, 2)); // 3
    ```

<br>

## 🔰 Destructuring Objects & Arrays

Destructuring is a great way to provide _context_ and _intent_ making our code more **readable**.

```js
const dob = [10, 25, 1987];
const [day, month, year] = dob;
```

In case of Objects, it is also possible to simply pull the values we _intend to use_ instead of the whole object.

```js
const user = {
    f: "Dylan",
    m: "R.",
    l: "Israel",
};

const { f: firstName, l: lastName } = user;
```

<br>

## 🔰 CSS Selectors

-   `HTML element`: lowest specificity (1).

    ```css
    h1 {
        color: blue;
    }
    ```

-   `class`: intended for multiple uses, low specificity (10).
    ```css
    .green {
        color: green;
    }
    ```
-   `id`: intended for single use, higher specificity (100) than `class`.

    ```css
    #red {
        color: red;
    }
    ```

-   _Note_: **specificity** adds up!

    ```css
    #red:hover {  <!-- 110 total specificity -->
        color: blue;
    }
    ```

<br>

## 🔰 Responsive Design

Responsive web design is about having your application be **functional** and **appear correct** in multiple screen sizes.

To implement it we might use:

-   `media queries`
-   `flexbox`
-   `css grid`
-   `rem, em, % and viewport units`

<br>

## 🔰 Number Issues

Javascript floating point operations have small accuracy errors.

```js
console.log(0.2 + 0.1); // 0.30000000000000004
```

-   If you **care** about precision (_i.e._ money calculations), it helps to multiply and divide.

    ```js
    console.log(0.2 * 10 + 0.1 * 10) / 10; // 0.3
    ```

-   If you **don't** care about precision, just _format_ the number using fixed-point notation.

    ```js
    console.log((0.1 + 0.2).toFixed(1)); // 0.3
    ```

<br>

## 🔰 Promises

`Promises` are tipically used on **API calls** and **asynchronous** actions.

A `Promise` is in one of these states:

-   `pending`: initial state, neither fulfilled or rejected.
-   `fulfilled`: it means the operation finished successfully.
-   `rejected`: it means the operation failed.

Asynchronous API call example:

```js
function getPost() {
    console.log(1);

    fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then((response) => response.json())
        .then((data) => console.log(2))
        .catch((error) => console.log(error));

    console.log(3);
}

getPost();
// 1
// 3
// 2
```

Synchronous API call example:

```js
async function getPost() {
    console.log(1);

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts/1"
        );
        const data = await response.json();
        console.log(2);
    } catch (error) {
        console.log(error);
    }

    console.log(3);
}

getPost();
// 1
// 2
// 3
```

<br>

## 🔰 Pass by Value vs Pass by Reference

-   Pass by Value only passes the value of a variable, it **does not** change its _reference_.

    ```js
    const num = 5;

    function add(value) {
        value++;
        return value;
    }

    console.log(add(num), num); // 6 5
    ```

-   Pass by Reference passes a **reference** to the non-primitive variable.

    ```js
    const ref = { count: 5 };

    function add2(value) {
        value.count++;
        return value.count;
    }

    console.log(add2(ref), ref.count); // 6 6
    ```
