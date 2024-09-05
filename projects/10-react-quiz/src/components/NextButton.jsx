import { useQuiz } from "../providers/QuizProvider";

function NextButton() {
  const { answer, dispatch, index, questions } = useQuiz();
  const numQuestions = questions.length;

  if (answer === null) return null;
  if (index < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "quiz/next-question" })}
      >
        Next
      </button>
    );
  } else {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "quiz/finish" })}
      >
        Finish
      </button>
    );
  }
}

export default NextButton;
