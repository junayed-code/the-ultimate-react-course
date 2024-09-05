import Main from "./components/Main";
import Timer from "./components/Timer";
import Error from "./components/Error";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Question from "./components/Question";
import Progress from "./components/Progress";
import NextButton from "./components/NextButton";
import StartScreen from "./components/StartScreen";
import FinishScreen from "./components/FinishScreen";
import { useQuiz } from "./providers/QuizProvider";

function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Timer />
            <NextButton />
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
