import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DataContext } from '../../DataContext';
import { localStorageService } from '../../services/localStorageService';
import { Questions } from '../Questions/Questions';
import './Test.scss';
import { Button } from '../Button/Button';

export const Test = () => {
  const { isDarkTheme } = useContext(DataContext);
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [testing, setTesting] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const savedUser = localStorageService.getName();

    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleSubmit = () => {
    if (name.trim()) {
      setUser(name);
      localStorageService.setName(name);
      setTesting(true);
    }     
    
    setName('');
  };

  const handleNewTest = () => {
    localStorageService.removeUser();
    setUser('');  
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
                text="button_continue_test"
                handler={() => setTesting(true)}
              />

              <Button
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

            <div className="test__buttons">
              <input 
                type="text"
                className="test__input"
                value={name}
                placeholder={t('placeholder_name')}
                onChange={(event) => setName(event.target.value)}
                autoFocus
              />

              <Button
                text="button_submit"
                handler={handleSubmit}
              />
            </div>
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
