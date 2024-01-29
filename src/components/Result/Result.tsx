import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { Pages } from '../../types/Pages';
import { ButtonTypes } from '../../types/ButtonTypes';
import { DataContext } from '../../DataContext';
import { localStorageService } from '../../services/localStorageService';
import { Loader } from '../Loader/Loader';
import { ResultData } from '../ResultData/ResultData';
import { Button } from '../Button/Button';
import './Result.scss';

type Props = {
  userAnswers: number[];
}

export const TestResult: React.FC<Props> = ({ userAnswers }) => {
  const { togglePage } = useContext(DataContext);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { t, i18n } = useTranslation();
  const lang = i18n.language.slice(0, 2);

  const handleFinishTest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    setLoading(true);
    setMessage('');

    const user = localStorageService.getName();
    const userResult = {
      user,
      email,
      userAnswers,
      lang,
    };

    axios.post('https://shema-api.onrender.com/result', userResult)
    // axios.post('http://localhost:5000/result', userResult)
    .then(() => {
      localStorageService.removeUser();
      setEmail('');
      setMessage(t('test_success'));
      setTimeout(() => {
        setMessage('');
        togglePage(Pages.info);
      }, 5000);
    })
    .catch((error) => {
      console.error(error);
      setMessage(t('test_error'));
      setTimeout(() => {
        setMessage('');
      }, 5000);
    })
    .finally(() => setLoading(false));    
  };

  return (
    <div className="result">
      <h1 className="result__title">
        {t('test_result')}
      </h1>

      <ResultData userAnswers={userAnswers} />

      <p className="result__text">
        {t('result_page_text_1')}
      </p>

      <p className="result__text">
        {t('result_page_text_2')}
      </p>

      <div className="result__confirm">
        {!message && (
          <div>
            {loading ? (
              <Loader/>
            ) : (
              <form 
                className="result__form" 
                onSubmit={handleFinishTest}
              >
                <input 
                  type="email"
                  className="result__input"
                  value={email}
                  placeholder={t('placeholder_email')}
                  onChange={(event) => setEmail(event.target.value)}
                />

                <Button
                  type={ButtonTypes.submit}
                  text="button_complete"                      
                />
              </form>
            )}
          </div>
        )}  

        {!!message && (
          <p className="result__message">
            {message}
          </p>
        )} 
      </div>
    </div>
  );
};

// import React, { useContext, useMemo, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import cn from 'classnames';
// import axios from 'axios';

// import { Pages } from '../../types/Pages';
// import { ButtonTypes } from '../../types/ButtonTypes';
// import { DataContext } from '../../DataContext';
// import { localStorageService } from '../../services/localStorageService';
// import { resultPreapare } from '../../utils/resultPreapare';
// import { Loader } from '../Loader/Loader';
// import { Button } from '../Button/Button';
// import './Result.scss';

// type Props = {
//   userAnswers: number[];
//   setShema?: React.Dispatch<React.SetStateAction<number>>;
// }

// export const TestResult: React.FC<Props> = ({ userAnswers, setShema = null }) => {
//   const { isDarkTheme, page, togglePage } = useContext(DataContext);
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
  
//   const { t, i18n } = useTranslation();
//   const lang = i18n.language.slice(0, 2);
//   const result = useMemo(() => resultPreapare(userAnswers), [userAnswers]);

//   const handleFinishTest = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
    
//     setLoading(true);
//     setMessage('');

//     const user = localStorageService.getName();
//     const userResult = {
//       user,
//       email,
//       userAnswers,
//       lang,
//     };

//     axios.post('https://shema-api.onrender.com/result', userResult)
//     // axios.post('http://localhost:5000/result', userResult)
//     .then(() => {
//       localStorageService.removeUser();
//       setEmail('');
//       setMessage(t('test_success'));
//       setTimeout(() => {
//         setMessage('');
//         togglePage(Pages.info);
//       }, 5000);
//     })
//     .catch((error) => {
//       console.error(error);
//       setMessage(t('test_error'));
//       setTimeout(() => {
//         setMessage('');
//       }, 5000);
//     })
//     .finally(() => setLoading(false));    
//   };

