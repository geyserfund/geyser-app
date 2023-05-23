import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputProps,
  InputRightElement,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { BiDollar } from 'react-icons/bi'
import { BsArrowRepeat } from 'react-icons/bs'
import { createUseStyles } from 'react-jss'

import { ReactJSSTheme } from '../../context'
import { useBtcContext } from '../../context/btc'
import { fonts } from '../../styles'
import {
  CrownIcon,
  MedalIcon,
  SatoshiIconTilted,
  StarIcon,
  TrophyIcon,
} from '../icons'
import { SatSymbolIcon } from '../icons/svg'
import { ButtonComponent } from '../ui'

const useStyles = createUseStyles((theme: ReactJSSTheme) => ({
  inputElement: {
    borderWidth: '2px',
    '&:focus': {
      borderColor: theme.neutral[500],
      boxShadow: `0 0 0 1px ${theme.neutral[500]}`,
    },
    fontFamily: fonts.inter,
    fontWeight: 700,
    fontSize: '30px',
  },
  switchButtton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    background: 'none',
    color: theme.neutral[600],
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
      borderColor: theme.neutral[500],
    },
  },
}))

interface IDonationInputProps extends InputProps {
  name: string
  onChange: any
  inputGroup?: InputGroupProps
}

export const DonationInput = ({
  className,
  onChange,
  name,
  inputGroup,
  ...rest
}: IDonationInputProps) => {
  const { btcRate } = useBtcContext()

  const classes = useStyles()

  const { isOpen: isSatoshi, onToggle } = useDisclosure()
  const isDollar = !isSatoshi

  const [satoshi, setSatoshi] = useState(0)
  const [dollar, setDollar] = useState(0.0)

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(event.target.value, 10)
    if (isDollar) {
      setDollar(val)
      setSatoshi(Math.round(val / btcRate))
    } else {
      setSatoshi(val)
      setDollar(Math.round(val * btcRate))
    }
  }

  useEffect(() => {
    if (!satoshi) {
      onChange(name, 0)
    } else {
      onChange(name, satoshi)
    }
  }, [satoshi])

  const handleDefaultAmountButtonClick = (val: number) => {
    setDollar(val)
    setSatoshi(Math.round(val / btcRate))
  }

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
        <InputLeftElement pt={1} pl={4} height={14}>
          {isSatoshi ? (
            <SatSymbolIcon fontSize="16px" />
          ) : (
            <BiDollar fontSize="18px" />
          )}
        </InputLeftElement>
        <Input
          height={14}
          value={satoshi > 0 ? (isSatoshi ? satoshi : dollar) : ''}
          type="number"
          className={classNames(classes.inputElement, className)}
          onChange={handleInput}
          pl={10}
          {...rest}
          _placeholder={{
            color: 'primary.textBlack',
          }}
          color="primary.textBlack"
          placeholder="0"
        />
        <InputRightElement pt={1} pr={6} height={14}>
          <Button
            className={classes.switchButtton}
            onClick={onToggle}
            variant="ghost"
          >
            <BsArrowRepeat className={classes.switchIcon} />
            {isSatoshi ? (
              <BiDollar className={classes.insideIcon} />
            ) : (
              <SatoshiIconTilted position="absolute" scale={0.7} />
            )}
          </Button>
        </InputRightElement>
      </InputGroup>
    </VStack>
  )
}
