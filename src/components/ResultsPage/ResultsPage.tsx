import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { UserResult } from '../../types/UserResult';
import { ButtonTypes } from '../../types/ButtonTypes';

import { apiService } from '../../services/apiService';
import { authService } from '../../services/authService';
import { localStorageService } from '../../services/localStorageService';

import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { ResultsList } from '../ResultsList/ResultsList';
import { ResultData } from '../ResultData/ResultData';
import { Shema } from '../Shema/Shema';

import './ResultsPage.scss';

export const ResultsPage: React.FC = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [password, setPassword] = useState('');
  const [usersResults, setUsersResults] = useState<UserResult[]>([]);
  const [result, setResult] = useState<UserResult | null>(null);
  const [shema, setShema] = useState(0);  
  const [loading, setLoading] = useState(true);
  const [scroll, setScroll] = useState(0);
  const [passwordInputTitle, setPasswordInputTitle] = useState('input_password');
  const { t } = useTranslation();

  const fetchResults = useCallback(() => {
    apiService.getAllResults()
      .then((data) => {
        setUsersResults(data);
      })
      .catch(() => {
        setIsAuth(false);
      })
      .finally(() => setLoading(false));
  }, []);
  
  useEffect(() => {
    const accessToken = localStorageService.getAccessToken();

    if (accessToken) {
      fetchResults();
    } else {
      setLoading(false);
      setIsAuth(false);
    }
  }, []);

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    authService.login(password)
      .then((data) => {
        localStorageService.setAccessToken(data);  
        fetchResults();
        setIsAuth(true);
        setPasswordInputTitle('input_password');
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        setPasswordInputTitle('wrong_password');
      });
  };

  const handleOpenUser = (user: UserResult) => {
    setScroll(window.scrollY);
    setResult(user);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  };

  const handleBackToList = () => {
    setResult(null);
    setTimeout(() => {
      window.scrollTo(0, scroll);
    }, 0);
  };

  const handleBackToResult = () => {
    setShema(0);
  };

  return (
    <div className="results-page">
      <div className="results-page__container">
        {loading && (
          <div className="results-page__loader">
            <Loader/>
          </div>
        )}

        {!isAuth && !result && !loading && (
          <>
            <p className="results-page__message">
              {t(passwordInputTitle)}
            </p>

            <form className="results-page__buttons" onSubmit={handleSubmit}>
              <input 
                type='password'
                className="results-page__input"
                value={password}
                onChange={handleChangePassword}
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

        {isAuth && !result && !loading && (
          <ResultsList 
            usersResults={usersResults} 
            handleOpenUser={handleOpenUser} 
          />      
        )}

        {result && !shema && (
          <div className="results-page__user">
            <h1 className="results-page__user-name">
              {t('result_for') + result.user}
            </h1>

            <ResultData 
              userAnswers={result.userAnswers} 
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
