import React from 'react';
import {
  Button,
  Flex,
  Title,
  createStyles,
  rem,
} from '@mantine/core';
import { ReactComponent as ManImage } from '../../assets/man-image.svg';

interface Props {
  handleRedirectButtonClick: () => void;
}

const useStyles = createStyles(() => ({
  root: {
    width: '100%',
    minHeight: 'calc(100vh - 84px)',
    justifyContent: 'center',
    paddingTop: '120px',
  },

  contentBlock: {
    width: '328px',
    alignItems: 'center',
  },

  image: {
    width: '240px',
    height: '230.27px',
  },

  title: {
    fontFamily: 'Inter',
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '29px',
    color: '#343A40',
  },
}));

export default function EmptyStateComponent(props: Props) {
  const { handleRedirectButtonClick } = props;
  const { classes } = useStyles();

  const renderButton = () => (
    <Button
      variant="subtle"
      onClick={() => handleRedirectButtonClick()}
      styles={() => ({
        root: {
          border: 0,
          padding: '10px 24px',
          width: rem(164),
          height: rem(42),
          borderRadius: '8px',
          backgroundColor: '#DEECFF',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
        label: {
          fontFamily: 'Open Sans',
          fontWeight: 600,
          fontSize: '14px',
          lineHeight: '155%',
          color: '#3B7CD3',
        },
      })}
    >
      Поиск Вакансий
    </Button>
  );

  return (
    <Flex className={classes.root}>
      <Flex direction="column" gap={32} className={classes.contentBlock}>
        <ManImage className={classes.image} />
        <Title order={2} className={classes.title}>
          Упс, здесь еще ничего нет!
        </Title>
        {renderButton()}
      </Flex>
    </Flex>
  );
}
