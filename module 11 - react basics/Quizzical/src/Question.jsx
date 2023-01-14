import { nanoid } from "nanoid";

export default function Question(props) {
    function handleAnswerClick(event) {
        props.selectAnswer(event, props.id);
    }

    function generateAnswerClass(answer, isSelectedAnswer) {
        if (props.quizEnded) {
            if (isSelectedAnswer) {
                if (!props.isCorrect) {
                    return "question-incorrect";
                } else {
                    return "question-correct";
                }
            } else {
                if (answer === props.correctAnswer) {
                    return "question-correct";
                } else {
                    return "question-neutral";
                }
            }
        } else {
            if (isSelectedAnswer) {
                return "question-selected";
            }
        }

        return "";
    }

    return (
        <div className="question">
            <p className="question-category">{props.category}</p>
            <h3 className="question-question">{props.question}</h3>
            <div className="question-answers">
                {props.shuffledAnswers.map((answer) => {
                    const isSelectedAnswer = answer === props.selectedAnswer;

                    const answerClass = generateAnswerClass(
                        answer,
                        isSelectedAnswer
                    );

                    return (
                        <button
                            className={`${answerClass} answer-btn`}
                            key={nanoid()}
                            onClick={(e) =>
                                !props.quizEnded && handleAnswerClick(e)
                            }
                        >
                            <p className="answer-text">{answer}</p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
