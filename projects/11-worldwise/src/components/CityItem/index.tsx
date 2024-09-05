import { Link } from "react-router-dom";

import { formatDate } from "@utils/formatDate";
import { useCity } from "@/providers/CityProvider";
import { useCities } from "@/providers/CitiesProvider";
import styles from "./CityItem.module.css";

export type City = {
  id: string;
  cityName: string;
  country: string;
  emoji: string;
  date: string | Date;
  notes: string;
  position: { lat: number; lng: number };
};

type CityItemProps = { city: City };

function CityItem({ city }: CityItemProps) {
  const { deleteCityAction } = useCities();
  const { currentCity } = useCity();
  const { id, emoji, date, cityName, position } = city;

  const to = `${city.id}?lat=${position.lat}&lng=${position.lng}`;
  const activeClass = id === currentCity?.id ? styles["cityItem--active"] : "";
  const cn = `${styles.cityItem} ${activeClass}`.trim();

  function handleDeleteCity(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    deleteCityAction(id);
  }

  return (
    <li>
      <Link to={to} className={cn}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleDeleteCity}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
