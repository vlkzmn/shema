import { useContext, useState } from 'react';
import cn from 'classnames';
import i18next from "i18next";
import { useTranslation } from 'react-i18next';

import { DataContext } from '../../DataContext';
import { Langs } from '../../types/Langs';
import { localStorageService } from '../../services/localStorageService';
import { MenuMobile } from '../MenuMobile/MenuMobile';
import { PagesList } from '../PagesList/PagesList';
import './Header.scss';

export const Header = () => {
  const { isDarkTheme, toggleTheme, page, togglePage } = useContext(DataContext);
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const { t, i18n } = useTranslation();
  
  const currentLang = i18n.language.slice(0, 2);
  const langs = Object.values(Langs);

  const handleChangeLang = (lang: string) => {
    i18next.changeLanguage(lang);
  }

  const handleChangeTheme = () => {
    if (!isDarkTheme) {
      localStorageService.setTheme('dark');
    } else {
      localStorageService.setTheme('light');
    }

    toggleTheme();    
  };

  const toggleMenu = () => {
    setIsMobileMenu(true);
  };

  return (
    <header className={cn('header', { 'header--dark': isDarkTheme })}>
      <div className="header__container">
        {isMobileMenu && (
          <MenuMobile setIsMobileMenu={setIsMobileMenu} />
        )}

        {!isMobileMenu && (
          <nav className="header__nav">
            <button 
              type="button"
              className={cn(
                'header__menu-icon', 
                { 'header__menu-icon--dark': isDarkTheme },
              )}
              onClick={toggleMenu}
            >            
            </button>

            <div className="header__menu-left">
              <PagesList />
            </div>            

            <div className="header__menu-right">
              <ul className="header__lang">
                {langs.map(item => (
                  <li key={item} className="header__menu-item">
                    <button 
                      type="button" 
                      className={cn(
                        'header__button', 
                        { 'header__button--dark': isDarkTheme },
                        { 'header__button--selected': currentLang === item },
                      )}
                      onClick={() => handleChangeLang(Langs[item])}
                    >
                      {t(item)}
                    </button>
                  </li>
                ))}
              </ul>

              <button 
                className={cn(
                  'header__theme-switcher', 
                  { 'header__theme-switcher--dark': isDarkTheme }
                )}
                onClick={handleChangeTheme}
              />
            </div>          
          </nav>
        )}                
      </div>      
    </header>
  );
}
