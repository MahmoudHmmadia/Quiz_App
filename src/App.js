import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./components/start page/StartPage";
import QuizPage from "./components/quiz page/QuizPage";
import ResultPage from "./components/result page/ResultPage";
import ErrorPage from "./components/error page/ErrorPage";
import { ContextP } from "./contexts/ContextProvider";
import "./app.scss";
const App = () => {
  const { err } = ContextP();
  return (
    <div className="app">
      {err ? (
        <>
          <ErrorPage />
        </>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/start" element={<StartPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
