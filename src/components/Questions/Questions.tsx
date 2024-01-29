import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { ButtonTypes } from '../../types/ButtonTypes';
import { DataContext } from '../../DataContext';
import { localStorageService } from '../../services/localStorageService';
import { TestResult } from '../Result/Result';
import { Button } from '../Button/Button';
import './Questions.scss';


const ANSWERS = ['1', '2', '3', '4', '5', '6'];
const TEST_NAME = 'YSQ_S3';
const TEST_LENGTH = 90;

export const Questions = () => {
  const { isDarkTheme } = useContext(DataContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [answer, setAnswer] = useState('');
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const { t } = useTranslation();

  console.log('123');

  useEffect(() => {
    const savedAnswers = localStorageService.getAnswers();

    if (savedAnswers) {
      setCurrentQuestionIndex(savedAnswers.length + 1);
      setUserAnswers(savedAnswers);
    }
  }, []);

  const handleAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = () => {    
    if (answer) {
      const answers = [...userAnswers, +answer];
      setUserAnswers(answers);
      setCurrentQuestionIndex(current => current + 1);
      setAnswer('');
      localStorageService.setAnswers(answers);
    }    
  };

  const handlePrevQuestion = () => {
    setAnswer('');
    const answers = [...userAnswers];
    answers.pop();
    setUserAnswers(answers);
    localStorageService.setAnswers(answers);
    setCurrentQuestionIndex(current => current - 1);
  };

  const question =`${currentQuestionIndex}. ` + t(`${TEST_NAME}_question_${currentQuestionIndex}`);
  const progressPercent = (currentQuestionIndex - 1) * 100 / 90;

  return (
    <div className="questions">
      <div className="questions__progress">
        <div
          style={{ width: `${progressPercent}%` }}
          className={cn(
            'questions__progress-current', 
            { 'questions__progress-current--dark': isDarkTheme },
          )}
        />
      </div>

      {(currentQuestionIndex <= TEST_LENGTH) ? (
        <>
          <h2 className="questions__title">
            {question}
          </h2>

          <div className="questions__form">
            {ANSWERS.map(item => (
              <label key={item} className="questions__label">
                <input
                  className="questions__input"
                  type="radio"
                  value={item}
                  checked={answer === item}
                  onChange={handleAnswer}
                />

                <span className={cn(
                  'questions__custom-radio-button', 
                  { 'questions__custom-radio-button--dark': isDarkTheme },
                )} />

                {t(`answer_${item}`)}
              </label>
            ))}

            <div className="questions__button-box">
              <Button
                type={ButtonTypes.button}
                text="button_next"
                handler={handleSubmit}
              />

              {userAnswers.length > 0 && (
                <Button
                  type={ButtonTypes.button}
                  text="button_prev"
                  handler={handlePrevQuestion}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <TestResult userAnswers={userAnswers} />     
      )}     
    </div>
  );
}
