import { memo, useContext, useMemo } from "react";
import cn from 'classnames';
import { useTranslation } from "react-i18next";

import { DataContext } from "../../DataContext";
import { resultPreapare } from "../../utils/resultPreapare";
import { Pages } from "../../types/Pages";
import './ResultData.scss';

type Props = {
  userAnswers: number[];
  setShema?: React.Dispatch<React.SetStateAction<number>>;
};

export const ResultData: React.FC<Props> = memo(({ userAnswers, setShema }) => {
  const { isDarkTheme, page } = useContext(DataContext);
  const { t } = useTranslation();
  const result = useMemo(() => resultPreapare(userAnswers), [userAnswers]);

  const handleOpenShema = (shema: number) => {
    if (setShema) {
      setShema(shema + 1);
    }        
  };

  return (
    <div className="result-data__content">
      <div className="result-data__list">
        {result.map((item, i) => (
          <div 
            key={item.shema} 
            className={cn(
              'result-data__list-item',
              {'result-data__list-item--danger': (item.percent > 50 || item.sumFiveSix > 10) && page === Pages.result},
            )}
          >
            <h2 className="result-data__shema">
              {page === Pages.result ? (
                <button
                  type='button'
                  className={cn(
                    'result-data__link', 
                    {'result-data__link--dark': isDarkTheme},
                    {'result-data__link--danger': (item.percent > 50 || item.sumFiveSix > 10) && page === Pages.result}
                  )}
                  onClick={() => handleOpenShema(i)}
                >
                  {t(item.shema)}
                </button>                  
              ) : 
                t(item.shema)
              }
            </h2>

            <ul>
              <li>
                <span className="result-data__list-value">{t('answers')}</span>
                <strong>{item.answers.join(' . ')}</strong>
              </li>

              <li>
                <span className="result-data__list-value">{t('sum')}</span>
                <strong>{item.sum}</strong>
              </li>

              <li>
                <span className="result-data__list-value">{t('percent')}</span>
                <strong>{item.percent}</strong>
              </li>

              <li>
                <span className="result-data__list-value">{t('sum5and6')}</span>
                <strong>{item.sumFiveSix}</strong>
              </li>
            </ul> 
          </div>          
        ))}
      </div>       

      <table className="result-data__table">
        <thead>
          <tr>
            <th>{t('shema')}</th>
            <th>{t('answers')}</th>
            <th>{t('sum')}</th>
            <th>{t('percent')}</th>
            <th>{t('sum5and6')}</th>
          </tr>
        </thead>
        <tbody>
          {result.map((item, i) => (
            <tr 
              key={item.shema} 
              className={cn(
                'result-data__list-item',
                {'result-data__list-item--danger': (item.percent > 50 || item.sumFiveSix > 10) && page === Pages.result}
              )
            }>
              <td className="result-data__cell-start">
                {page === Pages.result ? (
                  <button
                    type='button'
                    className={cn(
                      'result-data__link', 
                      {'result-data__link--dark': isDarkTheme},
                      {'result-data__link--danger': (item.percent > 50 || item.sumFiveSix > 10) && page === Pages.result}
                    )}
                    onClick={() => handleOpenShema(i)}
                  >
                    {t(item.shema)}
                  </button>                  
                ) : 
                  t(item.shema)
                }
              </td>
              <td>{item.answers.join('__')}</td>
              <td>{item.sum}</td>
              <td>{item.percent}</td>
              <td>{item.sumFiveSix}</td>
            </tr>    
          ))}
        </tbody>        
      </table>
    </div>
  );
});
