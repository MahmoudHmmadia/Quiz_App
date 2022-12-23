import React from "react";
import { Link } from "react-router-dom";
import { RiAppsFill } from "react-icons/ri";
import { ContextP } from "../../contexts/ContextProvider";
import "./start-page.scss";
const StartPage = () => {
  const { getCurrentQuestion } = ContextP();
  return (
    <div className="start-page">
      <h1 className="start-page__title">
        Welcome To Quiz App With React
        <span className="app-icon">
          <RiAppsFill />
        </span>
      </h1>
      <p className="start-page__info">Click To Start Quiz</p>
      <Link
        to={"/quiz"}
        className="start-page__start-btn"
        onClick={getCurrentQuestion}
      >
        Start
      </Link>
    </div>
  );
};

export default StartPage;
