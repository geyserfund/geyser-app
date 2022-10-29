import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  Button,
  useDisclosure,
  InputGroupProps,
  VStack,
  HStack,
} from '@chakra-ui/react';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { BiDollar } from 'react-icons/bi';
import { BsArrowRepeat } from 'react-icons/bs';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants';
import { useBtcContext } from '../../context/btc';
import {
  CrownIcon,
  MedalIcon,
  SatoshiIconTilted,
  StarIcon,
  TrophyIcon,
} from '../icons';
import { ButtonComponent } from '../ui';

const useStyles = createUseStyles({
  inputElement: {
    borderWidth: '2px',
    '&:focus': {
      borderColor: colors.normalLightGreen,
      boxShadow: `0 0 0 1px ${colors.normalLightGreen}`,
    },
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
  defaultAmountButtons: {
    borderWidth: '2px',
    boxShadow: 'none',
    '&:focus': {
      borderColor: colors.normalLightGreen,
    },
  },
});

interface IDonationInputProps extends InputProps {
  name: string;
  onChange: any;
  inputGroup?: InputGroupProps;
}

export const DonationInput = ({
  className,
  onChange,
  name,
  inputGroup,
  ...rest
}: IDonationInputProps) => {
  const { btcRate } = useBtcContext();

  const classes = useStyles();

  const { isOpen: isSatoshi, onToggle } = useDisclosure();
  const isDollar = !isSatoshi;

  const [satoshi, setSatoshi] = useState(0);
  const [dollar, setDollar] = useState(0.0);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(event.target.value, 10);
    if (isDollar) {
      setDollar(val);
      setSatoshi(Math.round(val / btcRate));
    } else {
      setSatoshi(val);
      setDollar(Math.round(val * btcRate));
    }
  };

  useEffect(() => {
    if (!satoshi) {
      onChange(name, 0);
    } else {
      onChange(name, satoshi);
    }
  }, [satoshi]);

  const handleDefaultAmountButtonClick = (val: number) => {
    setDollar(val);
    setSatoshi(Math.round(val / btcRate));
  };

  return (
    <VStack>
      <HStack width="100%" justifyContent="space-around" mt="5px">
        <ButtonComponent
          className={classes.defaultAmountButtons}
          onClick={() => handleDefaultAmountButtonClick(10)}
          leftIcon={<MedalIcon />}
        >
          $ 10
        </ButtonComponent>
        <ButtonComponent
          className={classes.defaultAmountButtons}
          onClick={() => handleDefaultAmountButtonClick(50)}
          leftIcon={<TrophyIcon />}
        >
          $ 50
        </ButtonComponent>
        <ButtonComponent
          className={classes.defaultAmountButtons}
          onClick={() => handleDefaultAmountButtonClick(100)}
          leftIcon={<CrownIcon />}
        >
          $ 100
        </ButtonComponent>
        <ButtonComponent
          className={classes.defaultAmountButtons}
          onClick={() => handleDefaultAmountButtonClick(1000)}
          leftIcon={<StarIcon />}
        >
          $ 1000
        </ButtonComponent>
      </HStack>

      <InputGroup {...inputGroup}>
        <InputLeftElement>
          {isSatoshi ? <SatoshiIconTilted /> : <BiDollar fontSize="25px" />}
        </InputLeftElement>
        <Input
          value={satoshi > 0 ? (isSatoshi ? satoshi : dollar) : undefined}
          type="number"
          className={classNames(classes.inputElement, className)}
          onChange={handleInput}
          {...rest}
          placeholder="0"
        />
        <InputRightElement width="50px">
          <Button
            className={classes.switchButtton}
            onClick={onToggle}
            variant="ghost"
          >
            <BsArrowRepeat className={classes.switchIcon} />
            {isSatoshi ? (
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
    </VStack>
  );
};
