import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useDisclosure } from '@mantine/hooks';
import HomePageComponent from './HomePage.component';
import { auth, getCatalogues, getVacancies } from '../../service/homePageService';
import {
  Catalogue,
  VacanciesRequest,
  VacancyResponse,
} from '../../types/apiTypes';
import { ITEMS_PER_PAGE } from '../../app.config';

function HomePageContainer() {
  const [vacancies, setVacancies] = useState<VacancyResponse[]>([]);
  const [accessToken, setAccessToken] = useState<string>(localStorage.getItem('accessToken') ?? '');
  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
  const [selectValue, setSelectValue] = useState<string | null>(localStorage.getItem('industry') ?? '');
  const [paymentFrom, setPaymentFrom] = useState<number | ''>(localStorage.getItem('paymentFrom') ? Number(localStorage.getItem('paymentFrom')) : '');
  const [paymentTo, setPaymentTo] = useState<number | ''>(localStorage.getItem('paymentTo') ? Number(localStorage.getItem('paymentTo')) : '');
  const [searchInputValue, setSearchInputValue] = useState<string>(localStorage.getItem('search') ?? '');
  const [pagesCount, setPagesCount] = useState<number>(Number(localStorage.getItem('totalVacanciesCount')) ?? 0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [homePageError, setHomePageError] = useState<string>('');
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

  const getAllVacancies = async (request: VacanciesRequest) => {
    changeVacansiesState(await getVacancies(request));
  };

  const getCataloguesArr = (): number[] => {
    const value = localStorage.getItem('industry');
    const key = [];
    if (value) {
      const catalogue = catalogues.filter((el) => el.value === value);

      if (catalogue.length !== 0) {
        key.push(catalogue[0].key);
        return key;
      }
    }
    return catalogues.map((el) => el.key);
  };

  const changeTotalPagesCount = () => {
    const count = localStorage.getItem('totalVacanciesCount');
    if (count) {
      const pages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
      setPagesCount(pages <= 125 ? pages : 125);
    }
  };

  const clearHomePageError = () => {
    if (homePageError !== '') {
      setHomePageError('');
    }
  };

  const getVacanciesHandle = (page: number) => {
    const defaultRequest: VacanciesRequest = {
      catalogues: getCataloguesArr(),
      currentPage: page,
      keyword: searchInputValue,
      payment_from: paymentFrom,
      payment_to: paymentTo,
    };
    open();
    clearHomePageError();
    getAllVacancies(defaultRequest)
      .then(() => {
        changeTotalPagesCount();
        close();
      })
      .catch((error) => {
        if (error instanceof Error) {
          setHomePageError(error.message);
        }
      });
  };

  useEffect(() => {
    const login = async () => {
      const response = await auth();
      if (response) {
        localStorage.setItem('accessToken', response.access_token);
        setAccessToken(response.access_token);
      }
    };
    clearHomePageError();
    if (accessToken === '') {
      login()
        .then(() => {
          getVacanciesHandle(0);
        })
        .catch((error) => {
          if (error instanceof Error) {
            setHomePageError(error.message);
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
    clearHomePageError();
    getAllCatalogues()
      .catch((error) => {
        if (error instanceof Error) {
          setHomePageError(error.message);
        }
      });
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('favoriteVacancies')) {
      localStorage.setItem('favoriteVacancies', JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (homePageError !== '') {
      close();
    }
  }, [homePageError]);

  useEffect(() => {
    if (catalogues.length !== 0) {
      getVacanciesHandle(0);
    }
  }, [catalogues]);

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

  const handleButtonClick = (page: number) => {
    getVacanciesHandle(page);
    setCurrentPage(page);
  };

  const handlePageClick = (selectedItem: { selected: number }) => {
    getVacanciesHandle(selectedItem.selected);
    setCurrentPage(selectedItem.selected);
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
      pagesCount={pagesCount}
      currentPage={currentPage}
      homePageError={homePageError}
      toggleFavoriteVacancyInVacancies={toggleFavoriteVacancyInVacancies}
      handleIndustrySelectChange={handleIndustrySelectChange}
      handlePaymentFromChange={handlePaymentFromChange}
      handlePaymentToChange={handlePaymentToChange}
      handleResetButtonClick={handleResetButtonClick}
      searchHandleChange={searchHandleChange}
      getVacansiesButtonHandleClick={handleButtonClick}
      handlePageClick={handlePageClick}
    />
  );
}

export default HomePageContainer;
