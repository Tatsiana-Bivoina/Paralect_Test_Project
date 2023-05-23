import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import FavoriteVacanciesPageComponent from './FavoriteVacanciesPage.component';
import { VacancyResponse } from '../../types/apiTypes';
import { ITEMS_PER_PAGE } from '../../app.config';

function FavoriteVacanciesPageContainer() {
  const [favoriteVacancies, setFavoriteVacancies] = useState<VacancyResponse[]>([]);
  const [currentItems, setCurrentItems] = useState<VacancyResponse[]>([]);
  const [isRequestFullfiled, setIsRequestFullfiled] = useState<boolean>(false);
  const [itemOffset, setItemOffset] = useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();

  const pageCount = Math.ceil(favoriteVacancies.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const vacancies = localStorage.getItem('favoriteVacancies');

    if (vacancies) {
      const vacanciesArr = JSON.parse(vacancies) as VacancyResponse[];
      if (vacanciesArr.length === 0) {
        navigate('/empty-state', { state: location.pathname });
      }
      setFavoriteVacancies(vacanciesArr);
      setIsRequestFullfiled(true);
    }
  }, []);

  const getCurrentItems = () => {
    const endOffset = itemOffset + ITEMS_PER_PAGE;
    setCurrentItems(favoriteVacancies.slice(itemOffset, endOffset));
  };

  useEffect(() => {
    getCurrentItems();
  }, [favoriteVacancies]);

  useEffect(() => {
    getCurrentItems();
  }, [itemOffset]);

  const handlePageClick = (selectedItem: { selected: number }) => {
    const newOffset = (selectedItem.selected * ITEMS_PER_PAGE) % favoriteVacancies.length;
    setItemOffset(newOffset);
  };

  const toggleFavoriteVacancyInVacancies = (newVacanciesArr: VacancyResponse[]) => {
    setCurrentItems(newVacanciesArr);
  };

  return (
    <FavoriteVacanciesPageComponent
      favoriteVacancies={currentItems}
      isRequestFullfiled={isRequestFullfiled}
      pageCount={pageCount}
      handlePageClick={handlePageClick}
      toggleFavoriteVacancyInVacancies={toggleFavoriteVacancyInVacancies}
    />
  );
}

export default FavoriteVacanciesPageContainer;
