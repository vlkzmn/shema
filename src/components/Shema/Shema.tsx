import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';

import { DataContext } from '../../DataContext';
import { ShemaText } from '../../types/ShemaText';
import { ButtonTypes } from '../../types/ButtonTypes';
import { apiService } from '../../services/apiService';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import './Shema.scss';

type Props = {
  shema: number;
  handleBackToResult: () => void;
  scroll: number;
}

export const Shema: React.FC<Props> = ({ shema, handleBackToResult, scroll }) => {
  const { isDarkTheme } = useContext(DataContext);
  const [data, setData] = useState<ShemaText | null>(null);

  useEffect(() => {   
    apiService.getShema(shema)
      .then((res) => setData(res.data))
      .catch(() => {
        const errorMessage = {
          title: 'Ошибка загрузки схемы',
          text: [],
        };
        setData(errorMessage);
      })

    return () => window.scrollTo(0, scroll);
  }, []);

  const htmlString = () => {
    if (data) {
      const title = `<h1 class="shema__title">${data?.title}</h1>`;

      const result = data?.text.reduce((text, item) => {
        let paragraph = '';

        if (item.type === 'list') {
          paragraph = '<ul class="shema__list">';

          item.content.forEach(element => {
            paragraph += `<li class="shema__list-item">${element}</li>`;
          });
          
          paragraph += '</ul>';
        } else {
          paragraph = `<p class="shema__paragraph">${item.content[0]}</p>`;
        }

        return text + paragraph;
      }, title);

      return result;
    }

    return '<h1 class="shema__title">Ошибка загрузки схемы</h1>';
  };

  const htmlData = {
    __html: htmlString(),
  };

  return (
    <div className={cn(
      'shema', 
      { 'shema--dark': isDarkTheme },
    )}>
      {!data ? (
        <div className="shema__loader">
          <Loader/>
        </div>      
      ) : (
        <>
          <div dangerouslySetInnerHTML={htmlData} />

          <div className="shema__button">
            <Button
              type={ButtonTypes.button}
              text="button_back_to_result"
              handler={handleBackToResult}
            />
          </div>
        </>      
      )}    
    </div>
  );
};
