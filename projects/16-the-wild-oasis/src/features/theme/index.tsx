import { useEffect, type ReactNode } from 'react';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';

import Button from '@/components/ui/button';
import { ThemeContext, useTheme, type Theme } from './context';
import { useLocalStorage } from '@hooks/use-local-storage';

type ThemeProviderProps = { children: ReactNode };

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, changeTheme] = useLocalStorage<Theme>('light', '__theme');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleToggleTheme = () =>
    changeTheme(theme => (theme === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, handleToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeToggleButton() {
  const { theme, handleToggleTheme } = useTheme();

  return (
    <Button $size="icon" $variant="secondary" onClick={handleToggleTheme}>
      {theme === 'light' ? <HiOutlineMoon /> : <HiOutlineSun />}
    </Button>
  );
}
