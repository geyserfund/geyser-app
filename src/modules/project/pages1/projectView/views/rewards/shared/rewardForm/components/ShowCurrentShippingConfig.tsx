import { Box, Button, Divider, HStack, Icon, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { PiInfo, PiPencil } from 'react-icons/pi'

import { TooltipPopover } from '@/shared/components/feedback/TooltipPopover.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { UseModalReturn } from '@/shared/hooks/useModal.tsx'
import { countriesAtom } from '@/shared/state/countriesAtom.ts'
import { useCurrencyFormatter } from '@/shared/utils/hooks/useCurrencyFormatter.ts'
import { ProjectShippingConfigType, ShippingConfigFragment } from '@/types/generated/graphql.ts'

import { ProjectShippingConfigTypeOptions } from '../../shippingConfigForm/constants.ts'

type ShowCurrentShippingConfigProps = {
  selectedShippingConfig?: ShippingConfigFragment | null
  shippingFeeModal: UseModalReturn<{ isEdit: boolean }>
}

export const ShowCurrentShippingConfig = ({
  selectedShippingConfig,
  shippingFeeModal,
}: ShowCurrentShippingConfigProps) => {
  const { formatAmount } = useCurrencyFormatter()

  const country = useAtomValue(countriesAtom)

  const isIncremental = selectedShippingConfig?.type === ProjectShippingConfigType.Incremental

  if (!selectedShippingConfig) {
    return null
  }

  return (
    <>
      <VStack w="full" maxWidth="420px" alignItems="flex-start" spacing={2} paddingLeft={5}>
        <VStack w="full" spacing={0}>
          <HStack w="full" justifyContent="space-between">
            <Box flex={1}>
              <Body size="md" bold>
                {t('Details')}
              </Body>
            </Box>
          </HStack>
          <HStack w="full" justifyContent="space-between">
            <Box flex={1}>
              <Body size="sm" medium>
                {t('Fee model')}:
              </Body>
            </Box>
            <Box flex={1}>
              <Body size="sm" light display={'inline-block'}>
                {
                  ProjectShippingConfigTypeOptions.find((option) => option.value === selectedShippingConfig?.type)
                    ?.label
                }
              </Body>{' '}
              <TooltipPopover
                content={
                  <VStack alignItems="flex-start">
                    {ProjectShippingConfigTypeOptions.find(
                      (option) => option.value === selectedShippingConfig?.type,
                    )?.info.map((info) => (
                      <Body size="sm" key={info}>
                        {info}
                      </Body>
                    ))}
                  </VStack>
                }
              >
                <Box display={'inline-block'}>
                  <Icon as={PiInfo} />
                </Box>
              </TooltipPopover>
            </Box>
          </HStack>
          <HStack w="full" justifyContent="space-between" alignItems="flex-start">
            <Box flex={1}>
              <Body size="sm" medium>
                {t('Shipping availability')}:
              </Body>
            </Box>
            <Box flex={1}>
              <Body size="sm" light>
                {selectedShippingConfig.globalShipping ? t('Worldwide') : t('Specific countries listed below')}
              </Body>
            </Box>
          </HStack>
        </VStack>

        <HStack w="full" justifyContent="space-between">
          <Box flex={1.5}>
            <Body size="md" bold>
              {t('Rates')}
            </Body>
          </Box>
        </HStack>

        <CardLayout w="full" padding={{ base: 2, lg: 3 }} spacing={2}>
          <HStack w="full" justifyContent="space-between">
            <Box flex={1.5}>
              <Body size="sm" medium>
                {t('Country')}
              </Body>
            </Box>
            <Box flex={1}>
              <Body size="sm" medium>
                {t('Base rate')}
              </Body>
            </Box>
            {isIncremental && (
              <Box flex={1}>
                <Body size="sm" medium>
                  {t('Increment rate')}
                </Body>
              </Box>
            )}
          </HStack>
          <Divider />

          {selectedShippingConfig?.shippingRates?.map((rate) => (
            <HStack w="full" key={rate.country} justifyContent="space-between">
              <Box flex={1.5}>
                <Body size="sm">{country.find((c) => c.code === rate.country)?.name || rate.country}</Body>
              </Box>

              <Box flex={1}>
                <Body size="sm">{rate.baseRate ? formatAmount(rate.baseRate, 'USDCENT') : t('Same as Default')}</Body>
              </Box>

              {isIncremental && (
                <Box flex={1}>
                  <Body size="sm">
                    {rate.incrementRate ? formatAmount(rate.incrementRate, 'USDCENT') : t('Same as Default')}
                  </Body>
                </Box>
              )}
            </HStack>
          ))}
        </CardLayout>
      </VStack>
      <Button
        variant="outline"
        colorScheme="neutral1"
        size="lg"
        width="full"
        rightIcon={<PiPencil />}
        onClick={() => shippingFeeModal.onOpen({ isEdit: true })}
      >
        {t('Update shipping fee')}
      </Button>
    </>
  )
}
