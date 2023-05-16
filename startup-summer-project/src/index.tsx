import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import Layout from './components/Layout/Layout.component';
import HomePage from './routes/home/HomePage.container';
import VacancyPage from './routes/vacancy/VacancyPage.container';
import FavoriteVacanciesPage from './routes/favorite-vacancies/FavoriteVacanciesPage.container';
import './styles/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="favorite-vacancies" element={<FavoriteVacanciesPage />} />
            <Route path="vacancy/:id" element={<VacancyPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>,
);
