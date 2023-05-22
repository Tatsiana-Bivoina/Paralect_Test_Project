import React, { useRef } from 'react';
import {
  Button,
  Flex,
  Group,
  NumberInput,
  NumberInputHandlers,
  Select,
  Text,
  Title,
  createStyles,
  rem,
} from '@mantine/core';
import { ReactComponent as CloseIcon } from '../../assets/close-icon.svg';
import { ReactComponent as ArrowDownIcon } from '../../assets/arrow-down-icon.svg';
import { ReactComponent as ArrowUp } from '../../assets/arrow-up.svg';
import { ReactComponent as ArrowDown } from '../../assets/arrow-down.svg';
import { Catalogue } from '../../types/apiTypes';

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
  },

  filtersContainer: {
    fontFamily: 'Inter',
    padding: '19px',
    width: '315px',
    height: '360px',
    background: '#fff',
    border: '1px solid #EAEBED',
    borderRadius: '12px',

    [theme.fn.smallerThan('md')]: {
      width: '100%',
      height: 'auto',
    },
  },

  filtersTitleContainer: {
    marginBottom: '28px',
  },

  filtersTitle: {
    fontFamily: 'Inter',
    lineHeight: '20px',
  },

  salaryTitle: {
    fontFamily: 'Inter',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '19px',
    color: '#232134',
    marginBottom: '8px',
  },

  inputNumberGroup: {
    position: 'relative',
  },

  paymentFromArrowUp: {
    position: 'absolute',
    right: '13px',
    top: '3px',
    width: '20px',
    height: '20px',
    padding: '4px',
    margin: 0,
    zIndex: 1,
  },

  paymentFromArrowDown: {
    position: 'absolute',
    right: '13px',
    bottom: '4px',
    width: '20px',
    height: '20px',
    padding: '4px',
    margin: 0,
    zIndex: 1,
  },
}));

interface Props {
  catalogues: Catalogue[];
  selectValue: string | null;
  paymentFrom: number | '';
  paymentTo: number | '';
  handlePaymentFromChange: (val: number | '') => void;
  handlePaymentToChange: (val: number | '') => void;
  handleIndustrySelectChange: (val: string | null) => void;
  handleResetButtonClick: () => void;
  getVacansiesButtonHandleClick: (page: number) => void;
}

