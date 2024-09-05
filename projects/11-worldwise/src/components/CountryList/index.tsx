import Spinner from "@components/Spinner";
import CountryItem, { type Country } from "@components/CountryItem";
import { useCities } from "@/providers/CitiesProvider";
import styles from "./CountryList.module.css";

function CountryList() {
  const { data: cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  const countries = cities?.reduce<Country[]>((countries, city) => {
    if (countries.map((c) => c.country).includes(city.country)) {
      return countries;
    }
    const newCountry = {
      id: city.id,
      country: city.country,
      emoji: city.emoji,
    };
    return [...countries, newCountry];
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries?.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
