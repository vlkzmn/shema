import React, { createContext, useMemo, useState } from 'react';
import { localStorageService } from './services/localStorageService';
import { Pages } from './types/Pages';
import { getInitialPage, getInitialTheme } from './utils/contextStartValue';

export const DataContext = createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
  page: Pages.info,
  togglePage: (page: Pages) => {},
});

type Props = {
  children: React.ReactNode;
}

export const DataProvider: React.FC<Props> = ({ children }) => {
  const initialtheme = getInitialTheme();
  const initialPage = getInitialPage();
  const [isDarkTheme, setIsDarkTheme] = useState(initialtheme);
  const [page, setPage] = useState(initialPage);

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  const togglePage = (page: Pages) => {
    setPage(page);
    localStorageService.setPage(page);
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
