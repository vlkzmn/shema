import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { Pages } from '../../types/Pages';
import { ButtonTypes } from '../../types/ButtonTypes';
import { DataContext } from '../../DataContext';
import { localStorageService } from '../../services/localStorageService';
import { Loader } from '../Loader/Loader';
import { ResultData } from '../ResultData/ResultData';
import { Button } from '../Button/Button';
import './Result.scss';
import { resultsService } from '../../services/resultsService';

type Props = {
  userAnswers: number[];
}

export const TestResult: React.FC<Props> = ({ userAnswers }) => {
  const { togglePage } = useContext(DataContext);
  const { t, i18n } = useTranslation(); 
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);   

  const handleFinishTest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    setLoading(true);
    setMessage('');

    const user = localStorageService.getName() || 'name error';
    const lang = i18n.language.slice(0, 2);
    
    const userResult = {
      user,
      email,
      userAnswers,
      lang,
    };

    resultsService.sendResult(userResult)
    // axios.post('https://shema-api.onrender.com/result', userResult)
    // axios.post('http://localhost:5000/result', userResult)
    .then(() => {
      localStorageService.removeUser();
      setEmail('');
      setMessage(t('test_success'));
      setTimeout(() => {
        setMessage('');
        togglePage(Pages.info);
      }, 5000);
    })
    .catch((error) => {
      console.error(error);
      setMessage(t('test_error'));
      setTimeout(() => {
        setMessage('');
      }, 5000);
    })
    .finally(() => setLoading(false));    
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  return (
    <div className="result">
      <h1 className="result__title">
        {t('test_result')}
      </h1>

      <ResultData userAnswers={userAnswers} />

      <p className="result__text">
        {t('result_page_text_1')}
      </p>

      <p className="result__text">
        {t('result_page_text_2')}
      </p>

      <div className="result__confirm">
        {!message && (
          <div>
            {loading ? (
              <Loader/>
            ) : (
              <form 
                className="result__form" 
                onSubmit={handleFinishTest}
              >
                <input 
                  type="email"
                  className="result__input"
                  value={email}
                  placeholder={t('placeholder_email')}
                  onChange={handleChangeEmail}
                />

                <Button
                  type={ButtonTypes.submit}
                  text="button_complete"                      
                />
              </form>
            )}
          </div>
        )}  

        {!!message && (
          <p className="result__message">
            {message}
          </p>
        )} 
      </div>
    </div>
  );
};
