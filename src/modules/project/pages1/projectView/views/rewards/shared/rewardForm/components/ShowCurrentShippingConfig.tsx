import { Box, Button, Collapse, HStack, Icon, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { PiInfo, PiPencil } from 'react-icons/pi'

import { TooltipPopover } from '@/shared/components/feedback/TooltipPopover.tsx'
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

  return (
    <>
      <Collapse
        in={!selectedShippingConfig}
        transition={{ enter: { duration: 0.05 }, exit: { duration: 0 } }}
        unmountOnExit
        style={{
          width: '100%',
        }}
      >
        <HStack
          w="full"
          alignItems="flex-start"
          spacing={4}
          padding={5}
          borderRadius="8px"
          backgroundColor="neutral1.3"
        >
          <Icon as={PiInfo} fontSize="20px" />
          <VStack alignItems="flex-start" spacing={0}>
            <Body size="sm" medium>
              {t('No shipping fees added yet. This means the product price includes shipping costs.')}
            </Body>
          </VStack>
        </HStack>
      </Collapse>
      <Collapse
        in={Boolean(selectedShippingConfig)}
        transition={{ enter: { duration: 0.05 }, exit: { duration: 0 } }}
        unmountOnExit
        style={{
          width: '100%',
        }}
      >
        <VStack
          w="full"
          maxWidth="550px"
          alignItems="flex-start"
          spacing={4}
          padding={5}
          borderRadius="8px"
          backgroundColor="neutral1.3"
        >
          <VStack w="full" spacing={0}>
            <HStack w="full" justifyContent="space-between" spacing={0}>
              <Box flex={1.5}>
                <Body size="sm" medium>
                  {t('Fee model')}:
                </Body>
              </Box>
              <Box flex={isIncremental ? 2 : 1}>
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
            <HStack w="full" justifyContent="space-between" alignItems="flex-start" spacing={0}>
              <Box flex={1.5}>
                <Body size="sm" medium>
                  {t('Shipping availability')}:
                </Body>
              </Box>
              <Box flex={isIncremental ? 2 : 1}>
                <Body size="sm" light>
                  {selectedShippingConfig?.globalShipping ? t('Worldwide') : t('Specific countries listed below')}
                </Body>
              </Box>
            </HStack>
          </VStack>

          <VStack w="full" spacing={2} padding={0}>
            <HStack w="full" justifyContent="space-between" borderBottom="1px solid" borderColor="neutral1.6">
              <Box flex={1.5}>
                <Body size="sm" medium>
                  {t('Rates')}
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

            {selectedShippingConfig?.shippingRates?.map((rate) => (
              <HStack w="full" key={rate.country} justifyContent="space-between">
                <Box flex={1.5}>
                  <Body size="sm">{country.find((c) => c.code === rate.country)?.name || rate.country}</Body>
                </Box>

                <Box flex={1}>
                  <Body size="sm" light>
                    {rate.baseRate ? formatAmount(rate.baseRate, 'USDCENT') : t('Same as Default')}
                  </Body>
                </Box>

                {isIncremental && (
                  <Box flex={1}>
                    <Body size="sm" light>
                      {rate.incrementRate ? formatAmount(rate.incrementRate, 'USDCENT') : t('Same as Default')}
                    </Body>
                  </Box>
                )}
              </HStack>
            ))}
          </VStack>
          <Button
            variant="outline"
            colorScheme="neutral1"
            size="md"
            width="full"
            rightIcon={<PiPencil />}
            onClick={() => shippingFeeModal.onOpen({ isEdit: true })}
          >
            {t('Update shipping fee')}
          </Button>
        </VStack>
      </Collapse>
    </>
  )
}
