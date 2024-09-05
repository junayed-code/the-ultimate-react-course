/* eslint-disable react/prop-types */
import React, { createContext, useContext, useEffect, useReducer } from "react";

/**
 * @typedef {{type: 'data/received', payload: import("../components/Question").Question[]} | {type: 'data/failed'} | {type: 'quiz/start'} | {type: 'quiz/restart'} | {type: 'quiz/finish'} | {type: 'quiz/tick'} | {type: 'quiz/set-answer', payload: number} | {type: 'quiz/next-question'}} QuizAction
 */

/**
 * @typedef QuizState
 * @property {number} index
 * @property {number} points
 * @property {import("../components/Question").Question[]} questions
 * @property {number} highscore
 * @property {number | null} answer
 * @property {number} remainingSeconds
 * @property {number} maxPossiblePoints
 * @property {'ready' |'loading' | 'error' | 'active' | 'finished'} status
 * @property {React.Dispatch<QuizAction>} dispatch
 */

const SECS_PER_QUESTION = 10;

/**@type {import("react").Reducer<Omit<QuizState, 'dispatch'>, QuizAction>} */
const reducer = (state, action) => {
  switch (action.type) {
    case "data/received": {
      const questions = action.payload;
      const maxPossiblePoints = questions.reduce(
        (accu, question) => accu + question.points,
        0
      );
      return { ...state, questions, maxPossiblePoints, status: "ready" };
    }

    case "data/failed":
      return { ...state, status: "error" };

    case "quiz/start":
      return {
        ...state,
        status: "active",
        remainingSeconds: state.questions.length * SECS_PER_QUESTION,
      };

    case "quiz/restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highscore: state.highscore,
      };

    case "quiz/finish": {
      const highscore =
        state.points > state.highscore ? state.points : state.highscore;
      return { ...state, status: "finished", highscore };
    }

    case "quiz/tick": {
      const status = state.remainingSeconds < 1 ? "finished" : state.status;
      return {
        ...state,
        status,
        remainingSeconds: state.remainingSeconds - 1,
      };
    }

    case "quiz/set-answer": {
      const question = state.questions[state.index];
      const points =
        question.correctOption === action.payload
          ? state.points + question.points
          : state.points;
      return { ...state, answer: action.payload, points };
    }

    case "quiz/next-question":
      return { ...state, index: state.index + 1, answer: null };

    default:
      throw new Error("Unknown action");
  }
};

/**@type {Omit<QuizState, 'dispatch'>} */
const initialState = {
  questions: [],
  index: 0,
  points: 0,
  answer: null,
  highscore: 0,
  remainingSeconds: 0,
  maxPossiblePoints: 0,
  status: "loading",
};

/**@type {React.Context<QuizState>} */
const QuizContext = createContext({});

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((questions) =>
        dispatch({ type: "data/received", payload: questions })
      )
      .catch(() => dispatch({ type: "data/failed" }));
  }, []);

  return (
    <QuizContext.Provider value={{ ...state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useQuiz = () => useContext(QuizContext);

export default QuizProvider;
