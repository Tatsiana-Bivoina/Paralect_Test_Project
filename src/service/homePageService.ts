import axios from 'axios';
import $api from '../http/axiosConfig';
import {
  Catalogue,
  CatalogueResponse,
  LoginResponse,
  VacanciesRequest,
  VacanciesResponse,
  VacanciesResponseType,
  VacancyResponse,
} from '../types/apiTypes';
import { ITEMS_PER_PAGE, PUBLISHED } from '../app.config';

const baseUrl: string | undefined = process.env.REACT_APP_BASE_URL;
const secretKey: string | undefined = process.env.REACT_APP_CLIENT_SECRET_KEY;
const xSecretKey: string | undefined = process.env.REACT_APP_X_SECRET_KEY;
const login: string | undefined = process.env.REACT_APP_LOGIN;
const password: string | undefined = process.env.REACT_APP_PASSWORD;
const userId: string | undefined = process.env.REACT_APP_USER_ID;

export async function auth(): Promise<LoginResponse> {
  if (!(baseUrl && secretKey && xSecretKey && login && password && userId)) {
    throw new Error('Извините, что-то пошло не так...');
  }
  try {
    const response = await axios.get<LoginResponse>(`${baseUrl}/2.0/oauth2/password?login=${login}&password=${password}&client_id=${userId}&client_secret=${secretKey}&hr=0`, {
      headers: {
        'Content-Type': 'application/json',
        'x-secret-key': xSecretKey,
        'X-Api-App-Id': secretKey,
      },
    });
    if (response.status !== 200) {
      throw new Error('Извините, что-то пошло не так...');
    }
    return response.data;
  } catch (error) {
    throw new Error('Пользователь не авторизован');
  }
}

export async function getVacancies(request: VacanciesRequest): Promise<VacancyResponse[]> {
  if (!(baseUrl && secretKey && xSecretKey)) {
    throw new Error('Извините, что-то пошло не так...');
  }

  try {
    const response = await axios.get<VacanciesResponse>(`${baseUrl}/2.0/vacancies/?
    published=${PUBLISHED}&
    count=${ITEMS_PER_PAGE}&
    page=${request.currentPage}&
    keyword=${request.keyword}&
    payment_from=${request.payment_from}&
    payment_to=${request.payment_to}&
    catalogues=${JSON.stringify(request.catalogues)}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
        'Content-Type': 'application/json',
        'x-secret-key': xSecretKey,
        'X-Api-App-Id': secretKey,
      },
    });

    if (response.status !== 200) {
      throw new Error('Упс, что-то пошло не так...');
    }

    localStorage.setItem('totalVacanciesCount', response.data.total.toString());

    return response.data.objects.map((el: VacanciesResponseType) => (
      {
        id: el.id,
        profession: el.profession,
        firm_name: el.firm_name,
        town_title: el.town.title,
        type_of_work_title: el.type_of_work.title,
        payment_to: el.payment_to,
        payment_from: el.payment_from,
        currency: el.currency,
        isFavorite: false,
      }
    ));
  } catch (error) {
    throw new Error('Извините, вакансии не найдены');
  }
}

export async function getCatalogues(): Promise<Catalogue[]> {
  try {
    const response = await $api.get<CatalogueResponse[]>('/2.0/catalogues/');

    if (response.status !== 200) {
      throw new Error('Упс, что-то пошло не так...');
    }

    return response.data.map((el: CatalogueResponse) => (
      {
        value: el.title,
        label: el.title,
        key: el.key,
      }
    ));
  } catch (error) {
    throw new Error('Список отраслей не найден');
  }
}

export async function getVacancy(id: number): Promise<VacanciesResponseType> {
  try {
    const response = await $api.get<VacanciesResponseType>(`/2.0/vacancies/${id}`);
    if (response.status !== 200) {
      throw new Error('Упс, что-то пошло не так...');
    }

    return response.data;
  } catch (error) {
    throw new Error('Вакансия не найдена');
  }
}
