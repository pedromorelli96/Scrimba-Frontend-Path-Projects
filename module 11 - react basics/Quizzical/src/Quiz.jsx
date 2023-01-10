import { useState } from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

export default function Quiz(props) {
    const [finished, setFinished] = useState(false);

    function handleFinishQuiz() {
        setFinished((prevState) => !prevState);
    }

    async function handlePlayAgain() {
        await props.fetchQuiz();
        setFinished((prevState) => !prevState);
    }

    return (
        <div className="questions-container">
            {props.quiz.map((question, index) => (
                <Question
                    id={index}
                    key={nanoid()}
                    category={question.category}
                    difficulty={question.difficulty}
                    question={question.question}
                    correct_answer={question.correct_answer}
                    incorrect_answers={question.incorrect_answers}
                    finished={finished}
                />
            ))}

            {!finished ? (
                <button
                    className="check-answers-btn"
                    onClick={handleFinishQuiz}
                >
                    Check answers
                </button>
            ) : (
                <button className="play-again-btn" onClick={handlePlayAgain}>
                    Play again
                </button>
            )}
        </div>
    );
}
