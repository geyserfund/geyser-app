import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  Button,
  InputGroupProps,
  Text,
} from '@chakra-ui/react';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { BiDollar } from 'react-icons/bi';
import { BsArrowRepeat } from 'react-icons/bs';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants';
import { useBtcContext } from '../../context/btc';
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

interface IDonationInputWithSatoshiProps extends InputProps {
  name?: string;
  onChange: any;
  onChangeSatoshi: (_: boolean) => void;
  amountSatoshi: boolean;
  inputGroup?: InputGroupProps;
  error?: string;
}

export const DonationInputWithSatoshi = ({
  className,
  onChange,
  name,
  inputGroup,
  amountSatoshi,
  onChangeSatoshi,
  value,
  error,
  ...rest
}: IDonationInputWithSatoshiProps) => {
  const { btcRate } = useBtcContext();

  const classes = useStyles();

  const isDollar = !amountSatoshi;

  const [satoshi, setSatoshi] = useState(0);
  const [dollar, setDollar] = useState(0.0);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(event.target.value, 10);
    onChange(name, val);
    if (isDollar) {
      setDollar(val);
      setSatoshi(Math.round(val / btcRate));
    } else {
      setSatoshi(val);
      setDollar(Math.round(val * btcRate));
    }
  };

  useEffect(() => {
    if (amountSatoshi) {
      if (value && satoshi) {
        onChange(name, satoshi);
      }
    } else if (value && dollar) {
      onChange(name, dollar);
    }
  }, [satoshi, dollar, amountSatoshi]);

  useEffect(() => {
    console.log('checking value', value);
    if (amountSatoshi) {
      const newValue = parseInt(`${value}`, 10);
      if (satoshi !== newValue) {
        setSatoshi(newValue);
        setDollar(Math.round(newValue * btcRate));
      }
    } else {
      const newValue = parseInt(`${value}`, 10);
      if (dollar !== newValue) {
        setDollar(newValue);
        setSatoshi(Math.round(newValue / btcRate));
      }
    }
  }, [value]);

  return (
    <>
      <InputGroup {...inputGroup}>
        <InputLeftElement>
          {amountSatoshi ? <SatoshiIconTilted /> : <BiDollar fontSize="25px" />}
        </InputLeftElement>
        <Input
          value={value}
          type="number"
          className={classNames(
            classes.inputElement,
            { [classes.inputError]: Boolean(error) },
            className,
          )}
          onChange={handleInput}
          {...rest}
          placeholder="0"
        />
        <InputRightElement width="50px">
          <Button
            className={classes.switchButtton}
            onClick={() => {
              console.log('checking onclick event');
              onChangeSatoshi(!amountSatoshi);
            }}
            variant="ghost"
          >
            <BsArrowRepeat className={classes.switchIcon} />
            {amountSatoshi ? (
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