//   const handleOpenShema = (shema: number) => {
//     if (setShema) {
//       setShema(shema + 1);
//     }        
//   };

//   return (
//     <div className="result">
//       <div className="result__content">
//         <div className="result__list">
//           {result.map((item, i) => (
//             <div 
//               key={item.shema} 
//               className={cn(
//                 'result__list-item',
//                 {'result__list-item--danger': (item.percent > 50 || item.sumFiveSix > 10) && page === Pages.result},
//               )}
//             >
//               <h2 className="result__shema">
//                 {page === Pages.result ? (
//                   <button
//                     type='button'
//                     className={cn(
//                       'result__link', 
//                       {'result__link--dark': isDarkTheme},
//                       {'result__link--danger': (item.percent > 50 || item.sumFiveSix > 10) && page === Pages.result}
//                     )}
//                     onClick={() => handleOpenShema(i)}
//                   >
//                     {t(item.shema)}
//                   </button>                  
//                 ) : 
//                   t(item.shema)
//                 }
//               </h2>

//               <ul>
//                 <li>
//                   <span className="result__list-value">{t('answers')}</span>
//                   <strong>{item.answers.join(' . ')}</strong>
//                 </li>

//                 <li>
//                   <span className="result__list-value">{t('sum')}</span>
//                   <strong>{item.sum}</strong>
//                 </li>

//                 <li>
//                   <span className="result__list-value">{t('percent')}</span>
//                   <strong>{item.percent}</strong>
//                 </li>

//                 <li>
//                   <span className="result__list-value">{t('sum5and6')}</span>
//                   <strong>{item.sumFiveSix}</strong>
//                 </li>
//               </ul> 
//             </div>          
//           ))}
//         </div>       

//         <table className="result__table">
//           <thead>
//             <tr>
//               <th>{t('shema')}</th>
//               <th>{t('answers')}</th>
//               <th>{t('sum')}</th>
//               <th>{t('percent')}</th>
//               <th>{t('sum5and6')}</th>
//             </tr>
//           </thead>
//           <tbody>
//             {result.map((item, i) => (
//               <tr 
//                 key={item.shema} 
//                 className={cn(
//                   'result__list-item',
//                   {'result__list-item--danger': (item.percent > 50 || item.sumFiveSix > 10) && page === Pages.result}
//                 )
//               }>
//                 <td className="result__cell-start">
//                   {page === Pages.result ? (
//                     <button
//                       type='button'
//                       className={cn(
//                         'result__link', 
//                         {'result__link--dark': isDarkTheme},
//                         {'result__link--danger': (item.percent > 50 || item.sumFiveSix > 10) && page === Pages.result}
//                       )}
//                       onClick={() => handleOpenShema(i)}
//                     >
//                       {t(item.shema)}
//                     </button>                  
//                   ) : 
//                     t(item.shema)
//                   }
//                 </td>
//                 <td>{item.answers.join('__')}</td>
//                 <td>{item.sum}</td>
//                 <td>{item.percent}</td>
//                 <td>{item.sumFiveSix}</td>
//               </tr>    
//             ))}
//           </tbody>        
//         </table>
//       </div>            

//       {page !== Pages.result && (
//         <>
//           <p className="result__text">
//             {t('result_page_text_1')}
//           </p>

//           <p className="result__text">
//             {t('result_page_text_2')}
//           </p>

//           <div className="result__confirm">
//             {!message && (
//               <div>
//                 {loading ? (
//                   <Loader/>
//                 ) : (
//                   <form 
//                     className="result__form" 
//                     onSubmit={handleFinishTest}
//                   >
//                     <input 
//                       type="email"
//                       className="result__input"
//                       value={email}
//                       placeholder={t('placeholder_email')}
//                       onChange={(event) => setEmail(event.target.value)}
//                     />

//                     <Button
//                       type={ButtonTypes.submit}
//                       text="button_complete"                      
//                     />
//                   </form>
//                 )}
//               </div>
//             )}  

//             {!!message && (
//               <p className="result__message">
//                 {message}
//               </p>
//             )} 
//           </div>
//         </>        
//       )}       
//     </div>
//   );
// };
