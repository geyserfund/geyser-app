import { Box, Button, SimpleGrid, Tooltip, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Body } from '@/shared/components/typography/Body.tsx'

import { PayoutMethod } from '../types.ts'

const SWAP_UNAVAILABLE_TOOLTIP = t(
  'Our swap service provider has paused operations for the time being. Bitcoin and Lightning payouts are unavailable until the service is restored.',
)

const methodButtonProps = {
  w: 'full' as const,
  borderWidth: '1px',
  p: 4,
  height: 'auto',
  justifyContent: 'center' as const,
  flexDirection: 'column' as const,
}

export const PayoutMethodSelection = ({
  selectedMethod,
  setSelectedMethod,
  disableLightning,
  disableOnChain,
  showRootstock = true,
}: {
  selectedMethod: PayoutMethod
  setSelectedMethod: (method: PayoutMethod) => void
  disableLightning?: boolean
  disableOnChain?: boolean
  showRootstock?: boolean
}) => {
  const columnCount = showRootstock ? 3 : 2

  return (
    <VStack w="full" spacing={4} alignItems="stretch">
      <SimpleGrid w="full" columns={{ base: 1, sm: columnCount }} spacing={4}>
        <Tooltip
          label={SWAP_UNAVAILABLE_TOOLTIP}
          isDisabled={!disableLightning}
          hasArrow
          placement="top"
          openDelay={200}
        >
          <Box w="full">
            <Button
              {...methodButtonProps}
              variant={selectedMethod === PayoutMethod.Lightning ? 'solid' : 'outline'}
              colorScheme={selectedMethod === PayoutMethod.Lightning ? 'primary1' : 'neutral1'}
              onClick={() => setSelectedMethod(PayoutMethod.Lightning)}
              borderColor={disableLightning ? 'neutral1.4' : 'primary1.6'}
              isDisabled={disableLightning}
              opacity={disableLightning ? 0.5 : 1}
              pointerEvents={disableLightning ? 'none' : undefined}
            >
              <Body size="md" bold>
                ⚡ {t('Bitcoin Lightning')}
              </Body>
              <Body size="sm" light>
                {disableLightning ? t('Not available') : t('Instant')}
              </Body>
            </Button>
          </Box>
        </Tooltip>

        <Tooltip
          label={SWAP_UNAVAILABLE_TOOLTIP}
          isDisabled={!disableOnChain}
          hasArrow
          placement="top"
          openDelay={200}
        >
          <Box w="full">
            <Button
              {...methodButtonProps}
              variant={selectedMethod === PayoutMethod.OnChain ? 'solid' : 'outline'}
              colorScheme={selectedMethod === PayoutMethod.OnChain ? 'primary1' : 'neutral1'}
              onClick={() => setSelectedMethod(PayoutMethod.OnChain)}
              borderColor={disableOnChain ? 'neutral1.4' : 'neutral1.6'}
              isDisabled={disableOnChain}
              opacity={disableOnChain ? 0.5 : 1}
              pointerEvents={disableOnChain ? 'none' : undefined}
            >
              <Body size="md" bold>
                🔗 {t('Bitcoin On-Chain')}
              </Body>
              <Body size="sm" light>
                {disableOnChain ? t('Not available') : t('~ 1 hour')}
              </Body>
            </Button>
          </Box>
        </Tooltip>

        {showRootstock && (
          <Button
            {...methodButtonProps}
            variant={selectedMethod === PayoutMethod.Rootstock ? 'solid' : 'outline'}
            colorScheme={selectedMethod === PayoutMethod.Rootstock ? 'primary1' : 'neutral1'}
            onClick={() => setSelectedMethod(PayoutMethod.Rootstock)}
            borderColor="primary1.6"
          >
            <Body size="md" bold>
              {t('Rootstock')}
            </Body>
            <Body size="sm">{t('~ minutes')}</Body>
          </Button>
        )}
      </SimpleGrid>
    </VStack>
  )
}
