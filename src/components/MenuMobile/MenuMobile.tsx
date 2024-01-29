import React, { useContext } from "react";
import cn from "classnames";

import { DataContext } from "../../DataContext";
import { PagesList } from "../PagesList/PagesList";
import './MenuMobile.scss';

type Props = {
  setIsMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuMobile: React.FC<Props> = ({ setIsMobileMenu }) => {
  const { isDarkTheme } = useContext(DataContext);

  const toggleMenu = () => {
    setIsMobileMenu(false);
  };

  return (
    <div className={cn('menu-mobile', { 'menu-mobile--dark': isDarkTheme })}>
      <PagesList />

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
