import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EmptyStateComponent from './EmptyState.component';

function EmptyStateContainer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRedirectButtonClick = () => {
    if (location.state === '/') {
      localStorage.setItem('industry', '');
      localStorage.setItem('paymentFrom', '');
      localStorage.setItem('paymentTo', '');
    }
    navigate('/');
  };

  return (
    <EmptyStateComponent
      handleRedirectButtonClick={handleRedirectButtonClick}
    />
  );
}

export default EmptyStateContainer;
