import { useEffect } from "react";
import { useQuiz } from "../providers/QuizProvider";

function Timer() {
  const { remainingSeconds, dispatch } = useQuiz();

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  useEffect(() => {
    const intervalID = setInterval(() => {
      dispatch({ type: "quiz/tick" });
    }, 1000);
    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="timer">
      {`${minutes}`.padStart(2, "0")}:{`${seconds}`.padStart(2, "0")}
    </div>
  );
}

export default Timer;
