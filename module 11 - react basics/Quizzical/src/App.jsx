import { nanoid } from "nanoid";
import { useState } from "react";
import { useEffect } from "react";
import { decode, shuffle } from "./utils";

export default function App() {
    const [newGame, setNewGame] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizEnded, setQuizEnded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [questionAmount, setQuestionAmount] = useState(5);
    const [questionsData, setQuestionsData] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetch(
            `https://opentdb.com/api.php?amount=${questionAmount}&type=multiple`
        )
            .then((res) => res.json())
            .then((data) => {
                // As the promise gets resolved in less than 1 second
                // I've set this timeout of 1 second so there is less blinking text
                // when the website is loaded
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000)
                setQuestionsData(
                    data.results.map((question) => {
                        // shuffle function is defined on 'utils.js' file
                        const shuffled_answers = shuffle([
                            ...question.incorrect_answers,
                            question.correct_answer,
                        ]);

                        return {
                            key: nanoid(),
                            id: nanoid(),
                            category: question.category,
                            difficulty: question.difficulty,
                            // decode function is defined on 'utils.js' file
                            question: decode(question.question).trim(),
                            correctAnswer: decode(
                                question.correct_answer
                            ).trim(),
                            shuffledAnswers: shuffled_answers,
                            isCorrect: false,
                            selectedAnswer: "",
                        };
                    })
                );
            });
    }, [newGame]);

    return (
        <main>
            <div className="landing-container">
                {isLoading ? (
                    <>
                        <h1 className="loading-text">Loading Quizzical...</h1>
                    </>
                ) : (
                    <>
                        <h1 className="landing-title">Quizzical</h1>
                        <p className="landing-description">Test your knowledge!</p>
                        <button
                            className="start-quiz-btn"
                            // onClick={handleFetchQuiz}
                        >
                            Start quiz
                        </button>
                    </>
                )}
            </div>

            {/* NEXT STEP
            FIX THE QUIZ COMPONENT */}


            {/* {quiz.length > 0 ? (
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
            )} */}
        </main>
    );
}
