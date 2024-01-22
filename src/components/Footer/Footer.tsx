import cn from 'classnames';
import { useContext } from 'react';

import { DataContext } from '../../DataContext';
import './Footer.scss';

export const Footer = () => {
  const { isDarkTheme } = useContext(DataContext);

  return (
    <footer className={cn('footer', { 'footer--dark': isDarkTheme })}>      
      <a 
        href="https://volodymyr-kuzmin.pp.ua/"
        className="footer__link"
        target="_blank"
        rel="noreferrer"
        aria-label="Developed by Volodymyr Kuzmin"
      >
        dev by Vlkzmn
      </a>
    </footer>
  );
};
