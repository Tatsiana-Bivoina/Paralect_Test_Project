import React from 'react';
import { useNavigate } from 'react-router';
import HeaderComponent from './Header.component';

const links = [
  { link: '/', label: 'Поиск Вакансий' },
  { link: '/favorite-vacancies', label: 'Избранное' },
];

function HeaderContainer() {
  const navigate = useNavigate();

  const logoHandleClick = () => {
    navigate('/');
  };

  return (
    <HeaderComponent links={links} logoHandleClick={logoHandleClick} />
  );
}

export default HeaderContainer;
