import React, { createContext, useMemo, useState } from 'react';
import { localStorageService } from './services/localStorageService';

export const DataContext = createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
  page: 'info',
  togglePage: (page: string) => {},
});

type Props = {
  children: React.ReactNode;
}

export const DataProvider: React.FC<Props> = ({ children }) => {
  const savedTheme = localStorageService.getTheme();
  const isDark = savedTheme === 'dark';

  const [isDarkTheme, setIsDarkTheme] = useState(isDark);
  const [page, setPage] = useState('info');

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  const togglePage = (page: string) => {
    setPage(page);
  };

  const contextValue = useMemo(() => ({
    isDarkTheme,
    toggleTheme,
    page,
    togglePage,
  }), [isDarkTheme, page]);

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
}
