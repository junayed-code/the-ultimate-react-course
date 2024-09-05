import { createContext, useContext, useEffect } from "react";

import { useFetch } from "@hooks/useFetch";
import { useStates } from "@hooks/useStates";
import { createCity, deleteCity, fetchCities } from "@utils/api";
import type { City } from "@components/CityItem";

interface CitiesContextValue extends ReturnType<typeof useFetch<City[]>> {
  createCityAction(city: Omit<City, "id">): Promise<void>;
  deleteCityAction(id: string): Promise<void>;
}

const CitiesContext = createContext<CitiesContextValue>(
  {} as CitiesContextValue
);

// eslint-disable-next-line react-refresh/only-export-components
export const useCities = () => useContext(CitiesContext);

export function CitiesProvider({ children }: { children: React.ReactNode }) {
  const cities = useFetch("cities", fetchCities);
  const [{ isLoading }, dispatch] = useStates({ isLoading: false });

  const createCityAction = async (city: Omit<City, "id">) => {
    try {
      dispatch({ isLoading: true });
      await createCity(city);
      await cities.refetch();
    } finally {
      dispatch({ isLoading: false });
    }
  };

  const deleteCityAction = async (id: string) => {
    try {
      dispatch({ isLoading: true });
      await deleteCity(id);
      await cities.refetch();
    } finally {
      dispatch({ isLoading: false });
    }
  };

  useEffect(() => {
    dispatch({ isLoading: cities.isLoading });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cities.isLoading]);

  return (
    <CitiesContext.Provider
      value={{ ...cities, isLoading, createCityAction, deleteCityAction }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export default CitiesProvider;
