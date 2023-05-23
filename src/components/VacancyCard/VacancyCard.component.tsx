import React from 'react';
import {
  Flex,
  Title,
  Text,
  createStyles,
  Button,
  rem,
} from '@mantine/core';
import { ReactComponent as DotIcon } from '../../assets/dot-icon.svg';
import { ReactComponent as LocationIcon } from '../../assets/location-icon.svg';
import { ReactComponent as StarIcon } from '../../assets/star-icon.svg';
import { ReactComponent as PaintedStarIcon } from '../../assets/painted-star-icon.svg';
import { VacancyResponse } from '../../types/apiTypes';

interface Props {
  vacancy: VacancyResponse;
  isVacancyPage: boolean;
  toggleFavoriteVacancy: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleCardClick: () => void;
}

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    padding: '24px 60px 24px 24px',
    width: '100%',
    minHeight: rem(137),
    background: '#FFFFFF',
    border: '1px solid #EAEBED',
    borderRadius: '12px',

    '&:hover': {
      cursor: 'pointer',
      border: '1px solid #b0b2b6',
    },

    [theme.fn.smallerThan('sm')]: {
      height: 'auto',
    },
  },

  profession: {
    fontFamily: 'Inter',
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '24px',
    color: '#5E96FC',
    textOverflow: 'ellipsis',

    [theme.fn.smallerThan('xs')]: {
      fontSize: '18px',
    },
  },

  vacancyPageProfession: {
    fontFamily: 'Inter',
    fontWeight: 700,
    fontSize: '28px',
    lineHeight: '34px',
    color: '#232134',
    textOverflow: 'ellipsis',

    [theme.fn.smallerThan('xs')]: {
      fontSize: '18px',
    },
  },

  salaryContainer: {
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },

  salary: {
    fontFamily: 'Inter',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '20px',
    color: '#232134',
  },

  vacancyPageSalary: {
    fontFamily: 'Inter',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '20px',
    color: '#232134',
  },

  dotIcon: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  typeOfWork: {
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '20px',
    color: '#232134',
  },

  vacancyPageTypeOfWork: {
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: '20px',
    lineHeight: '20px',
    color: '#232134',
  },

  locationIcon: {
    width: '20px',
    height: '20px',
  },

  location: {
    fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '19px',
    color: '#232134',
  },
}));

export default function VacancyCardComponent(props: Props) {
  const {
    vacancy,
    isVacancyPage,
    toggleFavoriteVacancy,
    handleCardClick,
  } = props;

  const { classes } = useStyles();

  const renderButtonStar = () => (
    <Button
      data-elem={`vacancy-${vacancy.id}-shortlist-button`}
      rightIcon={vacancy.isFavorite ? <PaintedStarIcon /> : <StarIcon />}
      variant="subtle"
      onClick={(event) => toggleFavoriteVacancy(event)}
      styles={() => ({
        root: {
          border: 0,
          padding: 0,
          width: rem(22),
          height: rem(22),
          position: 'absolute',
          top: '23px',
          right: '24px',

          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
        label: {
          display: 'none',
        },
        icon: {
          marginLeft: '0 !important',
          stroke: '#ACADB9',
          strokeWidth: 1.5,

          '&:hover': {
            strokeWidth: 2.5,
          },
        },
      })}
    />
  );

  const renderSalary = () => (
    <>
      {(vacancy.payment_from !== 0 && vacancy.payment_to === 0) && (
        <Text className={isVacancyPage ? classes.vacancyPageSalary : classes.salary}>
          з/п от
          &nbsp;
          {vacancy.payment_from}
          &nbsp;
          {vacancy.currency}
        </Text>
      )}
      {(vacancy.payment_from === 0 && vacancy.payment_to !== 0) && (
        <Text className={isVacancyPage ? classes.vacancyPageSalary : classes.salary}>
          з/п до
          &nbsp;
          {vacancy.payment_to}
          &nbsp;
          {vacancy.currency}
        </Text>
      )}
      {(vacancy.payment_from !== 0 && vacancy.payment_to !== 0) && (
        <Text className={isVacancyPage ? classes.vacancyPageSalary : classes.salary}>
          з/п от
          &nbsp;
          {vacancy.payment_from}
          &nbsp;
          до
          &nbsp;
          {vacancy.payment_to}
          &nbsp;
          {vacancy.currency}
        </Text>
      )}
      {(vacancy.payment_from === 0 && vacancy.payment_to === 0) && (
        <Text className={isVacancyPage ? classes.vacancyPageSalary : classes.salary}>
          з/п по договоренности
        </Text>
      )}
    </>
  );

  return (
    <Flex
      direction="column"
      className={classes.root}
      gap={isVacancyPage ? 16 : 12.5}
      data-elem={`vacancy-${vacancy.id}`}
      onClick={() => handleCardClick()}
    >
      <Title
        order={2}
        className={isVacancyPage ? classes.vacancyPageProfession : classes.profession}
      >
        {vacancy.profession}
      </Title>
      <Flex
        gap={12}
        align="center"
        className={classes.salaryContainer}
      >
        {renderSalary()}
        <DotIcon className={classes.dotIcon} />
        <Text className={isVacancyPage ? classes.vacancyPageTypeOfWork : classes.typeOfWork}>
          {vacancy.type_of_work_title}
        </Text>
      </Flex>
      <Flex gap={11}>
        <LocationIcon className={classes.locationIcon} />
        <Text className={classes.location}>
          {vacancy.town_title}
        </Text>
      </Flex>
      {renderButtonStar()}
    </Flex>
  );
}
