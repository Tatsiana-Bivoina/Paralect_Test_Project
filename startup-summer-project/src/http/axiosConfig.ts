import axios from 'axios';

export const API_URL = process.env.REACT_APP_BASE_URL;
const xSecretKey: string | undefined = process.env.REACT_APP_X_SECRET_KEY;
const appSecretKey: string | undefined = process.env.REACT_APP_CLIENT_SECRET_KEY;

const $api = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
    'Content-Type': 'application/json',
    'x-secret-key': xSecretKey,
    'X-Api-App-Id': appSecretKey,
  },
  baseURL: API_URL,
});

export default $api;
