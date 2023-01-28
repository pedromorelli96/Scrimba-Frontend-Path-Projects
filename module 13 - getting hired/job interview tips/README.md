# Job Interview Tips

## 🔰 Truthy and Falsy values

A set of unique values that either evaluate to `true` (*truthy*) or `false` (*falsy*).

### ❌ Falsy values:
- the keyword `false`
- the value of zero `0`, `-0` and big int zero `0n`
- empty string `""`
- `null`
- `undefined`
- `NaN`

### ✔️ Truthy values:
    - all values are truthy unless they are defined as falsy.

<br>

## 🔰 `const` vs `let` vs `var`

- `var` is a **lexical scoped** variable (*deprecated*) that *can* be reassigned.
    - the variable declaration is *hoisted* and has an `undefined` value.
    ```js
        if (false) {
            var firstNameVar= 'Dylan';
        }

        console.log(firstNameVar); // undefined
    ```
- `const` and `let` are **block scoped** variables.
    - the variable declaration only exists inside the curly braces.
    ```js
        if (false) {
            let firstNameLet= 'Dylan';
        }

        console.log(firstNameLet); // Error! firstNameLet is not defined
    ```
    - `let` variable *can* be reassigned.
    - `const` variable **cannot** be reassigned.
        - *Note*: you can *mutate* the value of a `const` such as **object** properties `{}` or **array** elements `[]`.

<br>

## 🔰 `==` vs `===`

- `==` (*double equals*) compares **only** the `value`.


- `===` (*triple equals*) compares **both** the `type` and the `value`.

*Note*: generally speaking, it is better to *always* use `===` (*triple equals*).