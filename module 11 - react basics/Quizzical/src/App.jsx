import { nanoid } from "nanoid";
import { useState } from "react";
import { useEffect } from "react";
import Quiz from "./Quiz";
import { decode, shuffle } from "./utils";

export default function App() {
    const [newGame, setNewGame] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizEnded, setQuizEnded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [questionAmount, setQuestionAmount] = useState(5);
    const [questionsData, setQuestionsData] = useState([]);
    const [score, setScore] = useState(0);

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
                }, 1000);
                setQuestionsData(
                    data.results.map((question) => {
                        // shuffle function is defined on 'utils.js' file
                        const shuffled_answers = shuffle([
                            ...question.incorrect_answers,
                            question.correct_answer,
                        ]).map((answer) => decode(answer));

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

    function startQuiz() {
        setQuizStarted(true);
    }

    function playAgain() {
        setNewGame((prevState) => !prevState);
        setQuizEnded(false);
        setScore(0);
    }

    function checkAnswers() {
        setQuizEnded(true);
        countCorrectAnswers();
    }

    function countCorrectAnswers() {
        const count = questionsData.filter(
            (question) => question.isCorrect === true
        );
        setScore(count.length);
    }

    function selectAnswer(event, id) {
        setQuestionsData((prevQuestions) =>
            prevQuestions.map((question) => {
                return question.id === id
                    ? {
                          ...question,
                          selectedAnswer: event.target.textContent,
                          isCorrect:
                              event.target.textContent ===
                              question.correctAnswer
                                  ? true
                                  : false,
                      }
                    : question;
            })
        );
    }

    return (
        <main>
            {isLoading ? (
                <div className="landing-container">
                    <h1 className="loading-text">Loading Quizzical...</h1>
                </div>
            ) : quizStarted ? (
                <section className="quiz questions-container">
                    <Quiz
                        questionsData={questionsData}
                        selectAnswer={selectAnswer}
                        quizEnded={quizEnded}
                    />

                    <div className="footer">
                        {quizEnded && (
                            <p className="score">
                                You scored {score}/{questionAmount} correct
                                answers
                            </p>
                        )}
                        <button
                            className={
                                quizEnded
                                    ? "play-again-btn"
                                    : "check-answers-btn"
                            }
                            onClick={quizEnded ? playAgain : checkAnswers}
                        >
                            {quizEnded ? "Play again" : "Check answers"}
                        </button>
                    </div>
                </section>
            ) : (
                <div className="landing-container">
                    <h1 className="landing-title">Quizzical</h1>
                    <p className="landing-description">Test your knowledge!</p>
                    <button className="start-quiz-btn" onClick={startQuiz}>
                        Start quiz
                    </button>
                </div>
            )}
        </main>
    );
}
