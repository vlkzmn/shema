import React from 'react';
import { useTranslation } from 'react-i18next';
import { UserResult } from '../../types/UserResult';
import './ResultsList.scss';

type Props = {
  usersResults: UserResult[];
  handleOpenUser: (user: UserResult) => void;
};

export const ResultsList: React.FC<Props> = ({ usersResults, handleOpenUser }) => {
  const { t } = useTranslation();

  const getDate = (data: string) => {
    const date = new Date(data);

    return date.toLocaleDateString("ua-UA", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }

  return (
    <div className="results-list">
      <h1 className="results-list__title">
        {t('title_results_list')}
      </h1>

      <table className="results-list__table">
        <thead>
          <tr>
            <th>№</th>
            <th>{t('name')}</th>
            <th>{t('date')}</th>
          </tr>
        </thead>

        <tbody>
          {usersResults.map((item, i) => {
            const date = getDate(item.createdAt);

            return (
              <tr 
                key={item.id}
                className="results-list__row"
                onClick={() => handleOpenUser(item)}
              >
                <td>{i + 1}</td>
                <td className="results-list__cell-start">{item.userName}</td>
                <td>{date}</td>
              </tr>    
          )})}
        </tbody>        
      </table> 
    </div>
  );
};
