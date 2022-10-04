import React from 'react';
import Select from 'react-select';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants';
import classNames from 'classnames';
import { useDisclosure } from '@chakra-ui/react';

const useStyles = createUseStyles({
  focused: {
    '& .platform__select__control': {
      borderColor: `${colors.normalLightGreen} !important`,
      boxShadow: `0 0 0 1px ${colors.normalLightGreen}`,
    },
  },
  inputElement: {
    '& .platform__select__control': {
      borderWidth: '2px',
      borderColor: colors.gray200,
      '&:hover': {
        borderColor: colors.gray300,
      },
      '&:active': {
        borderColor: colors.normalLightGreen,
        boxShadow: `0 0 0 1px ${colors.normalLightGreen}`,
      },
    },
    '& .platform__select__menu': {
      zIndex: 9,
    },
    '& .platform__select__option': {
      '&:hover': {
        backgroundColor: colors.normalLightGreen,
      },
    },
    '& .platform__select__option--is-selected': {
      backgroundColor: colors.bgLightGreen,
      color: 'black',
    },
  },
});

export const SelectComponent = ({
  name,
  onChange,
  className,
  ...rest
}: any) => {
  const { isOpen: focused, onOpen: onFocus, onClose: onBlur } = useDisclosure();
  const classes = useStyles();

  const onSelect = (option: any) => {
    onChange(name, option.value);
  };

  return (
    <Select
      onFocus={onFocus}
      onBlur={onBlur}
      classNamePrefix="platform__select"
      className={classNames(classes.inputElement, className, {
        [classes.focused]: focused,
      })}
      onChange={onSelect}
      {...rest}
    />
  );
};
