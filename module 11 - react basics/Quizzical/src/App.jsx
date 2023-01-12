import { useState } from "react";
import Quiz from "./Quiz";

export default function App() {
    const [quiz, setQuiz] = useState([]);
    const [quizAnswers, setQuizAnswers] = useState([]);
    const [questionAmount, setQuestionAmount] = useState(5);
    const [isLoading, setIsLoading] = useState(false);

    // UPDATE THIS TO BE INSIDE A USEEFFECT!!!
    const handleFetchQuiz = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(
                `https://opentdb.com/api.php?amount=${questionAmount}&type=multiple`
            );
            const data = await response.json();
            // POSSIBLY CHANGE THE WAY WE STORE THE DATA
            // CREATE A CUSTOM OBJECT
            // WITH PROPERTIES LIKE 'ISCORRECT'
            // INSTEAD OF SETTING A QUIZ, SET THE QUESTIONS
            setQuiz(data.results);
            setQuizAnswers(
                data.results.map((question) => question.correct_answer)
            );
            // MAYBE GENERATE ALL THE SCRAMBLED ANSWERS HERE!!!

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
