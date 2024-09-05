/* eslint-disable react/prop-types */
import { useReducer } from "react";
import clickSound from "./ClickSound.m4a";

const playSound = function (allowSound) {
  if (!allowSound) return;
  const sound = new Audio(clickSound);
  sound.play();
};

/**@typedef {{type: 'workout/set-value', payload: Partial<WorkoutState>} | {type: 'duration/increment'} | {type: 'duration/decrement'}} WorkoutStateAction */
/**
 * @typedef WorkoutState
 * @property {number} numExercises
 * @property {number} sets
 * @property {number} speed
 * @property {number} breakDuration
 * @property {number} duration
 */

/**
 * @param {WorkoutState} workoutState
 * @returns {WorkoutState}
 */
const calcDuration = (workoutState) => {
  const { sets, speed, numExercises, breakDuration } = workoutState;
  const duration =
    (numExercises * sets * speed) / 60 + (sets - 1) * breakDuration;
  return { ...workoutState, duration };
};

/**@type {import("react").Reducer<WorkoutState, WorkoutStateAction>} */
const reducer = (state, action) => {
  switch (action.type) {
    case "workout/set-value": {
      return calcDuration({ ...state, ...action.payload });
    }
    case "duration/increment":
      return { ...state, duration: Math.floor(state.duration) + 1 };
    case "duration/decrement":
      if (state.duration === 0) return state;
      return { ...state, duration: Math.ceil(state.duration) - 1 };
    default:
      return state;
  }
};

/**@type {WorkoutState} */
const initialState = {
  sets: 3,
  speed: 90,
  duration: 0,
  numExercises: 0,
  breakDuration: 5,
};

function Calculator({ workouts, allowSound }) {
  const [state, dispatch] = useReducer(
    reducer,
    calcDuration({
      ...initialState,
      numExercises: workouts[0].numExercises,
    })
  );
  const { sets, speed, numExercises, breakDuration, duration } = state;
  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  const handleChange = (e) => {
    dispatch({
      type: "workout/set-value",
      payload: { [e.target.name]: Number(e.target.value) },
    });
    playSound(allowSound);
  };
  const handleDurationIncrement = () => {
    dispatch({ type: "duration/increment" });
    playSound(allowSound);
  };
  const handleDurationDecrement = () => {
    dispatch({ type: "duration/decrement" });
    playSound(allowSound);
  };

  return (
    <>
      <form>
        <div>
          <label>Type of workout</label>
          <select
            name="numExercises"
            value={numExercises}
            onChange={handleChange}
          >
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>How many sets?</label>
          <input
            min="1"
            max="5"
            value={sets}
            type="range"
            name="sets"
            onChange={handleChange}
          />
          <span>{sets}</span>
        </div>
        <div>
          <label>How fast are you?</label>
          <input
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            name="speed"
            onChange={handleChange}
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label>Break length</label>
          <input
            type="range"
            min="1"
            max="10"
            value={breakDuration}
            name="breakDuration"
            onChange={handleChange}
          />
          <span>{breakDuration} minutes/break</span>
        </div>
      </form>
      <section>
        <button onClick={handleDurationDecrement}>–</button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds}
        </p>
        <button onClick={handleDurationIncrement}>+</button>
      </section>
    </>
  );
}

export default Calculator;
