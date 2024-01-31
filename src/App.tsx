import { useContext } from 'react';
import classNames from 'classnames';

import { Pages } from './types/Pages';
import { DataContext } from './DataContext';
import { Header } from './components/Header/Header';
import { InfoPage } from './components/InfoPage/InfoPage';
import { TestPage } from './components/TestPage/TestPage';
import { ResultsPage } from './components/ResultsPage/ResultsPage';
import './App.scss';

export const App = () => {
  const { isDarkTheme, page } = useContext(DataContext);

  const renderPage = () => {
    switch (page) {
      case Pages.test:
        return <TestPage />;
      case Pages.results:
        return <ResultsPage />;
      default:
        return <InfoPage />;
    }
  };

  const currentPage = renderPage();

  return (
    <div className={classNames('app', { 'app--dark': isDarkTheme })}>
      <Header />
      
      {currentPage}
    </div> 
  );
};
