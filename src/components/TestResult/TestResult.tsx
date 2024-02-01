import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Pages } from '../../types/Pages';
import { ButtonTypes } from '../../types/ButtonTypes';
import { DataContext } from '../../DataContext';
import { localStorageService } from '../../services/localStorageService';
import { apiService } from '../../services/apiService';
import { Loader } from '../Loader/Loader';
import { ResultData } from '../ResultData/ResultData';
import { Button } from '../Button/Button';
import './TestResult.scss';
import { isEmailValid } from '../../utils/validator';

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

    if (!email.trim() || isEmailValid(email)) {
      setLoading(true);

      const user = localStorageService.getName() || 'Name Error';
      const lang = i18n.language.slice(0, 2);
      
      const userResult = {
        user,
        email: email.trim(),
        userAnswers,
        lang,
      };

      apiService.sendResult(userResult)
        .then(() => {
          localStorageService.removeUser();
          setEmail('');
          setMessage(t('test_success'));
          setTimeout(() => {
            setMessage('');
            togglePage(Pages.info);
            window.scrollTo(0, 0);
          }, 4000);
        })
        .catch((error) => {
          console.error(error);
          setMessage(t('test_error'));
          setTimeout(() => {
            setMessage('');
          }, 4000);
        })
        .finally(() => setLoading(false));  
    } else {
      setMessage(t('email_input_error'));
      setTimeout(() => {
        setMessage('');
      }, 4000);
}
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  return (
    <div className="test-result">
      <h1 className="test-result__title">
        {t('test_result')}
      </h1>

      <ResultData userAnswers={userAnswers} />

      <p className="test-result__text">
        {t('result_page_text_1')}
      </p>

      <p className="test-result__text">
        {t('result_page_text_2')}
      </p>

      <div className="test-result__confirm">
        {!message && (
          <div>
            {loading ? (
              <Loader/>
            ) : (
              <form 
                className="test-result__form" 
                onSubmit={handleFinishTest}
              >
                <input 
                  type="text"
                  className="test-result__input"
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
          <p className="test-result__message">
            {message}
          </p>
        )} 
      </div>
    </div>
  );
};
