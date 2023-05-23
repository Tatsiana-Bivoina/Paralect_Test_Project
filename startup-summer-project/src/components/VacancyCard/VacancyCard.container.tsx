import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
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

  const [isVacancyPage, setIsVacancyPage] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === `/vacancy/:${vacancy.id}`) {
      setIsVacancyPage(true);
    }
  }, []);

  const toggleFavoriteInVacancies = () => {
    if (vacancies) {
      const vacanciesCopy = [...vacancies];
      const index = vacanciesCopy.findIndex((el) => el.id === vacancy.id);
      vacanciesCopy[index].isFavorite = !vacanciesCopy[index].isFavorite;
      toggleFavoriteVacancyInVacancies(vacanciesCopy);
    }
  };

  const toggleFavoriteVacancy = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const favoriteVacancies = localStorage.getItem('favoriteVacancies');
    if (favoriteVacancies) {
      const favoriteVacanciesArr = JSON.parse(favoriteVacancies) as VacancyResponse[];
      const vacancyIndex = favoriteVacanciesArr.findIndex((el) => el.id === vacancy.id);

      if (vacancyIndex === -1) {
        favoriteVacanciesArr.push(vacancy);
      } else {
        favoriteVacanciesArr.splice(vacancyIndex, 1);
      }

      toggleFavoriteInVacancies();
      localStorage.setItem('favoriteVacancies', JSON.stringify(favoriteVacanciesArr));
    }
  };

  const handleCardClick = () => {
    if (location.pathname !== `/vacancy/:${vacancy.id}`) {
      navigate(`/vacancy/:${vacancy.id}`);
    }
  };

  return (
    <VacancyCardComponent
      vacancy={vacancy}
      isVacancyPage={isVacancyPage}
      toggleFavoriteVacancy={toggleFavoriteVacancy}
      handleCardClick={handleCardClick}
    />
  );
}

export default VacancyCardContainer;
