import { nanoid } from "nanoid";
import { useState } from "react";

export default function Question(props) {
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

    function decode(str) {
        let txt = document.createElement("textarea");
        txt.innerHTML = str;
        return txt.value;
    }

    function generateAnswers(possibleAnswers) {
        return possibleAnswers.map((answer) => {
            const answerObj = {
                answer: answer,
                selected: false,
            };
            return answerObj;
        });
    }

    function handleSelectAnswer(value) {
        setAnswers(answers => answers.map(answer => {
            if (answer.answer.trim() === value) {
                return (
                    {
                        ...answer,
                        selected: true
                    }
                )
            } else {
                return (
                    {
                        ...answer,
                        selected: false
                    }
                )
            }
        }))
    }

    const [answers, setAnswers] = useState(
        generateAnswers([...props.incorrect_answers, props.correct_answer])
    );

    const correctStyles = {
        background: "#94D7A2",
        border: 'none',
    };

    const incorrectStyles = {
        backgroundColor: "red",
        border: 'none',
    };

    const t = { // NEEDS TO BE PROPERLY NAMED AND APPLIED TO ALL BUTTONS
        opacity: '0.5',
        margin: '0',
    }

    return (
        <div className="question">
            <p className="question-category">{props.category}</p>
            <h3 className="question-question">{decode(props.question)}</h3>
            <div className="question-answers">
                {answers.map((answer) => {
                    return props.finished ? (
                        answer.answer === props.correct_answer ? (
                            <button
                                className="answer"
                                key={nanoid()}
                                style={correctStyles}
                            >
                                {decode(answer.answer)}
                            </button>
                        ) : (
                            <button
                                className="answer"
                                key={nanoid()}
                                style={incorrectStyles}
                            >
                                <p style={t}>
                                    {decode(answer.answer)}
                                </p>
                            </button>
                        )
                    ) : (
                        <button
                            className="answer"
                            key={nanoid()}
                            onClick={(e) => handleSelectAnswer(e.target.innerText)}
                            style={answer.selected ? (
                                {
                                    background: '#d6dbf5',
                                    border: 'none',
                                }
                            ) : (
                                {}
                            ) }
                        >
                            {decode(answer.answer)}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
