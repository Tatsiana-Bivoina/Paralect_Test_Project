import React from 'react';
import VacanciesContainerComponent from './VacanciesContainer.component';
import { VacancyResponse } from '../../types/apiTypes';

interface Props {
  vacancies: VacancyResponse[];
  toggleFavoriteVacancyInVacancies: (arr: VacancyResponse[]) => void;
}

function VacanciesContainer(props: Props) {
  const {
    vacancies,
    toggleFavoriteVacancyInVacancies,
  } = props;

  return (
    <VacanciesContainerComponent
      vacancies={vacancies}
      toggleFavoriteVacancyInVacancies={toggleFavoriteVacancyInVacancies}
    />
  );
}

export default VacanciesContainer;
