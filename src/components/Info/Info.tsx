import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { DataContext } from '../../DataContext';
import { Pages } from '../../types/Pages';
import { Button } from '../Button/Button';
import './Info.scss';


export const Info = () => {
  const { togglePage } = useContext(DataContext);
  const { t } = useTranslation();

  return (
    <div className="info">
      <div className="info__container">
        <h1 className="info__title">
          {t('title')}
        </h1>

        <div className="info__content">
          <p className="info__text">
            {t('description_1')}
          </p>
                  
          <p className="info__text">
            {t('description_2')}
          </p>
              
          <p className="info__text">        
            {t('description_3')}
          </p>
        </div>  

        <Button
          text="button_to_test"
          handler={() => togglePage(Pages.test)}
        />
      </div>      
    </div>
  );
};
