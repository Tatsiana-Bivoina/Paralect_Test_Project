import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EmptyStateComponent from './EmptyState.component';

interface Props {
  setIsResetFilters: React.Dispatch<React.SetStateAction<boolean>>;
  handleResetButtonClick: () => void;
}

function EmptyStateContainer(props: Props) {
  const { handleResetButtonClick, setIsResetFilters } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const handleRedirectButtonClick = () => {
    if (location.pathname === '/') {
      handleResetButtonClick();
      setIsResetFilters(true);
    } else {
      navigate('/');
    }
  };

  return (
    <EmptyStateComponent
      handleRedirectButtonClick={handleRedirectButtonClick}
    />
  );
}

export default EmptyStateContainer;
