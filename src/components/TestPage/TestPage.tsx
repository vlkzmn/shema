import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { localStorageService } from '../../services/localStorageService';
import { ButtonTypes } from '../../types/ButtonTypes';
import { Questions } from '../Questions/Questions';
import { Button } from '../Button/Button';
import './TestPage.scss';
import { isNameValid } from '../../utils/validator';

export const TestPage = () => {
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState<string | null>(localStorageService.getName());
  const [testing, setTesting] = useState(false);
  const { t } = useTranslation();

  const handleNewTest = useCallback(() => {
    localStorageService.removeUser();
    setUser('');
  }, []);

  const handleContinueTest = useCallback(() => {
    setTesting(true);
  }, []);

  const handleNameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (isNameValid(name)) {
      setUser(name);
      localStorageService.setName(name);
      setTesting(true);
      setName('');
      setErrorMessage('');
    } else {
      setErrorMessage('input_error_message');
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div className="test-page">
      <div className="test-page__container">
        {user && !testing && (
          <div>
            <p className="test-page__message">
              {t('saved_data')}<strong>{user}</strong>
            </p>

            <div className="test-page__buttons">
              <Button
                type={ButtonTypes.button}
                text="button_continue_test"
                handler={handleContinueTest}
              />

              <Button
                type={ButtonTypes.button}
                text="button_start_new_test"
                handler={handleNewTest}
              />
            </div>
          </div>
        )}

        {!user && !testing && (
          <div>
            <p className="test-page__message">
              {t('input_name')}
            </p>

            <form className="test-page__buttons" onSubmit={handleNameSubmit}>
              <input 
                type="text"
                className="test-page__input"
                value={name}
                placeholder={t('placeholder_name')}
                onChange={handleNameChange}
                autoFocus
              />

              <Button
                type={ButtonTypes.submit}
                text="button_submit"
              />
            </form>

            {errorMessage && (
              <p className="test-page__message test-page__message--error">
                {t(errorMessage)}
              </p>
            )}            
          </div>
        )}       

        {testing && (
          <div>
            <Questions />
          </div>
        )}
      </div>      
    </div>
  );
};
