import * as React from 'react';
import {
  Container,
  Flex,
  LoadingOverlay,
  createStyles,
  rem,
} from '@mantine/core';
import { VacanciesResponseType, VacancyResponse } from '../../types/apiTypes';
import VacanciesContainer from '../../components/VacanciesContainer/VacanciesContainer.container';

interface Props {
  vacancy: VacanciesResponseType;
  currentVacancy: VacancyResponse[];
  vacancyError: string;
  visible: boolean;
  toggleFavoriteVacancyInVacancies: (newVacanciesArr: VacancyResponse[]) => void;
}

const useStyles = createStyles((theme) => ({
  mainSection: {
    width: '100%',
    minHeight: 'calc(100vh - 84px)',
  },

  root: {
    position: 'relative',
    width: '100%',
    gap: rem(20),

    [theme.fn.smallerThan('lg')]: {
      padding: '0 15px',
    },
  },

  loaderOverlay: {
    minHeight: 'calc(100vh - 84px)',
    marginTop: '84px',
  },

  vacancyDescriptionBlock: {
    padding: '7px 55px 24px 24px',
    background: '#FFFFFF',
    border: '1px solid #EAEBED',
    borderRadius: '12px',

    [theme.fn.smallerThan('sm')]: {
      paddingRight: '24px',
    },

    '&, p, li': {
      fontFamily: 'Inter',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '140%',
      color: '#232134',
      textAlign: 'justify',
    },

    '& b': {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '20px',
      lineHeight: '20px',
      color: '#232134',
    },
  },
}));

export default function VacancyPageComponent(props: Props) {
  const {
    vacancy,
    currentVacancy,
    vacancyError,
    visible,
    toggleFavoriteVacancyInVacancies,
  } = props;

  const { classes } = useStyles();

  const renderLoader = () => (
    <LoadingOverlay
      className={classes.loaderOverlay}
      loaderProps={{ size: '50px', color: '#5E96FC', variant: 'oval' }}
      overlayOpacity={0.3}
      overlayColor="#c5c5c5"
      visible={visible}
    />
  );

  const renderVacancyDescription = () => (
    <div
      dangerouslySetInnerHTML={{ __html: vacancy.vacancyRichText }}
      className={classes.vacancyDescriptionBlock}
    />
  );

  const renderVacancy = () => (
    <Container size="773px" px={0} pt={40}>
      <Flex direction="column" className={classes.root}>
        <VacanciesContainer
          vacancies={currentVacancy}
          toggleFavoriteVacancyInVacancies={toggleFavoriteVacancyInVacancies}
        />
        {renderVacancyDescription()}
      </Flex>
    </Container>
  );

  return (
    <section className={classes.mainSection}>
      {renderLoader()}
      {!visible && renderVacancy()}
    </section>
  );
}
