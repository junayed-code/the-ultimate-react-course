import { useQuiz } from "../providers/QuizProvider";

function Progress() {
  const { points, answer, index, questions, maxPossiblePoints } = useQuiz();

  return (
    <div className="progress">
      <progress
        max={questions.length}
        value={index + Number(answer !== null)}
      />

      <p>
        Question <strong>{index + 1}</strong> / {questions.length}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </div>
  );
}

export default Progress;
