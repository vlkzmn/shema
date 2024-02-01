import { useContext } from 'react';
import cn from "classnames";
import { useTranslation } from 'react-i18next';

import { DataContext } from '../../DataContext';
import { Pages } from '../../types/Pages';
import './PagesList.scss';

export const PagesList = () => {
  const { isDarkTheme, page, togglePage } = useContext(DataContext);
  const menu = Object.values(Pages);
  const { t } = useTranslation(); 

  return (
    <ul className="pages-list">
      {menu.map(item => (
        <li key={item} className="pages-list__menu-item">
          <button 
            type="button" 
            className={cn(
              'pages-list__button', 
              { 'pages-list__button--dark': isDarkTheme },
              { 'pages-list__button--selected': page === item },
            )}
            onClick={() => togglePage(Pages[item])}
          >
            {t(item)}
          </button>
        </li>
      ))}
    </ul>
  );
};
