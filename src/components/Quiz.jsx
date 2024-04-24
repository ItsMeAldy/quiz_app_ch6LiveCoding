import { useCallback, useState } from "react";
import QUESTIONS from "../Question";
import quizCompleteIMG from "../assets/quiz-complete.png"
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
  const [userAnswers, setUsersAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback (function handleSelectAnswer (
    selectedAnswer
    ) {
    console.log(selectedAnswer);
    setUsersAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
    console.log(userAnswers)
  },[]);

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null),[handleSelectAnswer]);

  if (quizIsComplete) {
    return (
        <>
        <div id="summary">
        <img src={quizCompleteIMG}/>
            <h2>Kuis beres</h2>
        </div>
        </>
    )
  }

  const shuffleAnswer = [...QUESTIONS[activeQuestionIndex].answers];
  shuffleAnswer.sort(()=>Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
      <QuestionTimer timeout={10000} onTimeout={() => {handleSkipAnswer}}/>
        <p>{QUESTIONS[activeQuestionIndex].text}</p>

        <ul id="answers">
          {shuffleAnswer.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
