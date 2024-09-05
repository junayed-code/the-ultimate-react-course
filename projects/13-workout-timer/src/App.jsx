import { useMemo, useState } from "react";
import Calculator from "./Calculator";
import ToggleSounds from "./ToggleSounds";
import Clock from "./Clock";

function App() {
  const [allowSound, setAllowSound] = useState(true);
  // Will be be AM or PM
  const [partOfDay, setPartOfDay] = useState(() => {
    return new Date().toLocaleString().slice(-2);
  });

  const workouts = useMemo(
    () => [
      {
        name: "Full-body workout",
        numExercises: partOfDay === "AM" ? 9 : 8,
      },
      {
        name: "Arms + Legs",
        numExercises: 6,
      },
      {
        name: "Arms only",
        numExercises: 3,
      },
      {
        name: "Legs only",
        numExercises: 4,
      },
      {
        name: "Core only",
        numExercises: partOfDay === "AM" ? 5 : 4,
      },
    ],
    [partOfDay]
  );

  return (
    <main>
      <h1>Workout timer</h1>
      <time>
        For your workout on <Clock setPartOfDay={setPartOfDay} />
      </time>
      <ToggleSounds allowSound={allowSound} setAllowSound={setAllowSound} />
      <Calculator workouts={workouts} allowSound={allowSound} />
    </main>
  );
}

export default App;
