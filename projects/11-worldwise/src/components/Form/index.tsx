// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

// Import installed packages
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
// Import components
import Button from "@components/Button";
import Message from "@components/Message";
import Spinner from "@components/Spinner";
import BackButton from "@components/BackButton";
import type { City } from "@components/CityItem";
// Import hooks
import { useFetch } from "@hooks/useFetch";
import { useStates } from "@hooks/useStates";
import { useLatlngParams } from "@hooks/useLatlngParams";
import { useCities } from "@/providers/CitiesProvider";
// Import utils functions
import { fetchCityByLatlng } from "@utils/api";
import { convertToEmoji } from "@utils/convertToEmoji";
// Import css files
import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.min.css";

const initialStates = {
  date: new Date(),
  emoji: "",
  notes: "",
  country: "",
  cityName: "",
};

function Form() {
  const navigate = useNavigate();
  const [lat, lng] = useLatlngParams();
  const [values, dispatch] = useStates(initialStates);
  const { createCityAction, isLoading: citiesIsLoading } = useCities();
  const {
    data: cityData,
    error,
    isLoading,
  } = useFetch(`city/${lat}/${lng}`, fetchCityByLatlng);
  const { cityName, emoji, notes, date } = values;

  useEffect(() => {
    if (!cityData || isLoading) return;
    dispatch({
      country: cityData.countryName,
      cityName: cityData.city || cityData.locality,
      emoji: convertToEmoji(cityData.countryCode),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityData, isLoading]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleChange(e: any) {
    dispatch({ [e.target.id]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const newCity: Omit<City, "id"> = { ...values, position: { lat, lng } };
      const emptyField = Object.entries(newCity).find(([, value]) => !value);
      if (emptyField) {
        throw new Error(`Please fill up the ${emptyField[0]} field.`);
      }
      await createCityAction(newCity);
      navigate("/app/cities");
    } catch (error) {
      alert((error as Error).message);
    }
  }

  if (isLoading) return <Spinner />;
  if (error) return <Message message={error.message} />;
  if (!lat || !lng)
    return <Message message="Start by clicking somewhere on the map" />;

  return (
    <form
      className={`${styles.form} ${
        citiesIsLoading ? styles.loading : ``
      }`.trim()}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input id="cityName" value={cityName} onChange={handleChange} />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          dateFormat="MMM dd, yyyy"
          onChange={(date) => date && dispatch({ date })}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea id="notes" onChange={handleChange} value={notes} />
      </div>

      <div className={styles.buttons}>
        <Button type="submit">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
