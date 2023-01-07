import { useState } from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

export default function Quiz(props) {
    const [finished, setFinished] = useState(false);

    return (
        <div className="questions-container">
            {props.quiz.map((question, index) => 
                <Question
                    id={index}
                    key={nanoid()}
                    category={question.category}
                    difficulty={question.difficulty}
                    question={question.question}
                    correct_answer={question.correct_answer}
                    incorrect_answers={question.incorrect_answers}
                />
            )}

            {!finished ? (
                <button className="check-answers-btn">Check answers</button>
            ) : (
                <button className="play-again-btn">Play again</button>
            )}
        </div>
    );
}
