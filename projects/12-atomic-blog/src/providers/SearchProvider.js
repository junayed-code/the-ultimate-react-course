import { createContext, useContext, useState } from "react";

/**
 * @typedef SearchContextValue
 * @property {string} searchQuery
 * @property {React.Dispatch<React.SetStateAction<string>>} setSearchQuery
 */

/**@type {React.Context<SearchContextValue>} */
const SearchContext = createContext({});

export const useSearchContext = () => useContext(SearchContext);

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");

  /**@type {SearchContextValue} */
  const value = {
    searchQuery,
    setSearchQuery,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

export default SearchProvider;
