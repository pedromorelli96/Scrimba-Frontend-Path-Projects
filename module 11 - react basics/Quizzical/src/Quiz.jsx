import Question from "./Question";

export default function Quiz(props) {
    const questions = props.questionsData;

    return (
        <div>
            {questions.map((question) => {
                return (
                    <Question
                        {...question}
                        selectAnswer={props.selectAnswer}
                        quizEnded={props.quizEnded}
                    />
                );
            })}
        </div>
    );
}
