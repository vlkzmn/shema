import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import axios from 'axios';

import { Pages } from '../../types/Pages';
import { Result } from '../../types/Result';
import { DataContext } from '../../DataContext';
import { localStorageService } from '../../services/localStorageService';
import './Result.scss';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';

const QUESTION_INDEX = 'YSQ_S3_schema_';

type Props = {
  userAnswers: number[];
  setShema: React.Dispatch<React.SetStateAction<number>> | null;
}

export const TestResult: React.FC<Props> = ({ userAnswers, setShema }) => {
  const { isDarkTheme, page, togglePage } = useContext(DataContext);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { t, i18n } = useTranslation();
  const lang = i18n.language.slice(0, 2);
  let result: Result[] = [];
  // const users: number[] = [];

  // for (let i = 0; i < 90; i++) {
  //   users.push(Math.floor(Math.random() * 6) + 1);
  // }

  for (let i = 0; i < 18; i++) {
    const answers: number[] = [];
    for (let j = i; j < 90; j = j + 18) {
      // answers.push(users[j]);
      answers.push(userAnswers[j]);
    }

    const shema = `${QUESTION_INDEX}${i + 1}`;
    const sum = answers.reduce((sum, item) => sum + item);
    const avarage = sum / 5;
    const percent = Math.floor(((sum - 5) / 25) * 100);
    const sumFiveSix = answers
      .filter(item => item > 4)
      .reduce((sum, item) => sum + item, 0);    

    result[i] = {
      shema,
      answers,
      sum,
      avarage,
      percent,
      sumFiveSix,
    };
  }

  const handleFinishTest = () => {
    setLoading(true);
    setMessage('');

    const user = localStorageService.getName();
    const userResult = {
      user,
      email,
      userAnswers,
      lang,
    };

    axios.post('https://shema-api.onrender.com/result', userResult)
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

  const handleOpenShema = (shema: number) => {
    if (setShema) {
      setShema(shema + 1);
    }        
  };

  return (
    <div className="result">
      <div className="result__content">
        <div className="result__list">
          {result.map((item, i) => (
            <div 
              key={item.shema} 
              className={cn(
                'result__list-item',
                {'result__list-item--danger': (item.percent > 50 || item.sumFiveSix > 10) && page === Pages.result},
              )}
            >
              <h2 className="result__shema">
                {page === Pages.result ? (
                  <button
                    type='button'
                    className={cn(
                      'result__link', 
                      {'result__link--dark': isDarkTheme},
                      {'result__link--danger': (item.percent > 50 || item.sumFiveSix > 10) && page === Pages.result}
                    )}
                    onClick={() => handleOpenShema(i)}
                  >
                    {t(item.shema)}
                  </button>                  
                ) : 
                  t(item.shema)
                }
              </h2>

              <ul>
                <li>
                  <span className="result__list-value">{t('answers')}</span>
                  <strong>{item.answers.join(' . ')}</strong>
                </li>

                <li>
                  <span className="result__list-value">{t('sum')}</span>
                  <strong>{item.sum}</strong>
                </li>

                {/* <li>
                  <span className="result__list-value">{t('avarage')}</span>
                  <strong>{item.avarage}</strong>
                </li> */}

                <li>
                  <span className="result__list-value">{t('percent')}</span>
                  <strong>{item.percent}</strong>
                </li>

                <li>
                  <span className="result__list-value">{t('sum5and6')}</span>
                  <strong>{item.sumFiveSix}</strong>
                </li>
              </ul> 
            </div>          
          ))}
        </div>       

        <table className="result__table">
          <thead>
            <tr>
              <th>{t('shema')}</th>
              <th>{t('answers')}</th>
              <th>{t('sum')}</th>
              {/* <th>{t('avarage')}</th> */}
              <th>{t('percent')}</th>
              <th>{t('sum5and6')}</th>
            </tr>
          </thead>
          <tbody>
            {result.map((item, i) => (
              <tr 
                key={item.shema} 
                className={cn(
                  'result__list-item',
                  {'result__list-item--danger': (item.percent > 50 || item.sumFiveSix > 10) && page === Pages.result}
                )
              }>
                <td className="result__cell-start">
                  {page === Pages.result ? (
                    <button
                      type='button'
                      className={cn(
                        'result__link', 
                        {'result__link--dark': isDarkTheme},
                        {'result__link--danger': (item.percent > 50 || item.sumFiveSix > 10) && page === Pages.result}
                      )}
                      onClick={() => handleOpenShema(i)}
                    >
                      {t(item.shema)}
                    </button>                  
                  ) : 
                    t(item.shema)
                  }
                </td>
                <td>{item.answers.join('__')}</td>
                <td>{item.sum}</td>
                {/* <td>{item.avarage}</td> */}
                <td>{item.percent}</td>
                <td>{item.sumFiveSix}</td>
              </tr>    
            ))}
          </tbody>        
        </table>
      </div>            

      {page !== Pages.result && (
        <>
          <p className="result__text">
            Детальный обзор результатов вы можете получить у специалиста который вас направил на тестирование, не стоит самостоятельно трактовать результаты.
          </p>

          <p className="result__text">
            Если Вам надо отправить результат на электронную почту введите ваш e-mail, если нет, то оставьте поле ввода пустым. Для завершения теста и сохранения результатов нажмите 'Завершить' и дождитесть сообщения об успешном завершении. После, Вы будите перенапрвлены на начальную страницу теста.
          </p>

          <div className="result__confirm">
            <div>
              {loading ? (
                <Loader/>
              ) : (
                <div className="result__form">
                  <input 
                    type="email"
                    className="result__input"
                    value={email}
                    placeholder={t('placeholder_email')}
                    onChange={(event) => setEmail(event.target.value)}
                  />

                  <Button
                    text="button_complete"
                    handler={handleFinishTest}
                  />
                </div>
              )}
            </div>        

            {!!message && (
              <p className="result__message">
                {message}
              </p>
            )} 
          </div>
        </>        
      )}       
    </div>
  );
};
