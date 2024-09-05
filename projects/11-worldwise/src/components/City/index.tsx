import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "@utils/formatDate";
import { useCity } from "@providers/CityProvider";

import Message from "@components/Message";
import Spinner from "@components/Spinner";
import BackButton from "@components/BackButton";
import styles from "./City.module.css";

function City() {
  const { id } = useParams();
  const { currentCity, isLoading, getCityById } = useCity();

  useEffect(
    function () {
      if (typeof id === "string") getCityById(id);
    },
    [id, getCityById]
  );

  if (isLoading) return <Spinner />;
  if (!currentCity) return <Message message="No City Data Found!" />;
  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
