import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useDisclosure } from '@mantine/hooks';
import HomePageComponent from './HomePage.component';
import { auth, getCatalogues, getVacancies } from '../../service/homePageService';
import { Catalogue, VacancyResponse } from '../../types/apiTypes';

function HomePageContainer() {
  const [vacancies, setVacancies] = useState<VacancyResponse[]>([]);
  const [accessToken, setAccessToken] = useState<string>(localStorage.getItem('accessToken') ?? '');
  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
  const [selectValue, setSelectValue] = useState<string | null>(localStorage.getItem('industry') ?? '');
  const [paymentFrom, setPaymentFrom] = useState<number | ''>(Number(localStorage.getItem('paymentFrom')) ?? '');
  const [paymentTo, setPaymentTo] = useState<number | ''>(Number(localStorage.getItem('paymentTo')) ?? '');
  const [searchInputValue, setSearchInputValue] = useState<string>(localStorage.getItem('search') ?? '');
  const [isRequestFullfiled, setIsRequestFullfiled] = useState<boolean>(false);
  const [visible, { open, close }] = useDisclosure(true);
  const navigate = useNavigate();
  const location = useLocation();

  const changeFavoriteVacancies = (vacanciesArr: VacancyResponse[]): VacancyResponse[] => {
    const vacanciesCopy = [...vacanciesArr];
    const favoriteVacancies = localStorage.getItem('favoriteVacancies');

    if (favoriteVacancies) {
      const favoriteVacanciesArr = JSON.parse(favoriteVacancies) as VacancyResponse[];

      vacanciesCopy.forEach((elem, index) => {
        const vacancyIndex = favoriteVacanciesArr.findIndex((el) => el.id === elem.id);
        if (vacancyIndex !== -1) {
          vacanciesCopy[index].isFavorite = true;
        }
      });
    }
    return vacanciesCopy;
  };

  const changeVacansiesState = (arr: VacancyResponse[]) => {
    const vacanciesArr = [...arr];
    if (vacanciesArr.length === 0) {
      navigate('/empty-state', { state: location.pathname });
    }
    const res = changeFavoriteVacancies(vacanciesArr);
    setVacancies(res);
  };

  const getAllVacancies = async () => {
    changeVacansiesState(await getVacancies());
  };

  useEffect(() => {
    const login = async () => {
      const response = await auth();
      if (response) {
        localStorage.setItem('accessToken', response.access_token);
        setAccessToken(response.access_token);
      }
    };
    if (accessToken === '') {
      login()
        .catch((error) => {
          if (error instanceof Error) {
            console.log(error.message);
          }
        });
    }
  }, []);

  useEffect(() => {
    const getAllCatalogues = async () => {
      const response = await getCatalogues();
      if (response) {
        setCatalogues(response);
      }
    };
    getAllCatalogues()
      .catch((error) => {
        if (error instanceof Error) {
          console.log(error.message);
        }
      });
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('favoriteVacancies')) {
      localStorage.setItem('favoriteVacancies', JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (accessToken !== '') {
      getAllVacancies()
        .then(() => {
          setIsRequestFullfiled(true);
          close();
        })
        .catch((error) => {
          if (error instanceof Error) {
            console.log(error.message);
          }
        });
    }
  }, [accessToken]);

  const handleResetButtonClick = () => {
    setSelectValue('');
    setPaymentFrom('');
    setPaymentTo('');
    localStorage.setItem('industry', '');
    localStorage.setItem('paymentFrom', '');
    localStorage.setItem('paymentTo', '');
  };

  const toggleFavoriteVacancyInVacancies = (newVacanciesArr: VacancyResponse[]) => {
    setVacancies(newVacanciesArr);
  };

  const handleIndustrySelectChange = (val: string | null) => {
    if (val) {
      localStorage.setItem('industry', val);
      setSelectValue(val);
    }
  };

  const handlePaymentFromChange = (val: number | '') => {
    if (val !== '') {
      localStorage.setItem('paymentFrom', val.toString());
      setPaymentFrom(val);
    }
  };

  const handlePaymentToChange = (val: number | '') => {
    if (val !== '') {
      localStorage.setItem('paymentTo', val.toString());
      setPaymentTo(val);
    }
  };

  const searchHandleChange = (value: string) => {
    localStorage.setItem('search', value);
    setSearchInputValue(value);
  };

  const getVacansiesButtonHandleClick = () => {
    console.log(searchInputValue, selectValue, paymentFrom, paymentTo);
  };

  return (
    <HomePageComponent
      vacancies={vacancies}
      catalogues={catalogues}
      selectValue={selectValue}
      paymentFrom={paymentFrom}
      paymentTo={paymentTo}
      searchInputValue={searchInputValue}
      visible={visible}
      isRequestFullfiled={isRequestFullfiled}
      toggleFavoriteVacancyInVacancies={toggleFavoriteVacancyInVacancies}
      handleIndustrySelectChange={handleIndustrySelectChange}
      handlePaymentFromChange={handlePaymentFromChange}
      handlePaymentToChange={handlePaymentToChange}
      handleResetButtonClick={handleResetButtonClick}
      searchHandleChange={searchHandleChange}
      getVacansiesButtonHandleClick={getVacansiesButtonHandleClick}
    />
  );
}

export default HomePageContainer;
