import {
  Button,
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputProps,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import classNames from 'classnames';
import { BiDollar } from 'react-icons/bi';
import { BsArrowRepeat } from 'react-icons/bs';
import { createUseStyles } from 'react-jss';

import { colors } from '../../styles';
import { Satoshis, USDollars } from '../../types/types';
import { SatoshiIconTilted } from '../icons';

const useStyles = createUseStyles({
  inputElement: {
    borderWidth: '2px',
    '&:focus': {
      borderColor: colors.normalLightGreen,
      boxShadow: `0 0 0 1px ${colors.normalLightGreen}`,
    },
  },
  inputError: {
    borderColor: colors.error,
    boxShadow: `0 0 0 1px ${colors.error}`,
  },
  switchButtton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    background: 'none',
    color: colors.textGrey,
    position: 'relative',
    '&:hover': {
      background: 'none',
    },
  },
  insideIcon: {
    position: 'absolute',
  },
  switchIcon: {
    fontSize: '35px',
  },
});

type Props = InputProps & {
  name?: string;
  onValueChanged: (newAmount: Satoshis | USDollars) => any;
  onUnitTypeChanged: (_: boolean) => void;
  isUsingSatoshis: boolean;
  inputGroup?: InputGroupProps;
  error?: string;
};

export const AmountInputWithSatoshiToggle = ({
  className,
  onValueChanged,
  name,
  inputGroup,
  isUsingSatoshis,
  onUnitTypeChanged,
  value,
  error,
  ...rest
}: Props) => {
  const classes = useStyles();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = isUsingSatoshis
      ? parseInt(event.target.value, 10)
      : parseFloat(event.target.value);

    onValueChanged(value as Satoshis);
  };

  return (
    <>
      <InputGroup {...inputGroup}>
        <InputLeftElement>
          {isUsingSatoshis ? (
            <SatoshiIconTilted />
          ) : (
            <BiDollar fontSize="25px" />
          )}
        </InputLeftElement>

        <Input
          value={value}
          type="number"
          className={classNames(
            classes.inputElement,
            { [classes.inputError]: Boolean(error) },
            className,
          )}
          onInput={handleInput}
          {...rest}
          placeholder="0"
        />

        <InputRightElement width="50px">
          <Button
            className={classes.switchButtton}
            onClick={() => onUnitTypeChanged(!isUsingSatoshis)}
            variant="ghost"
          >
            <BsArrowRepeat className={classes.switchIcon} />

            {isUsingSatoshis ? (
              <BiDollar className={classes.insideIcon} />
            ) : (
              <SatoshiIconTilted
                wrapperClass={classes.insideIcon}
                scale={0.7}
              />
            )}
          </Button>
        </InputRightElement>
      </InputGroup>

      {error && (
        <Text color="brand.error" fontSize="12px">
          {error}
        </Text>
      )}
    </>
  );
};
