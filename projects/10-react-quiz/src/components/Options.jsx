import { useQuiz } from "../providers/QuizProvider";

function Options() {
  const { dispatch, answer, index, questions } = useQuiz();

  const { options, correctOption } = questions[index];
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {options.map((option, inx) => (
        <button
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "quiz/set-answer", payload: inx })}
          className={"btn btn-option"
            .concat(inx === answer ? " answer" : "")
            .concat(hasAnswered && inx === correctOption ? " correct" : "")
            .concat(hasAnswered && inx !== correctOption ? " wrong" : "")}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
