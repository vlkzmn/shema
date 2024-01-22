import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { DataContext } from '../../DataContext';
import './Button.scss';

type Props = {
  text: string;
  handler: () => void;
};

export const Button: React.FC<Props> = ({ text, handler }) => {
  const { isDarkTheme } = useContext(DataContext);
  const { t } = useTranslation();

  return (
    <button 
      type="button"
      className={cn(
        'button', 
        { 'button--dark': isDarkTheme },
      )}
      onClick={handler}
    >
      {t(text)}
    </button>
  );
};
