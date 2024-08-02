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
import { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { BiDollar } from 'react-icons/bi'

import { CrownIcon, MedalIcon, SatoshiIconTilted, StarIcon, TrophyIcon } from '../../../../../../../components/icons'
import { SatSymbolIcon } from '../../../../../../../components/icons/svg'
import { MonoBody1 } from '../../../../../../../components/typography'
import { useBtcContext } from '../../../../../../../context/btc'
import { commaFormatted } from '../../../../../../../utils'

interface IDonationInputProps extends Omit<InputProps, 'onChange'> {
  name: string
  onChange: (name: string, value: number) => void
  inputGroup?: InputGroupProps
}

export const DonationInput = ({ className, onChange, name, inputGroup, ...rest }: IDonationInputProps) => {
  const { btcRate } = useBtcContext()

  const inputRef = useRef<HTMLInputElement>(null)

  const { isOpen: isSatoshi, onToggle } = useDisclosure({ defaultIsOpen: true })
  const isDollar = !isSatoshi

  const [satoshi, setSatoshi] = useState(0)
  const [dollar, setDollar] = useState(0.0)

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replaceAll(',', '')
    const val = Number(value)

    if (!val) {
      setDollar(0)
      setSatoshi(0)
      return
    }

    if (isDollar) {
      setDollar(val)
      setSatoshi(Math.round(val / btcRate))
    } else {
      setSatoshi(val)
      setDollar(Math.round(val * btcRate))
    }
  }

  useEffect(() => {
    onChange(name, satoshi)
  }, [satoshi, name, onChange])

  const handleDefaultAmountButtonClick = (val: number) => {
    setDollar(val)
    setSatoshi(Math.round(val / btcRate))
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      inputRef.current?.blur()
    }
  }

  return (
    <VStack>
      <HStack width="100%" justifyContent="start" mt="5px">
        <Button
          variant="outline"
          colorScheme="neutral1"
          onClick={() => handleDefaultAmountButtonClick(10)}
          leftIcon={<MedalIcon />}
        >
          $10
        </Button>
        <Button
          variant="outline"
          colorScheme="neutral1"
          onClick={() => handleDefaultAmountButtonClick(50)}
          leftIcon={<TrophyIcon />}
        >
          $50
        </Button>
        <Button
          variant="outline"
          colorScheme="neutral1"
          onClick={() => handleDefaultAmountButtonClick(100)}
          leftIcon={<CrownIcon />}
        >
          $100
        </Button>
        <Button
          variant="outline"
          colorScheme="neutral1"
          onClick={() => handleDefaultAmountButtonClick(1000)}
          leftIcon={<StarIcon />}
        >
          $1000
        </Button>
      </HStack>

      <InputGroup {...inputGroup}>
        <InputLeftElement pt={1} pl={4} height={14}>
          {isSatoshi ? <SatSymbolIcon fontSize="24px" /> : <BiDollar fontSize="24px" />}
        </InputLeftElement>
        <Input
          ref={inputRef}
          data-testid="donation-input"
          height={14}
          borderRadius="12px"
          value={satoshi > 0 ? (isSatoshi ? commaFormatted(satoshi) : commaFormatted(dollar)) : ''}
          type="text"
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          pl={10}
          {...rest}
          _placeholder={{
            color: 'neutral.1000',
          }}
          color="neutral.1000"
          placeholder="0"
        />
        <InputRightElement pt={1} pr={'10px'} height={14} w="fit-content" minWidth="100px" maxWidth="150px">
          <Button w="100%" variant="soft" colorScheme="neutral1" onClick={onToggle}>
            {isSatoshi ? (
              <>
                <MonoBody1 isTruncated>
                  {dollar > 0 ? `$${commaFormatted(dollar)}` : satoshi > 0 ? '< $1' : '$0'}
                </MonoBody1>
              </>
            ) : (
              <>
                <SatSymbolIcon fontSize="16px" style={{ paddingBottom: '3px' }} />
                <MonoBody1 isTruncated>{commaFormatted(satoshi) || 0}</MonoBody1>
              </>
            )}
          </Button>
        </InputRightElement>
      </InputGroup>
    </VStack>
  )
}