export default function FiltersComponent(props: Props) {
  const {
    catalogues,
    selectValue,
    paymentFrom,
    paymentTo,
    handlePaymentFromChange,
    handlePaymentToChange,
    handleIndustrySelectChange,
    handleResetButtonClick,
    getVacansiesButtonHandleClick,
  } = props;

  const { classes } = useStyles();
  const paymentFromHandler = useRef<NumberInputHandlers>();
  const paymentToHandler = useRef<NumberInputHandlers>();

  const renderFiltersHeader = () => (
    <Flex justify="space-between" align="center" className={classes.filtersTitleContainer}>
      <Title order={3} size="20px" weight={700} color="#232134" className={classes.filtersTitle}>
        Фильтры
      </Title>
      <Button
        rightIcon={<CloseIcon />}
        variant="subtle"
        onClick={() => handleResetButtonClick()}
        styles={() => ({
          root: {
            border: 0,
            width: rem(115),
            height: rem(20),
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '20px',
            display: 'flex',
            alignItems: 'center',
            color: '#ACADB9',
            paddingLeft: 0,
            paddingRight: 0,
          },

          rightIcon: {
            marginLeft: rem(4),
          },
        })}
      >
        Сбросить все
      </Button>
    </Flex>
  );

  const renderSelect = () => (
    <Select
      data-elem="industry-select"
      value={selectValue || ''}
      onChange={(val) => handleIndustrySelectChange(val)}
      label="Отрасль"
      placeholder="Выберете отрасль"
      maxDropdownHeight={200}
      data={catalogues}
      rightSection={<ArrowDownIcon />}
      styles={(theme) => ({
        root: {
          [theme.fn.smallerThan('md')]: {
            width: '275px',
          },
        },
        input: {
          fontFamily: 'Inter',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '20px',
          borderRadius: '8px',
          width: '275px',
          height: '42px',
          border: '1px solid #D5D6DC',
          paddingLeft: rem(11),
          marginBottom: '16px',
          textOverflow: 'ellipsis',
        },
        label: {
          fontFamily: 'Inter',
          fontWeight: 700,
          fontSize: '16px',
          lineHeight: '19px',
          color: '#232134',
          marginBottom: '8px',
        },
        itemsWrapper: {
          width: '270px',
        },
        item: {
          fontSize: '12px',
          whiteSpace: 'pre-line',
        },
        rightSection: {
          width: '2.95rem',
          pointerEvents: 'none',
        },
      })}
    />
  );

  const renderInputPaymantFrom = () => (
    <Group className={classes.inputNumberGroup}>
      <Button
        className={classes.paymentFromArrowUp}
        rightIcon={<ArrowUp />}
        variant="transparent"
        onClick={() => paymentFromHandler.current?.increment()}
        styles={() => ({
          rightIcon: {
            width: '12px',
            height: '12px',
          },
        })}
      />
      <NumberInput
        data-elem="salary-from-input"
        hideControls
        handlersRef={paymentFromHandler}
        placeholder="От"
        value={paymentFrom}
        onChange={(val) => handlePaymentFromChange(val)}
        max={10000000}
        min={0}
        step={100}
        styles={() => ({
          input: {
            fontFamily: 'Inter',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
            borderRadius: '8px',
            width: '275px',
            height: '42px',
            border: '1px solid #D5D6DC',
            paddingLeft: rem(10),
          },
        })}
      />
      <Button
        className={classes.paymentFromArrowDown}
        rightIcon={<ArrowDown />}
        variant="transparent"
        onClick={() => paymentFromHandler.current?.decrement()}
        styles={() => ({
          rightIcon: {
            width: '12px',
            height: '12px',
          },
        })}
      />
    </Group>
  );

  const renderInputPaymantTo = () => (
    <Group className={classes.inputNumberGroup}>
      <Button
        className={classes.paymentFromArrowUp}
        rightIcon={<ArrowUp />}
        variant="transparent"
        onClick={() => paymentToHandler.current?.increment()}
        styles={() => ({
          rightIcon: {
            width: '12px',
            height: '12px',
          },
        })}
      />
      <NumberInput
        data-elem="salary-to-input"
        hideControls
        handlersRef={paymentToHandler}
        placeholder="До"
        value={paymentTo}
        onChange={(val) => handlePaymentToChange(val)}
        max={10000000}
        min={0}
        step={100}
        styles={() => ({
          input: {
            fontFamily: 'Inter',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
            borderRadius: '8px',
            width: '275px',
            height: '42px',
            border: '1px solid #D5D6DC',
            paddingLeft: rem(10),
          },
        })}
      />
      <Button
        className={classes.paymentFromArrowDown}
        rightIcon={<ArrowDown />}
        variant="transparent"
        onClick={() => paymentToHandler.current?.decrement()}
        styles={(theme) => ({
          rightIcon: {
            width: '12px',
            height: '12px',
          },
        })}
      />
    </Group>
  );

  const renderButtonApply = () => (
    <Button
      data-elem="search-button"
      variant="filled"
      onClick={() => getVacansiesButtonHandleClick(0)}
      styles={(theme) => ({
        root: {
          border: 0,
          width: rem(275),
          height: rem(40),
          fontFamily: 'Inter',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#5E96FC',
          borderRadius: '8px',
          color: '#fff',

          [theme.fn.smallerThan('md')]: {
            alignSelf: 'center',
          },
        },
      })}
    >
      Применить
    </Button>
  );

  return (
    <Flex direction="column" className={classes.filtersContainer}>
      {renderFiltersHeader()}
      <Flex
        direction="column"
        gap={4}
        sx={() => ({
          '@media (max-width: 62em)': {
            alignItems: 'center',
          },
        })}
      >
        {renderSelect()}
        <Flex direction="column">
          <Text className={classes.salaryTitle}>Оклад</Text>
          <Flex
            direction="column"
            gap={8}
            sx={() => ({
              marginBottom: rem(19),
            })}
          >
            {renderInputPaymantFrom()}
            {renderInputPaymantTo()}
          </Flex>
        </Flex>
      </Flex>
      {renderButtonApply()}
    </Flex>
  );
}
