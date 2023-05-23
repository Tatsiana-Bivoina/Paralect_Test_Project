import React from 'react';
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Text,
  rem,
  Button,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo-icon.svg';

const HEADER_HEIGHT = rem('84');

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    maxWidth: '1116px',
    padding: '10px 0',
    gap: '25.2%',
    alignItems: 'center',
    height: '100%',

    [theme.fn.smallerThan('lg')]: {
      padding: '10px 15px',
    },

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'space-between',
      gap: 0,
    },
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    textDecoration: 'none',
    fontFamily: 'Inter',
    fontSize: theme.fontSizes.md,
    fontWeight: 400,
    lineHeight: '20px',
    color: '#232134',

    '&:hover': {
      color: '#5E96FC',
    },

    '&.active': {
      fontWeight: 500,
      color: '#5E96FC',
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  logoContainer: {
    display: 'flex',
    alignItems: 'center',

    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

interface HeaderProps {
  links: { link: string; label: string }[];
  logoHandleClick: () => void;
}

export default function HeaderComponent(props: HeaderProps) {
  const { links, logoHandleClick } = props;
  const [opened, { toggle, close }] = useDisclosure(false);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <Text
      component={NavLink}
      variant="link"
      key={link.label}
      to={link.link}
      className={cx(classes.link)}
      onClick={() => close()}
    >
      {link.label}
    </Text>
  ));

  const renderLogoContainer = () => (
    <Group className={classes.logoContainer}>
      <Button
        leftIcon={<Logo />}
        variant="subtle"
        onClick={() => logoHandleClick()}
        styles={() => ({
          root: {
            border: 0,
            padding: 0,
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '36px',
            letterSpacing: '-0.02em',
            color: '#232134',
            margin: 0,

            '&:hover': {
              backgroundColor: 'transparent',
            },
          },
          icon: {
            marginRight: '12px !important',
          },
        })}
      >
        Jobored
      </Button>
    </Group>
  );

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        {renderLogoContainer()}
        <Group spacing={rem(60)} className={classes.links}>
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
