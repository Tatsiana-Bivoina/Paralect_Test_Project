import React from 'react';
import HeaderComponent from './Header.component';

const links = [
  { link: '/', label: 'Поиск Вакансий' },
  { link: '/favorite-vacancies', label: 'Избранное' },
];

function HeaderContainer() {
  return (
    <HeaderComponent links={links} />
  );
}

export default HeaderContainer;
