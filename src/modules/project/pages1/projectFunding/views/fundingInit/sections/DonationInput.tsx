import {
  Button,
  ButtonProps,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { KeyboardEvent, useRef, useState } from 'react'
import { BiDollar } from 'react-icons/bi'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { H1 } from '@/shared/components/typography'

import { CrownIcon, MedalIcon, StarIcon, TrophyIcon } from '../../../../../../../components/icons'
import { SatSymbolIcon } from '../../../../../../../components/icons/svg'
import { MonoBody1 } from '../../../../../../../components/typography'
import { useBtcContext } from '../../../../../../../context/btc'
import { commaFormatted } from '../../../../../../../utils'

export const DonationInput = () => {
  const { btcRate } = useBtcContext()

  const inputRef = useRef<HTMLInputElement>(null)

  const {
    formState: { donationAmount },
    setState,
  } = useFundingFormAtom()

  const satoshi = donationAmount
  const setSatoshi = (val: number) => {
    setState('donationAmount', val)
  }

  const { isOpen: isSatoshi, onToggle } = useDisclosure({ defaultIsOpen: true })
  const isDollar = !isSatoshi

  const [dollar, setDollar] = useState(Math.round(satoshi * btcRate))

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
    <VStack spacing={3}>
      <HStack w="full" justifyContent="space-between" flexWrap={'wrap'}>
        <H1 size="2xl" bold>
          {t('Make a donation')}
        </H1>
        <HStack justifyContent="start">
          <DonationInputIconButton
            onClick={() => handleDefaultAmountButtonClick(10)}
            leftIcon={<MedalIcon height="16px" width="16px" />}
          >
            $10
          </DonationInputIconButton>
          <DonationInputIconButton
            onClick={() => handleDefaultAmountButtonClick(50)}
            leftIcon={<TrophyIcon height="16px" width="16px" />}
          >
            $50
          </DonationInputIconButton>
          <DonationInputIconButton
            onClick={() => handleDefaultAmountButtonClick(100)}
            leftIcon={<CrownIcon height="16px" width="16px" />}
          >
            $100
          </DonationInputIconButton>
          <DonationInputIconButton
            onClick={() => handleDefaultAmountButtonClick(1000)}
            leftIcon={<StarIcon height="16px" width="16px" />}
          >
            $1000
          </DonationInputIconButton>
        </HStack>
      </HStack>

      <InputGroup>
        <InputLeftElement width="50px" height="100%" display="flex" justifyContent={'center'} alignItems={'center'}>
          {isSatoshi ? <SatSymbolIcon fontSize="24px" /> : <BiDollar fontSize="24px" />}
        </InputLeftElement>
        <Input
          ref={inputRef}
          data-testid="donation-input"
          borderRadius="12px"
          size="lg"
          fontWeight={500}
          value={satoshi > 0 ? (isSatoshi ? commaFormatted(satoshi) : commaFormatted(dollar)) : ''}
          type="text"
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          pl={10}
          _placeholder={{
            color: 'neutral1.11',
          }}
          color="neutral1.11"
          placeholder="0"
        />
        <InputRightElement
          w="fit-content"
          minWidth="100px"
          maxWidth="150px"
          height="100%"
          display="flex"
          alignItems={'center'}
          paddingRight={2}
        >
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

const DonationInputIconButton = (props: ButtonProps) => {
  return <Button size="sm" variant="outline" colorScheme="neutral1" {...props} />
}
