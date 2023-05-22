import React from 'react';
import SearchInputComponent from './SearchInput.component';

interface Props {
  searchInputValue: string;
  searchHandleChange: (value: string) => void;
  getVacansiesButtonHandleClick: (page: number) => void;
}

function SearchInputContainer(props: Props) {
  const {
    searchInputValue,
    searchHandleChange,
    getVacansiesButtonHandleClick,
  } = props;

  return (
    <SearchInputComponent
      searchInputValue={searchInputValue}
      searchHandleChange={searchHandleChange}
      getVacansiesButtonHandleClick={getVacansiesButtonHandleClick}
    />
  );
}

export default SearchInputContainer;
