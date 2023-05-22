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
  toggleFavoriteVacancy: () => void;
}

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    padding: '24px 60px 24px 24px',
    gap: rem(12.5),
    width: '100%',
    minHeight: rem(137),
    height: 'auto',
    background: '#FFFFFF',
    border: '1px solid #EAEBED',
    borderRadius: '12px',

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
    toggleFavoriteVacancy,
  } = props;

  const { classes } = useStyles();

  const renderButtonStar = () => (
    <Button
      data-elem={`vacancy-${vacancy.id}-shortlist-button`}
      rightIcon={vacancy.isFavorite ? <PaintedStarIcon /> : <StarIcon />}
      variant="subtle"
      onClick={() => toggleFavoriteVacancy()}
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
        },
      })}
    />
  );

  const renderSalary = () => (
    <>
      {(vacancy.payment_from !== 0 && vacancy.payment_to === 0) && (
        <Text className={classes.salary}>
          з/п от
          &nbsp;
          {vacancy.payment_from}
          &nbsp;
          {vacancy.currency}
        </Text>
      )}
      {(vacancy.payment_from === 0 && vacancy.payment_to !== 0) && (
        <Text className={classes.salary}>
          з/п до
          &nbsp;
          {vacancy.payment_to}
          &nbsp;
          {vacancy.currency}
        </Text>
      )}
      {(vacancy.payment_from !== 0 && vacancy.payment_to !== 0) && (
        <Text className={classes.salary}>
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
        <Text className={classes.salary}>
          з/п по договоренности
        </Text>
      )}
    </>
  );

  return (
    <Flex
      direction="column"
      className={classes.root}
      data-elem={`vacancy-${vacancy.id}`}
    >
      <Title order={2} className={classes.profession}>{vacancy.profession}</Title>
      <Flex
        gap={12}
        align="center"
        className={classes.salaryContainer}
      >
        {renderSalary()}
        <DotIcon className={classes.dotIcon} />
        <Text className={classes.typeOfWork}>
          {vacancy.type_of_work_title}
        </Text>
      </Flex>
      <Flex gap={11}>
        <LocationIcon />
        <Text className={classes.location}>
          {vacancy.town_title}
        </Text>
      </Flex>
      {renderButtonStar()}
    </Flex>
  );
}
