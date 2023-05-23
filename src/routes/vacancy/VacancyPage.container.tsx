import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDisclosure } from '@mantine/hooks';
import VacancyPageComponent from './VacancyPage.component';
import { getVacancy } from '../../service/homePageService';
import { VacanciesResponseType, VacancyResponse } from '../../types/apiTypes';

const defaultVacancy: VacanciesResponseType = {
  id: 0,
  id_client: 0,
  payment_from: 0,
  payment_to: 0,
  date_pub_to: 0,
  date_archived: 0,
  date_published: 0,
  address: null,
  payment: null,
  profession: '',
  work: '',
  metro: [],
  currency: '',
  moveable: false,
  agreement: false,
  anonymous: false,
  vacancyRichText: '',
  type_of_work: {
    id: 0,
    title: '',
  },
  place_of_work: {
    id: 0,
    title: '',
  },
  education: {
    id: 0,
    title: '',
  },
  experience: {
    id: 0,
    title: '',
  },
  maritalstatus: {
    id: 0,
    title: '',
  },
  children: {
    id: 0,
    title: '',
  },
  already_sent_on_vacancy: false,
  languages: [],
  driving_licence: [],
  catalogues: [],
  agency: {
    id: 0,
    title: '',
  },
  town: {
    id: 0,
    title: '',
    declension: '',
    genitive: '',
  },
  client_logo: '',
  age_from: 0,
  age_to: 0,
  gender: {
    id: 0,
    title: '',
  },
  firm_name: '',
  firm_activity: '',
  link: '',
};

function VacancyPageContainer() {
  const [vacancy, setVacancy] = useState<VacanciesResponseType>(defaultVacancy);
  const [currentVacancy, setCurrentVacancy] = useState<VacancyResponse[]>([]);
  const [vacancyError, setVacancyError] = useState<string>('');
  const [visible, { close }] = useDisclosure(true);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const getCurrentVacancy = async () => {
        const res = await getVacancy(Number(id.replace(':', '')));
        setVacancy(res);
      };
      getCurrentVacancy()
        .then(() => {
          close();
        })
        .catch((error) => {
          if (error instanceof Error) {
            setVacancyError(error.message);
          }
        });
    }
  }, []);

  useEffect(() => {
    if (vacancyError !== '') {
      close();
    }
  }, [vacancyError]);

  const checkIsVacancyFavorite = (elem: VacanciesResponseType): boolean => {
    const favoriteVacancies = localStorage.getItem('favoriteVacancies');

    if (favoriteVacancies) {
      const favoriteVacanciesArr = JSON.parse(favoriteVacancies) as VacancyResponse[];

      const vacancyIndex = favoriteVacanciesArr.findIndex((el) => el.id === elem.id);
      if (vacancyIndex !== -1) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const index = currentVacancy.findIndex((el) => el.id === vacancy.id);
    if (vacancy.id !== 0 && index === -1) {
      const newVacancy: VacancyResponse = {
        id: vacancy.id,
        profession: vacancy.profession,
        firm_name: vacancy.firm_name,
        town_title: vacancy.town.title,
        type_of_work_title: vacancy.type_of_work.title,
        payment_to: vacancy.payment_to,
        payment_from: vacancy.payment_from,
        currency: vacancy.currency,
        isFavorite: checkIsVacancyFavorite(vacancy),
      };
      setCurrentVacancy((prevState) => [...prevState, newVacancy]);
    }
  }, [vacancy]);

  const toggleFavoriteVacancyInVacancies = (newVacanciesArr: VacancyResponse[]) => {
    setCurrentVacancy(newVacanciesArr);
  };

  return (
    <VacancyPageComponent
      vacancy={vacancy}
      currentVacancy={currentVacancy}
      vacancyError={vacancyError}
      visible={visible}
      toggleFavoriteVacancyInVacancies={toggleFavoriteVacancyInVacancies}
    />
  );
}

export default VacancyPageContainer;
