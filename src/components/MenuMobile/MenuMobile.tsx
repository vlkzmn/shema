import React, { useContext } from "react";
import { DataContext } from "../../DataContext";
import cn from "classnames";
import { Pages } from "../../types/Pages";
import { useTranslation } from "react-i18next";
import './MenuMobile.scss';

type Props = {
  setIsMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuMobile: React.FC<Props> = ({ setIsMobileMenu }) => {
  const { isDarkTheme, page, togglePage } = useContext(DataContext);
  const menu = Object.values(Pages);
  const { t } = useTranslation(); 

  const toggleMenu = () => {
    setIsMobileMenu(false);
  };

  return (
    <div className={cn('menu-mobile', { 'menu-mobile--dark': isDarkTheme })}>      
      <ul className="menu-mobile__menu">
        {menu.map(item => (
          <li key={item} className="menu-mobile__menu-item">
            <button 
              type="button" 
              className={cn(
                'menu-mobile__button', 
                { 'menu-mobile__button--dark': isDarkTheme },
                { 'menu-mobile__button--selected': page === item },
              )}
              onClick={() => togglePage(Pages[item])}
            >
              {t(item)}
            </button>
          </li>
        ))}
      </ul>

      <button 
        type="button"
        className={cn(
          'menu-mobile__close-icon', 
          { 'menu-mobile__close-icon--dark': isDarkTheme },
        )}
        onClick={toggleMenu}
      >            
      </button>
    </div>
  );
};
