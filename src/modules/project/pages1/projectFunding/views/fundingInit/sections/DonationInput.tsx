import { Button, HStack, Input, InputGroup, InputRightElement, useDisclosure, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { KeyboardEvent, useEffect, useRef, useState } from 'react'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { Body, H1 } from '@/shared/components/typography'

import { useBtcContext } from '../../../../../../../context/btc'
import { commaFormatted } from '../../../../../../../utils'

const MIN_WIDTH_AFTER_START = 50

export const DonationInput = () => {
  const { btcRate } = useBtcContext()

  const inputRef = useRef<HTMLInputElement>(null)

  const {
    formState: { donationAmount, donationAmountUsdCent },
    setState,
  } = useFundingFormAtom()

  const satoshi = donationAmount
  const setSatoshi = (val: number) => {
    setState('donationAmount', val)
  }

  const dollar = donationAmountUsdCent ? donationAmountUsdCent / 100 : 0
  const setDollar = (val: number) => {
    setState('donationAmountUsdCent', val * 100)
  }

  const { isOpen: isSatoshi, onToggle } = useDisclosure({ defaultIsOpen: true })
  const isDollar = !isSatoshi

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

  const [satsPosition, setSatsPosition] = useState(MIN_WIDTH_AFTER_START)

  useEffect(() => {
    if (satoshi) {
      const currentText = commaFormatted(satoshi)
      const commaCount = (currentText.match(/,/g) || []).length
      const restCount = currentText.length - commaCount
      const textWidth = restCount * 9 + commaCount * 5

      setSatsPosition(textWidth + MIN_WIDTH_AFTER_START)
    } else {
      setSatsPosition(MIN_WIDTH_AFTER_START)
    }
  }, [satoshi])

  return (
    <VStack spacing={4} alignItems="stretch">
      <H1 size="2xl" bold alignSelf="start">
        {t('Make a donation')}
      </H1>

      <HStack w="full" justifyContent="space-between" flexWrap="wrap" spacing={2} alignItems="flex-start">
        {[50, 100].map((amount) => (
          <Button
            key={amount}
            size="md"
            variant="outline"
            colorScheme="neutral1"
            onClick={() => handleDefaultAmountButtonClick(amount)}
            flexGrow={1}
            minWidth="80px"
          >
            {`$${commaFormatted(amount)}`}
          </Button>
        ))}

        <VStack spacing={0} flexGrow={1} minWidth="80px" position="relative" alignItems="stretch">
          <Button
            key={210}
            size="md"
            variant="outline"
            colorScheme="neutral1"
            onClick={() => handleDefaultAmountButtonClick(210)}
            w="full"
            zIndex={1}
          >
            {`$${commaFormatted(210)}`}
          </Button>
          <Body
            fontSize="8px"
            bg="amber.6"
            color="black"
            fontWeight="bold"
            px={2}
            py={0.2}
            borderRadius="md"
            position="absolute"
            bottom="-8px"
            left="50%"
            transform="translateX(-50%)"
            zIndex={2}
            whiteSpace="nowrap"
          >
            {t('SATOSHI AMOUNT')}
          </Body>
        </VStack>

        {[500].map((amount) => (
          <Button
            key={amount}
            size="md"
            variant="outline"
            colorScheme="neutral1"
            onClick={() => handleDefaultAmountButtonClick(amount)}
            flexGrow={1}
            minWidth="80px"
          >
            {`$${commaFormatted(amount)}`}
          </Button>
        ))}

        <Button
          key={1000}
          size="md"
          variant="outline"
          colorScheme="neutral1"
          onClick={() => handleDefaultAmountButtonClick(1000)}
          flexGrow={1}
          minWidth="80px"
          display={{ base: 'none', md: 'inline-flex' }}
        >
          {`$${commaFormatted(1000)}`}
        </Button>
      </HStack>

      <HStack w="full" position="relative">
        <InputGroup>
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
            pl={7}
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
                  <Body isTruncated>{dollar > 0 ? `$${commaFormatted(dollar)}` : satoshi > 0 ? '< $1' : '$0'}</Body>
                </>
              ) : (
                <>
                  <Body isTruncated>{commaFormatted(satoshi) || 0}</Body>
                  <Body pl={0.5}>{'sats'}</Body>
                </>
              )}
            </Button>
          </InputRightElement>
        </InputGroup>

        <Body
          size="xl"
          position="absolute"
          top="49%"
          left={isSatoshi ? `${satsPosition}px` : '14px'}
          transform="translateY(-50%)"
          pointerEvents="none"
          transition="left 0.05s"
          muted
        >
          {isSatoshi ? 'sats' : '$'}
        </Body>
      </HStack>
    </VStack>
  )
}
