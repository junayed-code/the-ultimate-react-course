import { createContext, useContext, type SetStateAction } from 'react';

export type Theme = 'light' | 'dark';
export type ThemeContextValue = {
  theme: Theme;
  changeTheme(theme: SetStateAction<Theme>): void;
  handleToggleTheme(): void;
};

export const ThemeContext = createContext({} as ThemeContextValue);

export const useTheme = () => useContext(ThemeContext);
