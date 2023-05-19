import React, { useEffect, useState } from 'react';
import FilterComponent from './Filters.component';
import { getCatalogues } from '../../service/homePageService';
import { Catalogue } from '../../types/apiTypes';

interface Props {
  catalogues: Catalogue[];
  selectValue: string | null;
  paymentFrom: number | '';
  paymentTo: number | '';
  handleIndustrySelectChange: (val: string | null) => void;
  handlePaymentFromChange: (val: number | '') => void;
  handlePaymentToChange: (val: number | '') => void;
  handleResetButtonClick: () => void;
  getVacansiesButtonHandleClick: () => void;
}

function FiltersContainer(props: Props) {
  const {
    catalogues,
    selectValue,
    paymentFrom,
    paymentTo,
    handleIndustrySelectChange,
    handlePaymentFromChange,
    handlePaymentToChange,
    handleResetButtonClick,
    getVacansiesButtonHandleClick,
  } = props;

  return (
    <FilterComponent
      catalogues={catalogues}
      selectValue={selectValue}
      paymentFrom={paymentFrom}
      paymentTo={paymentTo}
      handlePaymentToChange={handlePaymentToChange}
      handlePaymentFromChange={handlePaymentFromChange}
      handleIndustrySelectChange={handleIndustrySelectChange}
      handleResetButtonClick={handleResetButtonClick}
      getVacansiesButtonHandleClick={getVacansiesButtonHandleClick}
    />
  );
}

export default FiltersContainer;
