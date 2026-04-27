import { Box, Button, HStack, Icon, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue, useSetAtom } from 'jotai'
import { KeyboardEvent, useRef } from 'react'
import { PiHeartFill } from 'react-icons/pi'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { isRecurringContributionRenewalAtom } from '@/modules/project/funding/state/recurringContributionRenewalAtom.ts'
import { recurringFundingModes, recurringIntervals } from '@/modules/project/recurring/graphql'
import { SelectablePillButton } from '@/shared/components/buttons/SelectablePillButton.tsx'
import { AmountInput } from '@/shared/components/form/AmountInput.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body, H1 } from '@/shared/components/typography'
import { darkModeColors, lightModeColors } from '@/shared/styles/colors.ts'
import { ProjectFundingStrategy } from '@/types/index.ts'

import { commaFormatted } from '../../../../../../../utils'
import {
  hasFiatPaymentMethodAtom,
  hasStripePaymentMethodAtom,
  intendedPaymentMethodAtom,
  PaymentMethods,
} from '../../fundingPayment/state/paymentMethodAtom.ts'
import { FundingMatchingBanner } from '../components/FundingMatchingBanner.tsx'

export const MIN_WIDTH_AFTER_START = 60
const ONE_TIME_PRESET_AMOUNTS = [100, 210, 500, 750, 1000] as const
const RECURRING_PRESET_AMOUNTS = [21, 50, 100, 250, 500] as const
export const DonationInput = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    canUseRecurringFunding,
    project,
    formState: { donationAmount, donationAmountUsdCent, fundingMode },
    setState,
  } = useFundingFormAtom()

  const intendedPaymentMethod = useAtomValue(intendedPaymentMethodAtom)
  const isRecurringRenewal = useAtomValue(isRecurringContributionRenewalAtom)
  const hasFiatPaymentMethod = useAtomValue(hasFiatPaymentMethodAtom)
  const hasStripePaymentMethod = useAtomValue(hasStripePaymentMethodAtom)
  const setIntendedPaymentMethod = useSetAtom(intendedPaymentMethodAtom)

  const satoshi = donationAmount
  const setSatoshi = (val: number) => {
    setState('donationAmount', val)
  }

  const dollar = donationAmountUsdCent ? donationAmountUsdCent / 100 : 0
  const setDollar = (val: number) => {
    setState('donationAmountUsdCent', val * 100)
  }

  const isRecurringMode = fundingMode === recurringFundingModes.recurringDonation
  const presetAmounts = isRecurringMode ? RECURRING_PRESET_AMOUNTS : ONE_TIME_PRESET_AMOUNTS
  const highlightedPresetIndex = isRecurringMode ? 0 : 1
  const highlightedPresetAmount = presetAmounts[highlightedPresetIndex] ?? 0
  const finalPresetAmount = presetAmounts[presetAmounts.length - 1] ?? 0
  const prefersUsd = intendedPaymentMethod === PaymentMethods.fiatSwap || !intendedPaymentMethod
  const { isOpen: isSatoshi, onToggle } = useDisclosure({ defaultIsOpen: !prefersUsd && isRecurringMode })
  const isDollar = !isSatoshi
  const selectedBorderColor = useColorModeValue(lightModeColors.primary1[6], darkModeColors.primary1[8])
  const selectedInnerGradient = useColorModeValue(
    'linear(to-br, rgba(233, 255, 251, 0.98), rgba(183, 255, 242, 0.58))',
    `linear(to-br, ${darkModeColors.primary1[4]}, ${darkModeColors.primary1[3]})`,
  )
  const selectedHoverGradient = useColorModeValue(
    'linear(to-br, rgba(233, 255, 251, 0.98), rgba(183, 255, 242, 0.7))',
    `linear(to-br, ${darkModeColors.primary1[5]}, ${darkModeColors.primary1[4]})`,
  )
  const unselectedBorderColor = useColorModeValue(lightModeColors.neutral1[4], darkModeColors.neutral1[4])
  const unselectedInnerGradient = useColorModeValue(
    `linear(to-br, #FFFFFF, ${lightModeColors.neutral1[1]})`,
    `linear(to-br, ${darkModeColors.neutral1[2]}, ${darkModeColors.neutral1[1]})`,
  )
  const unselectedHoverGradient = useColorModeValue(
    `linear(to-br, #FFFFFF, ${lightModeColors.neutral1[2]})`,
    `linear(to-br, ${darkModeColors.neutral1[3]}, ${darkModeColors.neutral1[2]})`,
  )
  const unselectedActiveGradient = useColorModeValue(
    `linear(to-br, ${lightModeColors.neutral1[2]}, ${lightModeColors.neutral1[3]})`,
    `linear(to-br, ${darkModeColors.neutral1[4]}, ${darkModeColors.neutral1[3]})`,
  )
  const selectedTextColor = useColorModeValue('primary1.11', 'primary1.12')
  const unselectedTextColor = useColorModeValue('neutral1.11', 'neutral1.12')
  const satoshiBadgeBg = useColorModeValue(lightModeColors.primary1[4], darkModeColors.primary1[7])
  const satoshiBadgeColor = useColorModeValue('primary1.12', 'neutral1.12')
  const donationTitle =
    project.fundingStrategy === ProjectFundingStrategy.AllOrNothing ? t('Make a pledge') : t('Make a donation')
  const recurringHelperCopy = !hasFiatPaymentMethod
    ? t('Bitcoin recurring payments are manual. We will email you when the next payment is due.')
    : intendedPaymentMethod === PaymentMethods.fiatSwap
    ? hasStripePaymentMethod
      ? t('Card payments are billed automatically in USD each cycle.')
      : t('Card or bank transfer recurring payments are fixed in USD. We will email you when the next payment is due.')
    : intendedPaymentMethod
    ? t('Bitcoin recurring payments are manual. We will email you when the next payment is due.')
    : hasStripePaymentMethod
    ? t('Set up automatic monthly payments by credit card, or pay with Bitcoin and receive monthly reminders.')
    : null

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
    } else {
      setSatoshi(val)
    }
  }

  const handleDefaultAmountButtonClick = (val: number) => {
    setDollar(val)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      inputRef.current?.blur()
    }
  }

  const segmentedButtonPressStyles = {
    transition: 'transform 0.1s cubic-bezier(0.2, 0, 0, 1), background-image 0.2s',
    '&:active:not(:disabled)': { transform: 'scale(0.985)' },
  }

  return (
    <CardLayout w="full" spacing={4} alignItems="stretch">
      <H1 size="xl" bold alignSelf="start" sx={{ textWrap: 'balance' }}>
        {donationTitle}
      </H1>

      {canUseRecurringFunding && (
        <VStack alignItems="stretch" spacing={2}>
          <HStack spacing={3} alignItems="stretch">
            <Box
              flex={1}
              p="1px"
              borderRadius="innerCard"
              bg={!isRecurringMode ? selectedBorderColor : unselectedBorderColor}
            >
              <Button
                w="full"
                h="calc(3.5rem - 2px)"
                fontSize="lg"
                fontWeight="700"
                borderRadius="5px"
                variant="ghost"
                bgGradient={!isRecurringMode ? selectedInnerGradient : unselectedInnerGradient}
                color={!isRecurringMode ? selectedTextColor : unselectedTextColor}
                boxShadow={!isRecurringMode ? 'sm' : 'none'}
                _hover={{
                  bgGradient: !isRecurringMode ? selectedHoverGradient : unselectedHoverGradient,
                }}
                _active={{
                  bgGradient: !isRecurringMode ? selectedHoverGradient : unselectedActiveGradient,
                }}
                isDisabled={isRecurringRenewal}
                onClick={() => {
                  setState('fundingMode', recurringFundingModes.oneTime)
                  setIntendedPaymentMethod(undefined)
                }}
                sx={segmentedButtonPressStyles}
              >
                {t('Give once')}
              </Button>
            </Box>

            <Box
              flex={1}
              p="1px"
              borderRadius="innerCard"
              bg={isRecurringMode ? selectedBorderColor : unselectedBorderColor}
            >
              <Button
                w="full"
                h="calc(3.5rem - 2px)"
                fontSize="lg"
                fontWeight="700"
                borderRadius="5px"
                variant="ghost"
                leftIcon={<Icon as={PiHeartFill} color="primary1.9" boxSize={4} />}
                bgGradient={isRecurringMode ? selectedInnerGradient : unselectedInnerGradient}
                color={isRecurringMode ? selectedTextColor : unselectedTextColor}
                boxShadow={isRecurringMode ? 'sm' : 'none'}
                _hover={{
                  bgGradient: isRecurringMode ? selectedHoverGradient : unselectedHoverGradient,
                }}
                _active={{
                  bgGradient: isRecurringMode ? selectedHoverGradient : unselectedActiveGradient,
                }}
                isDisabled={isRecurringRenewal}
                onClick={() => {
                  setState('fundingMode', recurringFundingModes.recurringDonation)
                  setState('recurringInterval', recurringIntervals.monthly)
                  setIntendedPaymentMethod(undefined)
                }}
                sx={segmentedButtonPressStyles}
              >
                {t('Make it monthly')}
              </Button>
            </Box>
          </HStack>
        </VStack>
      )}

      <HStack w="full" justifyContent="space-between" flexWrap="wrap" spacing={2} alignItems="flex-start">
        {presetAmounts.slice(0, 4).map((amount, index) => {
          const isHighlighted = highlightedPresetIndex === index
          const displayedAmount = isHighlighted ? highlightedPresetAmount : amount
          const hiddenOnMobile = index >= 3
          const responsiveDisplay = hiddenOnMobile ? { base: 'none', md: 'flex' } : 'flex'
          const presetButton = (
            <SelectablePillButton
              isSelected={dollar === displayedAmount && dollar > 0}
              isDisabled={isRecurringRenewal}
              onClick={() => handleDefaultAmountButtonClick(displayedAmount)}
              flexGrow={1}
              minWidth="80px"
              w={isHighlighted ? 'full' : undefined}
              zIndex={isHighlighted ? 1 : undefined}
            >
              {`$${commaFormatted(displayedAmount)}`}
            </SelectablePillButton>
          )

          if (!isHighlighted) {
            return (
              <Box key={amount} flexGrow={1} minWidth="80px" display={responsiveDisplay}>
                {presetButton}
              </Box>
            )
          }

          return (
            <VStack
              key={amount}
              spacing={0}
              flexGrow={1}
              minWidth="80px"
              position="relative"
              alignItems="stretch"
              display={responsiveDisplay}
            >
              {presetButton}
              <Body
                fontSize="8px"
                bg={satoshiBadgeBg}
                color={satoshiBadgeColor}
                fontWeight="bold"
                px={2}
                py={0.2}
                borderRadius="base"
                position="absolute"
                bottom="-8px"
                left="50%"
                transform="translateX(-50%)"
                zIndex={2}
                whiteSpace="nowrap"
                letterSpacing="0.04em"
              >
                {t('SATOSHI AMOUNT')}
              </Body>
            </VStack>
          )
        })}

        <SelectablePillButton
          isSelected={dollar === finalPresetAmount && dollar > 0}
          isDisabled={isRecurringRenewal}
          onClick={() => handleDefaultAmountButtonClick(finalPresetAmount)}
          flexGrow={1}
          minWidth="80px"
          display={{ base: 'none', md: 'inline-flex' }}
        >
          {`$${commaFormatted(finalPresetAmount)}`}
        </SelectablePillButton>
      </HStack>
      <AmountInput
        data-testid="donation-input-amount"
        inputRef={inputRef}
        satoshi={satoshi}
        dollar={dollar}
        isSatoshi={isSatoshi}
        handleInput={handleInput}
        handleKeyDown={handleKeyDown}
        onToggle={onToggle}
        size="lg"
        isDisabled={isRecurringRenewal}
      />

      <FundingMatchingBanner isSatoshi={isSatoshi} size="lg" />

      {isRecurringMode && recurringHelperCopy && (
        <VStack alignItems="start" spacing={2}>
          <Body size="sm" light>
            {recurringHelperCopy}
          </Body>
        </VStack>
      )}

      {/* <HStack w="full" position="relative">
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
            <Button
              data-testid="toggle-donation-input"
              w="100%"
              variant="soft"
              colorScheme="neutral1"
              onClick={onToggle}
            >
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
      </HStack> */}
    </CardLayout>
  )
}
