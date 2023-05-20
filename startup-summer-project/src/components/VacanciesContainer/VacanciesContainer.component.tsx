import React from 'react';
import { Flex } from '@mantine/core';
import VacancyCard from '../VacancyCard/VacancyCard.container';
import { VacancyResponse } from '../../types/apiTypes';

interface Props {
  vacancies: VacancyResponse[];
  toggleFavoriteVacancyInVacancies: (arr: VacancyResponse[]) => void;
}

export default function VacanciesContainerComponent(props: Props) {
  const {
    vacancies,
    toggleFavoriteVacancyInVacancies,
  } = props;

  const renderVacanciesCards = () => (
    vacancies.map(
      (vacancy: VacancyResponse) => (
        <VacancyCard
          vacancy={vacancy}
          key={vacancy.id}
          vacancies={vacancies}
          toggleFavoriteVacancyInVacancies={toggleFavoriteVacancyInVacancies}
        />
      ),
    )
  );

  return (
    <Flex direction="column" gap={16}>
      {renderVacanciesCards()}
    </Flex>
  );
}
