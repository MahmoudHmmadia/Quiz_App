import React from "react";
import image from "../../assists/e.svg";
import { ContextP } from "../../contexts/ContextProvider";
import "./error.scss";
const ErrorPage = () => {
  const { restartQuiz } = ContextP();

  return (
    <div className="error">
      <div className="image">
        <img src={image} alt="" />
      </div>
      <div className="content">
        <h1>
          Page Not Found <span className="special">404</span>
        </h1>
        <button className="button" onClick={restartQuiz}>
          Start Again
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
