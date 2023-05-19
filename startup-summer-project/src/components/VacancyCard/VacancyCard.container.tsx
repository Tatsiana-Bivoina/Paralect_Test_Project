import React from 'react';
import VacancyCardComponent from './VacancyCard.component';
import { VacancyResponse } from '../../types/apiTypes';

interface Props {
  vacancy: VacancyResponse;
  vacancies: VacancyResponse[];
  toggleFavoriteVacancyInVacancies: (arr: VacancyResponse[]) => void;
}

function VacancyCardContainer(props: Props) {
  const {
    vacancy,
    vacancies,
    toggleFavoriteVacancyInVacancies,
  } = props;

  const toggleFavoriteVacancy = () => {
    const favoriteVacancies = localStorage.getItem('favoriteVacancies');
    if (favoriteVacancies) {
      const vacanciesCopy = [...vacancies];
      const favoriteVacanciesArr = JSON.parse(favoriteVacancies) as VacancyResponse[];
      const vacancyIndex = favoriteVacanciesArr.findIndex((el) => el.id === vacancy.id);
      const index = vacanciesCopy.findIndex((el) => el.id === vacancy.id);

      if (vacancyIndex === -1) {
        favoriteVacanciesArr.push(vacancy);
      } else {
        favoriteVacanciesArr.splice(vacancyIndex, 1);
      }
      vacanciesCopy[index].isFavorite = !vacanciesCopy[index].isFavorite;

      toggleFavoriteVacancyInVacancies(vacanciesCopy);
      localStorage.setItem('favoriteVacancies', JSON.stringify(favoriteVacanciesArr));
    }
  };

  return (
    <VacancyCardComponent
      vacancy={vacancy}
      toggleFavoriteVacancy={toggleFavoriteVacancy}
    />
  );
}

export default VacancyCardContainer;
