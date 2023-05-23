import * as React from 'react';
import {
  Container,
  Flex,
  LoadingOverlay,
  Title,
  createStyles,
  rem,
} from '@mantine/core';
import ReactPaginate from 'react-paginate';
import Filters from '../../components/Filters/Filters.container';
import SearchInput from '../../components/SearchInput/SearchInput.container';
import VacanciesContainer from '../../components/VacanciesContainer/VacanciesContainer.container';
import { Catalogue, VacancyResponse } from '../../types/apiTypes';
import '../../styles/react-paginate.scss';

interface Props {
  vacancies: VacancyResponse[];
  catalogues: Catalogue[];
  selectValue: string | null;
  paymentFrom: number | '';
  paymentTo: number | '';
  searchInputValue: string;
  visible: boolean;
  pagesCount: number;
  currentPage: number;
  homePageError: string;
  toggleFavoriteVacancyInVacancies: (arr: VacancyResponse[]) => void;
  handleIndustrySelectChange: (val: string | null) => void;
  handlePaymentFromChange: (val: number | '') => void;
  handlePaymentToChange: (val: number | '') => void;
  handleResetButtonClick: () => void;
  searchHandleChange: (value: string) => void;
  getVacansiesButtonHandleClick: (page: number) => void;
  handlePageClick: (selectedItem: {
    selected: number;
  }) => void;
}

const useStyles = createStyles((theme) => ({
  mainSection: {
    width: '100%',
    minHeight: 'calc(100vh - 84px)',
  },

  root: {
    position: 'relative',
    width: '100%',

    [theme.fn.smallerThan('lg')]: {
      padding: '0 15px',
    },

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },

  mainDataContainer: {
    width: '773px',
    gap: '16px',

    [theme.fn.smallerThan('md')]: {
      width: '100%',
    },
  },

  loaderOverlay: {
    minHeight: 'calc(100vh - 84px)',
    marginTop: '84px',
  },

  errorContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: rem(60),
  },

  errorMessage: {
    fontFamily: 'Inter',
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '19px',
    color: '#e71414',
    textAlign: 'center',
  },
}));

export default function HomePageComponent(props: Props) {
  const {
    vacancies,
    catalogues,
    selectValue,
    paymentFrom,
    paymentTo,
    searchInputValue,
    visible,
    pagesCount,
    currentPage,
    homePageError,
    toggleFavoriteVacancyInVacancies,
    handleIndustrySelectChange,
    handlePaymentFromChange,
    handlePaymentToChange,
    handleResetButtonClick,
    searchHandleChange,
    getVacansiesButtonHandleClick,
    handlePageClick,
  } = props;
  const { classes } = useStyles();

  const renderFilters = () => (
    <Filters
      catalogues={catalogues}
      selectValue={selectValue}
      paymentFrom={paymentFrom}
      paymentTo={paymentTo}
      handleIndustrySelectChange={handleIndustrySelectChange}
      handlePaymentFromChange={handlePaymentFromChange}
      handlePaymentToChange={handlePaymentToChange}
      handleResetButtonClick={handleResetButtonClick}
      getVacansiesButtonHandleClick={getVacansiesButtonHandleClick}
    />
  );

  const renderSearch = () => (
    <div>
      <SearchInput
        searchInputValue={searchInputValue}
        searchHandleChange={searchHandleChange}
        getVacansiesButtonHandleClick={getVacansiesButtonHandleClick}
      />
    </div>
  );

  const renderVacanciesContainer = () => (
    <div>
      <VacanciesContainer
        vacancies={vacancies}
        toggleFavoriteVacancyInVacancies={toggleFavoriteVacancyInVacancies}
      />
    </div>
  );

  const renderLoader = () => (
    <LoadingOverlay
      className={classes.loaderOverlay}
      loaderProps={{ size: '50px', color: '#5E96FC', variant: 'oval' }}
      overlayOpacity={0.3}
      overlayColor="#c5c5c5"
      visible={visible}
    />
  );

  const renderPagination = () => (
    <Flex justify="center" pt={23}>
      <ReactPaginate
        breakLabel={null}
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        forcePage={currentPage}
        marginPagesDisplayed={0}
        pageCount={pagesCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="pagination-container"
        pageClassName="items"
        pageLinkClassName="links"
        activeClassName="active-item"
        activeLinkClassName="active-link"
        previousClassName="items"
        previousLinkClassName="arrowButton"
        nextClassName="items"
        nextLinkClassName="arrowButton"
        disabledClassName="disabled-item"
        disabledLinkClassName="disabled-link"
      />
    </Flex>
  );

  const renderError = () => (
    <Flex className={classes.errorContainer}>
      <Title order={2} className={classes.errorMessage}>{homePageError}</Title>
    </Flex>
  );

  const renderVacancies = () => (
    <Container size="1116px" px={0} pt={40}>
      <Flex gap={28} className={classes.root}>
        {renderFilters()}
        <Flex direction="column" className={classes.mainDataContainer}>
          {renderSearch()}
          {homePageError !== '' && renderError()}
          {homePageError === '' && vacancies && vacancies.length !== 0 && (
            <>
              {renderVacanciesContainer()}
              {renderPagination()}
            </>
          )}
        </Flex>
      </Flex>
    </Container>
  );

  return (
    <section className={classes.mainSection}>
      {renderLoader()}
      {renderVacancies()}
    </section>
  );
}
