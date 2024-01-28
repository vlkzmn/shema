import React, { memo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { DataContext } from '../../DataContext';
import { ButtonTypes } from '../../types/ButtonTypes';
import './Button.scss';

type Props = {
  type: ButtonTypes;
  text: string;
  handler?: () => void;
};

export const Button: React.FC<Props> = memo(({ type, text, handler = () => {}}) => {
  const { isDarkTheme } = useContext(DataContext);
  const { t } = useTranslation();

  return (
    <button 
      type={type}
      className={cn(
        'button', 
        { 'button--dark': isDarkTheme },
      )}
      onClick={handler}
    >
      {t(text)}
    </button>
  );
});
