import * as React from 'react';
import {
  Container,
  Flex,
  createStyles,
} from '@mantine/core';
import ReactPaginate from 'react-paginate';
import { VacancyResponse } from '../../types/apiTypes';
import VacanciesContainer from '../../components/VacanciesContainer/VacanciesContainer.container';
import { CONTAINER_PADDING, HEADER_HEIGHT } from '../../app.config';
import '../../styles/react-paginate.scss';

interface Props {
  favoriteVacancies: VacancyResponse[];
  isRequestFullfiled: boolean;
  pageCount: number;
  handlePageClick: (selectedItem: { selected: number }) => void;
  toggleFavoriteVacancyInVacancies: (newVacanciesArr: VacancyResponse[]) => void;
}

const useStyles = createStyles((theme) => ({
  mainSection: {
    width: '100%',
    minHeight: `calc(100vh - ${HEADER_HEIGHT})`,
  },

  root: {
    position: 'relative',
    width: '100%',
    minHeight: `calc(100vh - ${HEADER_HEIGHT} - ${CONTAINER_PADDING})`,

    [theme.fn.smallerThan('lg')]: {
      padding: '0 15px',
    },
  },
}));

export default function FavoriteVacanciesPageComponent(props: Props) {
  const {
    favoriteVacancies,
    isRequestFullfiled,
    pageCount,
    handlePageClick,
    toggleFavoriteVacancyInVacancies,
  } = props;
  const { classes } = useStyles();

  const renderFavoriteVacancies = () => (
    <Container size="773px" px={0} pt={40}>
      <Flex gap={103} direction="column" justify="space-between" className={classes.root}>
        <VacanciesContainer
          vacancies={favoriteVacancies}
          toggleFavoriteVacancyInVacancies={toggleFavoriteVacancyInVacancies}
        />
        <Flex justify="center" pb={44}>
          <ReactPaginate
            breakLabel={null}
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={0}
            pageCount={pageCount}
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
      </Flex>
    </Container>
  );

  return (
    <section className={classes.mainSection}>
      {isRequestFullfiled && favoriteVacancies.length !== 0 && renderFavoriteVacancies()}
    </section>
  );
}
