import React from "react";
import { Link } from "react-router-dom";
import { IoCloudDoneSharp } from "react-icons/io5";
import "./result-page.scss";
import { ContextP } from "../../contexts/ContextProvider";
const ResultPage = () => {
  const { score, numbers, allQuestionsArr, restartQuiz } = ContextP();
  return (
    <div className="result-page">
      <span className="done-icon">
        <IoCloudDoneSharp />
      </span>
      <h1 className="result-page__info">
        You Have Answered {numbers[score]} {""}Correct{" "}
        {score > 1 ? "Questions" : "Question"} {""} Of{" "}
        {numbers[allQuestionsArr.length]} {""} Questions
      </h1>
      <Link to={"/"} className="result-page__restart-btn" onClick={restartQuiz}>
        Restart The Quiz
      </Link>
    </div>
  );
};

export default ResultPage;
