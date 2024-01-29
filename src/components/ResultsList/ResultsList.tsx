import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { UsersResults } from '../../types/UsersResults';
import { ButtonTypes } from '../../types/ButtonTypes';

import { resultsService } from '../../services/resultsService';
import { authService } from '../../services/authService';
import { localStorageService } from '../../services/localStorageService';

import { ResultData } from '../ResultData/ResultData';
import { Shema } from '../Shema/Shema';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';

import './ResultsList.scss';

export const Results: React.FC = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [password, setPassword] = useState('');
  const [usersResults, setUsersResults] = useState<UsersResults[]>([]);
  const [user, setUser] = useState<UsersResults | null>(null);
  const [shema, setShema] = useState(0);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [scroll, setScroll] = useState(0);

  const fetchData = useCallback(() => {
    resultsService.getAll()
      .then((data) => {
        setUsersResults(data);
      })
      .catch(() => {
        setIsAuth(false);
      })
      .finally(() => setLoading(false));
  }, []);

  // function fetchData() {
  //   resultsService.getAll()
  //     .then((data) => {
  //       setUsersResults(data);
  //     })
  //     .catch(() => {
  //       setIsAuth(false);
  //     })
  //     .finally(() => setLoading(false));

    // setTimeout(() => {
    //   resultsService.getAll()
    //     .then((data) => {
    //       setUsersResults(data);
    //     })
    //     .catch(error => {
    //       console.error('Error loading data from server', error);
    //     })
    //     .finally(() => setLoading(false));
    // }, 1000);    
  // }
  
  useEffect(() => {
    const accessToken = localStorageService.getAccessToken();

    if (accessToken) {
      fetchData();
    } else {
      setLoading(false);
      setIsAuth(false);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    authService.login(password)
      .then((data) => {
        localStorageService.setAccessToken(data);  
        fetchData();
        setIsAuth(true);
      })
      .catch(error => console.log(error));

    // setIsAuth(true);
  };

  const handleOpenUser = (user: UsersResults) => {
    setScroll(window.scrollY);
    setUser(user);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  };

  const handleBackToList = () => {
    setUser(null);
    setTimeout(() => {
      window.scrollTo(0, scroll);
    }, 0);
  };

  const handleBackToResult = () => {
    setShema(0);
  };

  return (
    <div className="results">
      <div className="results__container">
        {loading && (
          <div className="results__loader">
            <Loader/>
          </div>
        )}

        {!isAuth && !user && (
          <>
            <p className="results__message">
              {t('input_password')}
            </p>

            <form className="results__buttons" onSubmit={handleSubmit}>
              <input 
                type='password'
                className="results__input"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoFocus
                autoComplete='true'
              />

              <Button
                type={ButtonTypes.submit}
                text="button_submit"
              />
            </form>
          </>        
        )} 

        {isAuth && !user && !loading && (
          <>
            <h1 className="results__title">
              {t('title_results_list')}
            </h1>

            <table className="results__table">
              <thead>
                <tr>
                  <th>№</th>
                  <th>{t('name')}</th>
                  <th>{t('date')}</th>
                </tr>
              </thead>
              <tbody>
                {usersResults.map((item, i) => {
                  const date = new Date(item.createdAt);

                  const formattedDate = date.toLocaleDateString("ua-UA", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  });

                  return (
                  <tr 
                    key={item.id}
                    className="results__row"
                    onClick={() => handleOpenUser(item)}
                  >
                    <td>{i + 1}</td>
                    <td className="results__cell-start">{item.user}</td>
                    <td>{formattedDate}</td>
                  </tr>    
                )})}
              </tbody>        
            </table> 
          </>        
        )}

        {user && !shema && (
          <div className="results__user">
            <h1 className="results__user-name">
              {t('result_for') + user.user}
            </h1>

            <ResultData 
              userAnswers={user.userAnswers} 
              setShema={setShema}
            />

            <Button
              type={ButtonTypes.button}
              text="button_back_to_list_results"
              handler={handleBackToList}
            />
          </div>            
        )}

        {!!shema && (
          <Shema 
            shema={shema} 
            handleBackToResult={handleBackToResult}
            scroll={window.scrollY}
          />
        )}
      </div>      
    </div>
  );
};
