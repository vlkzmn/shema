import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { DataContext } from '../../DataContext';
import { Pages } from '../../types/Pages';
import { ButtonTypes } from '../../types/ButtonTypes';
import { Button } from '../Button/Button';
import './InfoPage.scss';

export const InfoPage = () => {
  const { togglePage } = useContext(DataContext);
  const { t } = useTranslation();

  const handleTogglePage = useCallback(() => togglePage(Pages.test), []);

  return (
    <div className="info-page">
      <div className="info-page__container">
        <h1 className="info-page__title">
          {t('title')}
        </h1>

        <div className="info-page__content">
          <p className="info-page__text">
            {t('description_1')}
          </p>
                  
          <p className="info-page__text">
            {t('description_2')}
          </p>
              
          <p className="info-page__text">        
            {t('description_3')}
          </p>
        </div>  

        <Button
          type={ButtonTypes.button}
          text="button_to_test"
          handler={handleTogglePage}
        />
      </div>      
    </div>
  );
};
