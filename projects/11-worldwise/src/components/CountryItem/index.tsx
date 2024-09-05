import styles from "./CountryItem.module.css";

export type Country = {
  id: string;
  emoji: string;
  country: string;
};

type CountryItemProps = { country: Country };

function CountryItem({ country }: CountryItemProps) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
