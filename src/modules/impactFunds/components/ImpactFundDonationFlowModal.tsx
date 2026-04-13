import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  VStack,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'

import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { AmountInput } from '@/shared/components/form/AmountInput.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { IMPACT_FUND_DONATION_AMOUNT_SEARCH_PARAM } from '@/shared/constants/impactFundDonationFlow.ts'
import { type ImpactFundsQuery } from '@/types'

type ImpactFundDonationFlowModalProps = {
  impactFunds: ImpactFundsQuery['impactFunds']
  isOpen: boolean
  onClose: () => void
}

const PRESET_AMOUNTS = [20, 50, 100, 250, 500] as const

/** Guides users from selecting an impact fund to entering a monthly donation before entering checkout. */
export const ImpactFundDonationFlowModal = ({
  impactFunds,
  isOpen,
  onClose,
}: ImpactFundDonationFlowModalProps): JSX.Element => {
  const navigate = useNavigate()
  const { getSatoshisFromUSDCents, getUSDCentsAmount } = useBTCConverter()
  const isMobileAmountLayout = useBreakpointValue({ base: true, md: false }) ?? false
  const [selectedFundId, setSelectedFundId] = useState<string | null>(null)
  const [isSatoshi, setIsSatoshi] = useState(false)
  const [monthlyAmountSats, setMonthlyAmountSats] = useState(0)
  const [monthlyAmountUsdCent, setMonthlyAmountUsdCent] = useState(0)
  const cardBg = useColorModeValue('white', 'neutral1.3')
  const imageBg = useColorModeValue('neutral1.2', 'neutral1.2')
  const mutedTextColor = useColorModeValue('neutral1.8', 'neutral1.10')
  const selectedBorderColor = useColorModeValue('primary1.700', 'primary1.300')
  const unselectedBorderColor = useColorModeValue('neutral1.4', 'neutral1.5')
  const selectedSurfaceBg = useColorModeValue('primary1.50', 'primary1.900')
  const unavailableBg = useColorModeValue('neutral1.2', 'neutral1.2')
  const selectedShadow = useColorModeValue(
    '0 0 0 3px var(--chakra-colors-primary1-200)',
    '0 0 0 3px var(--chakra-colors-primary1-700)',
  )

  const selectedFund = useMemo(
    () => impactFunds.find((fund) => fund.id.toString() === selectedFundId) ?? null,
    [impactFunds, selectedFundId],
  )
  const visiblePresetAmounts = useMemo(
    () => (isMobileAmountLayout ? PRESET_AMOUNTS.slice(0, 3) : PRESET_AMOUNTS),
    [isMobileAmountLayout],
  )
  const monthlyAmountUsd = monthlyAmountUsdCent / 100
  const hasValidAmount = monthlyAmountUsdCent > 0

  const setDollarAmount = (value: number) => {
    const nextUsdCentAmount = Math.max(Math.round(value * 100), 0)
    setMonthlyAmountUsdCent(nextUsdCentAmount)
    setMonthlyAmountSats(
      Number(getSatoshisFromUSDCents(nextUsdCentAmount as Parameters<typeof getSatoshisFromUSDCents>[0])),
    )
  }

  const setSatoshiAmount = (value: number) => {
    const nextSatsAmount = Math.max(Math.round(value), 0)
    setMonthlyAmountSats(nextSatsAmount)
    setMonthlyAmountUsdCent(Math.max(Math.round(Number(getUSDCentsAmount(nextSatsAmount))), 0))
  }

  const resetState = () => {
    setSelectedFundId(null)
    setIsSatoshi(false)
    setMonthlyAmountSats(0)
    setMonthlyAmountUsdCent(0)
  }

  useEffect(() => {
    if (!isOpen) {
      resetState()
    }
  }, [isOpen])

  const handleClose = () => {
    resetState()
    onClose()
  }

  const handleContinueToCheckout = () => {
    if (!selectedFund?.donateProject?.name || !hasValidAmount) {
      return
    }

    const searchParams = new URLSearchParams({
      mode: 'recurring',
      [IMPACT_FUND_DONATION_AMOUNT_SEARCH_PARAM]: String(monthlyAmountUsdCent),
    })

    navigate({
      pathname: getPath('fundingDetails', selectedFund.donateProject.name),
      search: `?${searchParams.toString()}`,
    })

    handleClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="4xl"
      title={t('Donate to an Impact Fund')}
      contentProps={{ maxW: { base: 'calc(100vw - 1.5rem)', lg: '820px' } }}
      bodyProps={{ gap: 6, alignItems: 'stretch' }}
    >
      <CardLayout w="full" spacing={4} alignItems="stretch">
        <Body bold>{t('Enter monthly donation amount')}</Body>

        <HStack w="full" spacing={{ base: 2, md: 3 }} flexWrap="nowrap">
          {visiblePresetAmounts.map((amount) => (
            <Button
              key={amount}
              size={{ base: 'sm', md: 'md' }}
              variant="outline"
              colorScheme="neutral1"
              onClick={() => setDollarAmount(amount)}
              minW={0}
              flex={1}
              px={{ base: 2, md: 4 }}
              h={{ base: '52px', md: '56px' }}
            >
              {`$${amount}`}
            </Button>
          ))}
        </HStack>

        <AmountInput
          size={isMobileAmountLayout ? 'md' : 'lg'}
          satoshi={monthlyAmountSats}
          dollar={monthlyAmountUsd}
          isSatoshi={isSatoshi}
          suffix={t('/ month')}
          onToggle={() => setIsSatoshi((currentValue) => !currentValue)}
          handleInput={(event) => {
            const normalizedValue = event.target.value.replaceAll(',', '')
            const parsedValue = Number(normalizedValue)

            if (!parsedValue) {
              setDollarAmount(0)
              setSatoshiAmount(0)
              return
            }

            if (isSatoshi) {
              setSatoshiAmount(parsedValue)
              return
            }

            setDollarAmount(parsedValue)
          }}
          handleKeyDown={(event) => {
            if (event.key === 'Enter') {
              ;(event.target as HTMLInputElement).blur()
            }
          }}
        />
      </CardLayout>

      <VStack align="stretch" spacing={3}>
        <Body bold>{t('Select Impact Fund')}</Body>

        <VStack align="stretch" spacing={3}>
        {impactFunds.map((fund) => {
          const isSelected = fund.id.toString() === selectedFundId
          const isUnavailable = !fund.donateProject?.name

          return (
            <Box
              key={fund.id}
              as="button"
              type="button"
              onClick={() => {
                if (!isUnavailable) {
                  setSelectedFundId(fund.id.toString())
                }
              }}
              textAlign="left"
              borderRadius="12px"
              borderWidth={isSelected ? '3px' : '1px'}
              borderColor={isSelected ? selectedBorderColor : unselectedBorderColor}
              bg={isSelected ? selectedSurfaceBg : isUnavailable ? unavailableBg : cardBg}
              boxShadow={isSelected ? selectedShadow : 'none'}
              overflow="hidden"
              transition="all 0.2s"
              w="full"
              _hover={{
                transform: isUnavailable ? undefined : 'translateY(-2px)',
                borderColor: isUnavailable ? unselectedBorderColor : selectedBorderColor,
              }}
              _disabled={{ cursor: 'not-allowed', opacity: 0.7 }}
              disabled={isUnavailable}
            >
              <Flex align="stretch" minH={{ base: '88px', lg: '96px' }}>
                <Box
                  w={{ base: '128px', lg: '148px' }}
                  minW={{ base: '128px', lg: '148px' }}
                  bg={imageBg}
                  overflow="hidden"
                >
                  {fund.heroImage ? (
                    <Image src={fund.heroImage} alt={fund.title} w="full" h="full" objectFit="cover" />
                  ) : null}
                </Box>
                <VStack align="stretch" spacing={1.5} p={4} justify="center" flex={1}>
                  <H2 size="md" bold lineHeight={1.2}>
                    {fund.title}
                  </H2>
                  {isUnavailable ? (
                    <Body size="xs" color={mutedTextColor}>
                      {t('Donation setup unavailable')}
                    </Body>
                  ) : null}
                </VStack>
              </Flex>
            </Box>
          )
        })}
        </VStack>
      </VStack>

      <Flex justify="flex-end">
        <Button
          size="lg"
          colorScheme="primary1"
          onClick={handleContinueToCheckout}
          isDisabled={!selectedFund?.donateProject?.name || !hasValidAmount}
        >
          {t('Continue to Payment')}
        </Button>
      </Flex>
    </Modal>
  )
}
