import { createContext, useCallback, useContext } from "react";
import { useStates } from "@hooks/useStates";
import type { City } from "@components/CityItem";

type CityProviderState = {
  isLoading: boolean;
  currentCity: City | null;
};
type CityContextValue = CityProviderState & {
  getCityById(id: string): Promise<void>;
};

const CityContext = createContext({} as CityContextValue);

const cityCache = new Map();

// eslint-disable-next-line react-refresh/only-export-components
export const useCity = () => useContext(CityContext);

function CityProvider({ children }: { children: React.ReactNode }) {
  const [{ currentCity, isLoading }, dispatch] = useStates({
    currentCity: null,
    isLoading: false,
  } as CityProviderState);

  const getCityById = useCallback(
    async (id: string) => {
      if (cityCache.has(id)) {
        return dispatch({ currentCity: cityCache.get(id) });
      }
      try {
        dispatch({ isLoading: true });
        const res = await fetch(`http://localhost:5000/cities/${id}`);
        const city: City = await res.json();
        cityCache.set(id, city);
        dispatch({ currentCity: city, isLoading: false });
      } catch (error) {
        console.error(error);
        dispatch({ currentCity: null, isLoading: false });
      }
    },
    [dispatch]
  );

  return (
    <CityContext.Provider value={{ currentCity, getCityById, isLoading }}>
      {children}
    </CityContext.Provider>
  );
}

export default CityProvider;
