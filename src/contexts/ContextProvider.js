/* eslint-disable react-hooks/exhaustive-deps */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import axios from "axios";
import { nanoid } from "nanoid";

const context = createContext();
let timerInterval;
const numbers = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
];
export const Provider = ({ children }) => {
  // ==> Refs <== //
  const userSelect1 = useRef();
  const userSelect2 = useRef();
  const userSelect3 = useRef();
  const userSelect4 = useRef();
  const refArr = [userSelect1, userSelect2, userSelect3, userSelect4];

  // ==> States <== //
  const [allQuestionsArr, setAllQuestionsArr] = useState([]);
  const [items, setItems] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [err, setErr] = useState(false);
  const [timer, setTimer] = useState(20);
  const [score, setScore] = useState(0);
  const [buttonText, setButtonText] = useState(" Skip Question");
  const [done, setDone] = useState(false);
  const [counter, setCounter] = useState(0);
  // ==> Functions <== //
  // [1] Get Current Question

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getCurrentQuestion = useCallback(() => {
    clearInterval(timerInterval);
    if (items.length > 0) {
      let randomIndex = Math.floor(Math.random() * items.length);
      setCurrentQuestion({
        id: items[randomIndex].id,
        question: items[randomIndex].question,
      });
    }
    setCounter((prev) => (prev += 1));
    runTimer();
  });

  // [2] Get Current Answers
  const getCurrentAnswers = () => {
    items.forEach((item) => {
      if (item.id === currentQuestion.id) {
        setCurrentAnswers([...item.answers]);
      }
    });
  };

  // [3] Run The Timer

  const runTimer = () => {
    setTimer(20);
    timerInterval = setInterval(() => {
      setTimer((prev) => (prev -= 1));
    }, 1000);
  };

  // [4] Shuffle Answers
  const shuffle = (array) => {
    let shuffleArray = [];
    // eslint-disable-next-line no-unused-vars
    for (let i in array) {
      let randomIndex = Math.floor(Math.random() * array.length);
      shuffleArray.push(array[randomIndex]);
      // eslint-disable-next-line no-loop-func
      array = array.filter((e) => e !== array[randomIndex]);
    }
    setShuffledAnswers(shuffleArray);
  };

  // [6] Test The User Choice
  const testUserChoice = (e) => {
    if (e.current.classList.contains("correct")) {
      setScore((prev) => (prev += 1));
    }
    getCurrentQuestion();
  };

  // [8] Restart Quiz
  const restartQuiz = () => {
    setTimeout(() => {
      document.body.style.cssText = `
      user-select:none;
      `;
      window.location.reload();
    }, 500);
  };

  // ==> Effects <== //

  // [1] Get Data And Work On It

  useEffect(() => {
    axios
      .get(
        "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"
      )
      .then((res) => {
        Array.from(res.data.results).forEach((item) => {
          let answers = [];
          item["incorrect_answers"].forEach((answer) =>
            answers.push({ correct: false, answer })
          );
          setItems((prev) => [
            ...prev,
            {
              ...item,
              id: nanoid(),
              answers: [
                { answer: item.correct_answer, correct: true },
                ...answers,
              ],
            },
          ]);
          setAllQuestionsArr((prev) => [
            ...prev,
            {
              ...item,
              id: nanoid(),
              answers: [
                { answer: item.correct_answer, correct: true },
                ...answers,
              ],
            },
          ]);
        });
        setErr(false);
      })
      .catch((err) => {
        setErr(true);
      });
  }, []);

  // [2] Update Question Array
  useEffect(() => {
    setItems((prev) => prev.filter((item) => item.id !== currentQuestion.id));
    getCurrentAnswers();
  }, [currentQuestion, getCurrentAnswers]);

  // [3] Check Up Timer
  useEffect(() => {
    if (items.length > 0) {
      if (timer === 0) {
        getCurrentQuestion();
        document.querySelector(".skip-button").click();
      }
    }
  }, [getCurrentQuestion, items, timer]);

  // [4] Check Up Answers
  useEffect(() => {
    shuffle(currentAnswers);
  }, [currentAnswers]);

  // test
  useEffect(() => {
    if (counter > allQuestionsArr.length) {
      setDone(true);
      setButtonText("Show Result");
    } else if (counter === allQuestionsArr.length) {
      setButtonText("Next");
    } else {
      setDone(false);
      setButtonText("Skip Question");
    }
  }, [allQuestionsArr, counter]);

  return (
    <>
      <context.Provider
        value={{
          err,
          items,
          getCurrentQuestion,
          shuffledAnswers,
          currentQuestion,
          timer,
          testUserChoice,
          refArr,
          numbers,
          score,
          allQuestionsArr,
          buttonText,
          done,
          restartQuiz,
        }}
      >
        {children}
      </context.Provider>
    </>
  );
};

export const ContextP = () => useContext(context);
