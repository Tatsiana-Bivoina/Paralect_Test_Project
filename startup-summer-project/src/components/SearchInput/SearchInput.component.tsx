import React from 'react';
import {
  Button,
  TextInput,
  em,
  rem,
} from '@mantine/core';
import { ReactComponent as IconSearch } from '../../assets/search-icon.svg';

interface Props {
  searchInputValue: string;
  searchHandleChange: (value: string) => void;
  getVacansiesButtonHandleClick: () => void;
}

export default function SearchInputComponent(props: Props) {
  const {
    searchInputValue,
    searchHandleChange,
    getVacansiesButtonHandleClick,
  } = props;

  return (
    <TextInput
      data-elem="search-input"
      icon={<IconSearch />}
      value={searchInputValue}
      onChange={(ev) => searchHandleChange(ev.target.value)}
      rightSection={(
        <Button
          data-elem="search-button"
          onClick={() => getVacansiesButtonHandleClick()}
          styles={() => ({
            root: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: rem(83),
              height: rem(32),
              borderRadius: '8px',
              fontFamily: 'Inter',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '21px',
              color: '#fff',
              padding: '4px 20px',
              gap: '10px',
              background: '#5E96FC',
              right: '12px',
            },
          })}
        >
          Поиск
        </Button>
      )}
      placeholder="Введите название вакансии"
      rightSectionWidth={83}
      styles={(theme) => ({
        input: {
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: rem(48),
          border: '1px solid #EAEBED',
          borderRadius: '8px',
          fontFamily: 'Inter',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '21px',
          color: '#ACADB9',
          paddingRight: rem(100),

          '&[data-with-icon]': {
            paddingLeft: rem(34),
          },

          '&::placeholder': {
            [`@media (max-width: ${em(400)})`]: {
              opacity: 0,
            },
          },
        },
        icon: {
          width: '16px',
          height: '16px',
          top: '50%',
          left: '12px',
          transform: 'translateY(-50%)',
        },
      })}
    />
  );
}
