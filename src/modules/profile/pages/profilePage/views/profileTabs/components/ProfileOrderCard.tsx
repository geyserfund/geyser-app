import { Box, HStack, Tooltip, VStack } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useTranslation } from 'react-i18next'

import { Body1, Body2, Caption } from '../../../../../../../components/typography'
import { ImageWithReload } from '../../../../../../../components/ui'
import { RewardStatusLabel } from '../../../../../../../shared/constants'
import { getRewardShippingStatusBackgroundColor } from '../../../../../../../helpers/getProjectShippingStatusBackgroundColor'
import { CardLayout } from '../../../../../../../shared/components/layouts'
import { OrdersGetStatus, ProfileOrderFragment, ProjectAvatarFragment } from '../../../../../../../types'
import { commaFormatted, toSmallImageUrl, useCustomTheme } from '../../../../../../../utils'
import { getUSD } from '../../../../../../project/pages/projectView/views/projectCreatorViews/sections/contributors/components'

export const ProfileOrderCard = ({ order }: { order: ProfileOrderFragment }) => {
  const { t } = useTranslation()
  const { colors } = useCustomTheme()

  const { items } = order

  const { backgroundColor } = getRewardShippingStatusBackgroundColor(order.status as OrdersGetStatus, colors)

  const project = order.fundingTx.sourceResource as ProjectAvatarFragment

  const bitcoinPrice = order.fundingTx.bitcoinQuote?.quote || 0
  const usdPrice = getUSD(order.totalInSats, bitcoinPrice)

  return (
    <CardLayout w="full" p={0} overflow="visible" borderColor="neutral.100" spacing="0">
      <VStack w="full" p="10px" spacing="0px" backgroundColor="neutral.100">
        <HStack w="full" justifyContent={'space-between'} alignItems={'start'}>
          <VStack w="full" alignItems="start" spacing="0">
            {order.confirmedAt && (
              <KeyValueDisplay
                label={t('Order placed')}
                value={DateTime.fromMillis(order.confirmedAt).toFormat('LLL dd, yyyy')}
              />
            )}
            <KeyValueDisplay
              label={t('Total')}
              value={`${bitcoinPrice ? usdPrice : ''} ( ${commaFormatted(order.totalInSats)} sats )`}
            />
          </VStack>
          <Tooltip label={t('Shipping status')}>
            <HStack
              bgColor={backgroundColor}
              maxWidth="100px"
              width="100%"
              border="1px solid"
              borderRadius="8px"
              borderColor="neutral.900"
              justifyContent="center"
              justifySelf={'flex-end'}
              py="4px"
            >
              <Body2 color={'neutral.900'}>{RewardStatusLabel[order.status as OrdersGetStatus]}</Body2>
            </HStack>
          </Tooltip>
        </HStack>
        <VStack w="full" alignItems={'start'} spacing="0">
          <KeyValueDisplay label={t('Project')} value={project.title} />
          <KeyValueDisplay label={t('Order number')} value={order.referenceCode} />
        </VStack>
      </VStack>
      {items.map((item, index) => {
        return (
          <HStack
            key={`order-item-${index}`}
            p="10px"
            borderTop="2px solid"
            borderColor="neutral.100"
            alignItems={'start'}
          >
            <Box height="60px" width="80px">
              <ImageWithReload
                w="100%"
                h="100%"
                objectFit="cover"
                src={toSmallImageUrl(item.item.image || '')}
                alt={`${item.item.name}-header-image`}
                borderRadius="8px"
              />
            </Box>
            <VStack flex="1" alignItems="start" spacing="5px">
              <Body1 semiBold color="neutral.900">
                {item.item.name}
              </Body1>

              <Body2 color="neutral.600">{item.item.description}</Body2>
              <HStack flexWrap={'wrap'} spacing="10px">
                <KeyValueDisplay label={t('Quantity')} value={`${item.quantity}x`} />
                <KeyValueDisplay label={t('Unit price')} value={`${commaFormatted(item.unitPriceInSats)} sats`} />
                {item.item.category && (
                  <Caption px="10px" py="3px" bgColor="neutral.100">
                    {item.item.category}
                  </Caption>
                )}
              </HStack>
            </VStack>
          </HStack>
        )
      })}
    </CardLayout>
  )
}

export const KeyValueDisplay = ({ label, value }: { label: string; value: string }) => {
  return (
    <HStack flexWrap={'wrap'} spacing="5px">
      <Body2 color="neutral.600" whiteSpace={'nowrap'}>
        {label}:
      </Body2>
      <Body2 semiBold color="neutral.900" whiteSpace={'nowrap'}>
        {value}
      </Body2>
    </HStack>
  )
}
