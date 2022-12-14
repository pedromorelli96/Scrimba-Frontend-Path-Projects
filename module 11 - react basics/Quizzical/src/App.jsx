import { useState } from "react";
import Quiz from "./Quiz";

export default function App() {
    const [quiz, setQuiz] = useState([]);
    const [quizAnswers, setQuizAnswers] = useState([]);
    const [questionAmount, setQuestionAmount] = useState(5);
    const [isLoading, setIsLoading] = useState(false);

    const handleFetchQuiz = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(
                `https://opentdb.com/api.php?amount=${questionAmount}&type=multiple`
            );
            const data = await response.json();
            setQuiz(data.results);
            setQuizAnswers(
                data.results.map((question) => question.correct_answer)
            );
            console.log(data.results);
        } catch (error) {
            console.log("(!) Error: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main>
            {quiz.length > 0 ? (
                <Quiz
                    quiz={quiz}
                    quizAnswers={quizAnswers}
                    questionAmount={questionAmount}
                    fetchQuiz={handleFetchQuiz}
                />
            ) : (
                <div className="landing-container">
                    {isLoading ? (
                        <h1 className="loading-text">Loading your quiz...</h1>
                    ) : (
                        <>
                            <h1 className="landing-title">Quizzical</h1>
                            <p className="landing-description">
                                Test your knowledge!
                            </p>
                            <button
                                className="start-quiz-btn"
                                onClick={handleFetchQuiz}
                            >
                                Start quiz
                            </button>
                        </>
                    )}
                </div>
            )}
        </main>
    );
}
