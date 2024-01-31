import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { localStorageService } from '../../services/localStorageService';
import { ButtonTypes } from '../../types/ButtonTypes';
import { Questions } from '../Questions/Questions';
import { Button } from '../Button/Button';
import './TestPage.scss';

export const TestPage = () => {
  const [name, setName] = useState('');
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
  
    if (name.trim()) {
      setUser(name);
      localStorageService.setName(name);
      setTesting(true);
    }     
  
    setName('');
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div className="test">
      <div className="test__container">
        {user && !testing && (
          <div>
            <p className="test__message">
              {t('saved_data')}<strong>{user}</strong>
            </p>

            <div className="test__buttons">
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
            <p className="test__message">
              {t('input_name')}
            </p>

            <form className="test__buttons" onSubmit={handleNameSubmit}>
              <input 
                type="text"
                className="test__input"
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
