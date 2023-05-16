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
  Title,
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

    '&:hover, &.active': {
      fontWeight: 500,
      color: '#5E96FC',
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  logoTitle: {
    fontFamily: 'Poppins',
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '36px',
    letterSpacing: '-0.02em',
    margin: 0,
  },

  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
}));

interface HeaderResponsiveProps {
  links: { link: string; label: string }[];
}

export default function HeaderComponent({ links }: HeaderResponsiveProps) {
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

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <Group spacing={12} className={classes.logoContainer}>
          <Logo />
          <Title className={classes.logoTitle}>Jobored</Title>
        </Group>
        <Group spacing={60} className={classes.links}>
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
