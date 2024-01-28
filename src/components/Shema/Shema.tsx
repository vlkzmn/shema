import React, { useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import cn from 'classnames';

import { DataContext } from '../../DataContext';
import { ShemaText } from '../../types/ShemaText';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import './Shema.scss';
import { ButtonTypes } from '../../types/ButtonTypes';

type Props = {
  shema: number;
  handleBackToResult: () => void;
  scroll: number;
}

export const Shema: React.FC<Props> = ({ shema, handleBackToResult, scroll }) => {
  const { isDarkTheme } = useContext(DataContext);
  const [data, setData] = useState<ShemaText | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`./api/shema_${shema}.json`);
        setData(response.data);
      } catch (error) {
        console.error('Error reading JSON file:', error);
      }
    };

    fetchData();

    return () => window.scrollTo(0, scroll);
  }, []);

  const htmlString = () => {
    let title = `<h1 class="shema__title">${data?.title}</h1>`;

    const result = data?.text.reduce((sum, item) => {
      let paragraph = '';

      if (item.type === 'list') {
        paragraph = '<ul class="shema__list">';

        item.content.forEach(element => {
          paragraph += `<li class="shema__list-item">${element}</li>`;
        });
        
        paragraph += '</ul>';
      } else {
        paragraph = `<p  class="shema__paragraph">${item.content[0]}</p>`;
      }

      return sum + paragraph;
    }, title);

    return result || title;
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
          <div dangerouslySetInnerHTML={{ __html: htmlString() }} />

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
