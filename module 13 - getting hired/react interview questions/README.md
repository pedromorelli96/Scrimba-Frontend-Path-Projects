# React Interview Questions

## 🔰 The Virtual DOM

-   ### What is the difference between the Virtual DOM and the "Real" DOM?

    The **key** difference is `diffing`.
    <br>
    The **Virtual DOM** looks at the difference between one state and next state in the DOM, decides what has to be changed and then **only** updates that part of the DOM instead of the _whole_ page.

    Some other characteristics:

    ### - Virtual DOM

    -   **Can`t** directly update HTML.
    -   Acts as a _copy_ of the real DOM, which can be frequently manipulated without a page refresh.
    -   More of a pattern than a specific technology.
    -   Synced with the real DOM with `react-dom`.

    ### - "Real" DOM

    -   An object-based representation of an HTML document + an interface for manipulating that object.
    -   Directly updated and manipulates HTML.
    -   Creates a new DOM/full repaint if it updated.

    <br>

-   ### Is the Virtual DOM the same as the Shadow DOM?

    No. The Shadow DOM is a **browser-specific** technology. It is used for specific types of elements and tipically serves for styling (_Example_: Slider elements).
    <br>
    The Virtual DOM is a _pattern_ that is built into many different frameworks.

    <br>

## 🔰 React Limitations

-   ### It is a Library, **not** a framework.
    -   A Library is something that _enhances_ your existing code (it was one of React's main selling points when it came out).
    -   React is fundamentally **"unopinionated"** (it basically means you need to choose the **tools** on your own and how you **structure** your project).
    -   For instance, `Next.js` is a React Framework.
-   ### It is Large.
    -   This can be circumvented with certains strategies, such as **code-splitting** and other guardrails.
-   ### Being owned by Meta.

    -   Pro: it is being maintained by a large company that will make sure it doesn't die.
    -   Con: privacy and transparency (there are many internal decisions, even though it is open source).

-   ### Documentation.
    -   It is still being updated (leaving class-based components).

<br>

## 🔰 JSX

-   ### What is JSX?

    -   Short for **Javascript XML**.
    -   Write Javascript with an HTML-_like_ template syntax (**not** HTML or a string!).
    -   Produces elements that represents objects.

-   ### What is the difference between an React Element and a Component?

    -   A **Component** is a **function** that `returns` an Element.
        -   `<Component />`
    -   An Element is a Javascript **object**.
        -   `<div>Hello!</div>`

-   ### Can you write React without JSX?

    -   Yes!
        -   `React.createElement('div', null, 'Hello!!!')`

<br>

## 🔰 Props

-   ### How do you pass a value from `parent` to `child`?

    -   You pass it via `props`.

-   ### And how about `child` to `parent`?

    -   The `parent` needs to pass a `function prop` (usually a **state's** update function) to the `child`.
    -   The `child` then **calls** that `function` that passes a value to the `parent`.

-   ### What is prop-drilling?

    -   Passing `props` down a bunch of different components (continually passing props down via multiple levels).

-   ### Can you modify props?

    -   You **can't**, `props` are **read-only**.
    -   All React Components **must** act like _pure-functions_ in respect to their `props` (**always** `return` the same results for the same inputs).

<br>

## 🔰 State and Lifecycle

-   ### What is the difference between `props` and `state`?

    -   `props` are only _passed_ to a Component.
    -   `state` is _managed_ within a given Component, it is _scoped_ and _local_ to that Component (normally unacessible if outside the Component, unless passed with `props`).

-   ### What is the difference between state in a `class` component versus state in a `function` component?

    -   `state` in a `class` component is used by calling the function `this.getState()`/`this.setState()`.
        <br>
        It **persists** like an object.
    -   `state` in a `function` component is used by calling the React Hook `useState()`.
        <br>
        It is **recalled** and **reinstantiated** because of the component itself is recalled and reinstantiated.

-   ### What is the Component Lifecycle?

    -   ### Mounting
        (_Class-based_) Functions that are called right when the component is **mounted** and put on the page:
        -   `render`, `componentDidMount`
    -   ### Updating
        (_Class-based_) Functions that are ran when the component **updates** because `state` has changed:
        -   `render`, `componentDidUpdate`
    -   ### Unmounting
        (_Class-based_) Function that is called when the component is about to go away and **removed** from the page:
        -   `componentWillUnmount`

-   ### How do you update the lifecycle in `function` components?

    -   With the React Hook `useEffect()`.

<br>

## 🔰 Effects

-   ### What parameters does `useEffect` take in?

    -   The first one - the effect `function`.
        <br>
        What is going to be ran.
    -   The second one - the **dependency** `array`.
        <br>
        What determines _when_ it will be ran.

-   ### When does the `useEffect` function run?

    It depends on what is the **dependency** `array`:

    -   `[]` -> Runs on mount
    -   `[variable]` -> Runs on mount and when `variable` changes
    -   `No array` -> Runs on mount and on **every** state change

-   ### What is the `useEffect` function's `return` value?

    It's a **clean up** function and signals that the component is about to unmount.
    <br>
    It clears any event listeners, does fetch cancelations, cancel subscription functions, etc.

<br>

## 🔰 Refs

-   ### What is the difference between `refs` and `state` variables?

    They are both objects that can contain values.
    <br>
    But `state` variables can **trigger** re-renders, meanwhile `refs` **don't** (they persist across renders).

-   ### When is the best time to use `refs`?

    -   Managing focus or media.
    -   Triggering animations.
    -   Integrating with DOM libraries.

-   ### What is the proper way to update a `ref` in a function component?

    You use an `effect`!

<br>

## 🔰 Context

-   ### What is the difference between the Context API and prop drilling?

    -   **prop drilling** is for explicitly stating `props` and values that a given `child` component can get.
    -   The **Context API** implicitly states what values a given `child` component can have.
        <br>
        You define things at the top level and anything inside the component tree has access to those values.
        <br>
        This may cause unnecessary re-renders.

-   ### When shouldn't you use the Context API?

    You shouldn't **overuse** the Context API because it may trigger unnecessary re-renders.
    <br>
    You should only put what is **absolutely necessary** at the top level of your application with Context.

<br>

## 🔰 Miscellaneous

-   ### What is a Fragment?

    A Fragment `<></>` creates a very _empty_ element that doesn't produce anything in the DOM but it makes sure a Component is returning **one** individual thing.

-   ### When should you use a class-based component versus a function component?

    You should _almost_ never use class-based components.
    <br>
    (Except when using _error boundaries_, those are restricted to class-based components)
    <br>
    Function components are the **future** of React.

-   ### What is a higher order component (HOC)?

    It is a function that **takes in** a component and `returns` a new component.
    <br>
    It is used for **re-using** component logic.
    <br>
    It is a _pattern_ and **not** a React API.

-   ### What is a Portal?

    It is a way to render `children` into a DOM node that exists **outside** of the DOM hierarchy of the `parent` component.
    <br>
    It can live **anywhere** in the DOM tree.
    <br>
    You most often see it in UI components, like Modals.

-   ### What are controlled and uncontrolled components?

    -   Uncontrolled components are some sort of _user-manipulated_ component (some kind of `input` tipically) that React does **not** control.
        <br>
        Their values exist in the real DOM, outside of the Virtual DOM that React controls.

    -   Controlled components are a solution to this kind of problem.
        <br>
        When you have an `input`, React controls it.
        <br>
        It controls the `state` changes happening in it and can react to those `state` changes.

<br>

## 🔰 Converting a class-based component to a function component

### Class Component

```js
import React from "react";
import ReactDOM from "react-dom";

class Counter extends React.Component {
    constructor() {
        super();

        this.state = {
            count: 0,
        };
    }

    render() {
        return (
            <div>
                <button
                    onClick={() => {
                        this.setState({ count: this.state.count - 1 });
                    }}
                >
                    -
                </button>
                {this.state.count}
                <button
                    onClick={() => {
                        this.setState({ count: this.state.count + 1 });
                    }}
                >
                    +
                </button>
            </div>
        );
    }
}

const domElement = document.getElementById("root");

ReactDOM.render(<Counter />, domElement);
```

### Function Component

```js
import React, { useState } from "react";
import ReactDOM from "react-dom";

function Counter() {
    let [count, setCount] = useState(0);

    return (
        <div>
            <button
                onClick={() => {
                    setCount(count - 1);
                }}
            >
                -
            </button>
            {count}
            <button
                onClick={() => {
                    setCount(count + 1);
                }}
            >
                +
            </button>
        </div>
    );
}

const domElement = document.getElementById("root");

ReactDOM.render(<Counter />, domElement);
```
