import Spinner from "@components/Spinner";
import Message from "@components/Message";
import CityItem from "@components/CityItem";
import { useCities } from "@/providers/CitiesProvider";
import styles from "./CityList.module.css";

function CityList() {
  const { data: cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities?.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }

  return (
    <ul className={styles.cityList}>
      {cities?.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
