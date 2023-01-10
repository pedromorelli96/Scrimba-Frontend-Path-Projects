import { nanoid } from "nanoid";
import { useEffect } from "react";
import { useState } from "react";

export default function Question(props) {
    const [scrambledAnswers, setScrambledAnswers] = useState([]);

    // Source for shuffle array algorithm:
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    function shuffle(array) {
        let currentIndex = array.length,
            randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }

        return array;
    }

    function generateScrambledAnswers(incorrect_answers, correct_answer) {
        const possibleAnswers = [...incorrect_answers, correct_answer];
        return shuffle(possibleAnswers);
    }

    useEffect(() => {
        setScrambledAnswers(
            generateScrambledAnswers(
                props.incorrect_answers,
                props.correct_answer
            )
        );
    }, []);

    function decode(str) {
        let txt = document.createElement("textarea");
        txt.innerHTML = str;
        return txt.value;
    }

    return (
        <div className="question">
            <p className="question-category">{props.category}</p>
            <h3 className="question-question">{decode(props.question)}</h3>
            <div className="question-answers">
                {scrambledAnswers.map((answer) => (
                    <button className="answer" key={nanoid()}>
                        {decode(answer)}
                    </button>
                ))}
            </div>
        </div>
    );
}
