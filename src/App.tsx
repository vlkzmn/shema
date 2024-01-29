import { Suspense, useContext } from 'react';
import classNames from 'classnames';

import { DataContext } from './DataContext';
import { Header } from './components/Header/Header';
import './App.scss';

import { Info } from './components/Info/Info';
import { Test } from './components/TestPage/Test';
import { Results } from './components/ResultsList/ResultsList';
import { Loader } from './components/Loader/Loader';

export const App = () => {
  const { isDarkTheme, page} = useContext(DataContext);

  const renderPage = () => {
    switch (page) {
      case 'test':
        return <Test />;
      case 'result':
        return <Results />;
      default:
        return <Info />;
    }
  };

  return (
    <Suspense fallback={<Loader />}>
      <div className={classNames('app', { 'app--dark': isDarkTheme })}>
        <Header />
        
        {renderPage()}
      </div> 
    </Suspense>     
  );
};

// import { Suspense, useContext } from 'react';
// import classNames from 'classnames';

// import { DataContext, DataProvider } from './DataContext';
// import { Loader } from './components/Loader/Loader';
// import { Header } from './components/Header/Header';
// import './App.scss';
// import './i18n.js';


// export const App = () => {
//   const { isDarkTheme } = useContext(DataContext);
//   console.log(isDarkTheme);

//   return (
//     <Suspense fallback={<Loader />}>
//       <DataProvider>
//         <div className={classNames('app', { 'app--dark': isDarkTheme })}>
//           <Header />
//           fggfhf
//         </div>
//       </DataProvider>      
//     </Suspense>    
//   );
// }
