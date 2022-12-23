import React from "react";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { BsFillLightningFill } from "react-icons/bs";
import { ContextP } from "../../contexts/ContextProvider";
import "./quiz-page.scss";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import image from "../../assists/d.svg";
const QuizPage = () => {
  const {
    getCurrentQuestion,
    currentQuestion,
    shuffledAnswers,
    timer,
    testUserChoice,
    refArr,
    numbers,
    items,
    allQuestionsArr,
    buttonText,
    done,
  } = ContextP();
  return (
    <div className="quiz-app">
      {!done ? (
        <>
          <h1 className="quiz-app__question-number">
            Question {numbers[allQuestionsArr.length - items.length]} Of{" "}
            {numbers[allQuestionsArr.length]}
            <span className="potter">
              <BsFillLightningFill />
            </span>
          </h1>
          <p className="quiz-app__question">{currentQuestion.question}</p>
          <ul className="quiz-app__answers">
            {shuffledAnswers.map((answer, index = 0) => (
              <li
                className={`answer ${answer.correct ? "correct" : ""}`}
                key={nanoid()}
                ref={refArr[index]}
                onClick={() => testUserChoice(refArr[index++])}
              >
                {answer.answer}
              </li>
            ))}
          </ul>
          <div className="quiz-app__dashboard">
            <div className="timer">
              {timer}
              <div className="icon">
                <BsFillArrowUpRightCircleFill />
              </div>
            </div>
            <button
              type="button"
              className="skip-button"
              onClick={getCurrentQuestion}
            >
              {buttonText}
            </button>
          </div>
        </>
      ) : (
        <div className="done-quiz">
          <div className="image-container">
            <img src={image} alt="bla" />
          </div>
          <Link type="button" className="next-button" to={"/result"}>
            {buttonText}
          </Link>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
