import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'

import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { type ImpactFundsQuery } from '@/types'

type ImpactFundDonationFlowModalProps = {
  impactFunds: ImpactFundsQuery['impactFunds']
  isOpen: boolean
  onClose: () => void
}

/** Guides users from selecting an impact fund to entering a monthly donation before entering checkout. */
export const ImpactFundDonationFlowModal = ({
  impactFunds,
  isOpen,
  onClose,
}: ImpactFundDonationFlowModalProps): JSX.Element => {
  const navigate = useNavigate()
  const [selectedFundId, setSelectedFundId] = useState<string | null>(null)
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

  const resetState = () => {
    setSelectedFundId(null)
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
    if (!selectedFund?.donateProject?.name) {
      return
    }

    navigate({
      pathname: getPath('projectFunding', selectedFund.donateProject.name),
      search: '?mode=recurring',
    })

    handleClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="4xl"
      title={t('Select an Impact Fund to donate to')}
      contentProps={{ maxW: { base: 'calc(100vw - 1.5rem)', xl: '1320px' } }}
      bodyProps={{ gap: 6, alignItems: 'stretch' }}
    >
      <VStack align="stretch" spacing={3}>
        <HStack align="stretch" spacing={3} overflowX={{ base: 'auto', xl: 'visible' }} pb={1}>
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
                minW={{ base: '190px', xl: '0' }}
                maxW={{ base: '190px', xl: 'none' }}
                w={{ base: '190px', xl: 'calc((100% - 3rem) / 5)' }}
                flexShrink={0}
                _hover={{
                  transform: isUnavailable ? undefined : 'translateY(-2px)',
                  borderColor: isUnavailable ? unselectedBorderColor : selectedBorderColor,
                }}
                _disabled={{ cursor: 'not-allowed', opacity: 0.7 }}
                disabled={isUnavailable}
              >
                <Flex direction="column" align="stretch" minH={{ base: '180px', lg: '210px' }}>
                  <Box h={{ base: '120px', lg: '150px' }} bg={imageBg} overflow="hidden">
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
        </HStack>
      </VStack>

      <Flex justify="flex-end">
        <Button
          size="lg"
          colorScheme="primary1"
          onClick={handleContinueToCheckout}
          isDisabled={!selectedFund?.donateProject?.name}
        >
          {t('Continue to Payment')}
        </Button>
      </Flex>
    </Modal>
  )
}
