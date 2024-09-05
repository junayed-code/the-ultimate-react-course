import { useQuiz } from "../providers/QuizProvider";

function FinishScreen() {
  const { points, highscore, dispatch, maxPossiblePoints } = useQuiz();
  const percentage = Math.ceil((points / maxPossiblePoints) * 100);

  let emoji = "😔";
  if (percentage >= 90) emoji = "🥇";
  if (percentage >= 80 && percentage < 90) emoji = "🎉";
  if (percentage >= 60 && percentage < 80) emoji = "😊";
  if (percentage >= 50 && percentage < 60) emoji = "🙃";

  return (
    <>
      <p className="result">
        {emoji} Your scored <strong>{points}</strong> out of {maxPossiblePoints}{" "}
        ({percentage}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "quiz/restart" })}
      >
        Restart quiz
      </button>
    </>
  );
}

export default FinishScreen;
