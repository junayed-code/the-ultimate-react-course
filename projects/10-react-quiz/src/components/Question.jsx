import { useQuiz } from "../providers/QuizProvider";
import Options from "./Options";

/**
 * @typedef Question
 * @property {number} points
 * @property {string} question
 * @property {string[]} options
 * @property {number} correctOption
 */

function Question() {
  const { index, questions } = useQuiz();
  const question = questions[index];

  return (
    <div>
      <h4>{question.question}</h4>
      <Options />
    </div>
  );
}

export default Question;
