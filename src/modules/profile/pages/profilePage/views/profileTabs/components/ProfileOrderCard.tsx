import { Badge, Box, HStack, Tooltip, VStack } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useTranslation } from 'react-i18next'

import { getUSD } from '@/modules/project/pages1/projectDashboard/common'
import { Body } from '@/shared/components/typography'

import { ImageWithReload } from '../../../../../../../components/ui'
import { getRewardShippingStatusBackgroundColor } from '../../../../../../../helpers/getProjectShippingStatusBackgroundColor'
import { CardLayout } from '../../../../../../../shared/components/layouts'
import { RewardStatusLabel } from '../../../../../../../shared/constants'
import { OrdersGetStatus, ProfileOrderFragment, ProjectAvatarFragment } from '../../../../../../../types'
import { commaFormatted, toSmallImageUrl, useCustomTheme } from '../../../../../../../utils'

export const ProfileOrderCard = ({ order }: { order: ProfileOrderFragment }) => {
  const { t } = useTranslation()
  const { colors } = useCustomTheme()

  const { items } = order

  const { backgroundColor } = getRewardShippingStatusBackgroundColor(order.status as OrdersGetStatus, colors)

  const project = order.fundingTx.sourceResource as ProjectAvatarFragment

  const bitcoinPrice = order.fundingTx.bitcoinQuote?.quote || 0
  const usdPrice = getUSD(order.totalInSats, bitcoinPrice)

  return (
    <CardLayout noborder dense w="full" p={0} overflow="visible" spacing="0">
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
          <Badge
            bgColor={backgroundColor}
            variant="soft"
            colorScheme="neutral"
            maxWidth="100px"
            width="100%"
            justifySelf={'flex-end'}
            py="4px"
          >
            {RewardStatusLabel[order.status as OrdersGetStatus]}
          </Badge>
        </Tooltip>
      </HStack>
      <VStack w="full" alignItems={'start'} spacing="0">
        <KeyValueDisplay label={t('Project')} value={project.title} />
        <KeyValueDisplay label={t('Order number')} value={order.referenceCode} />
        <KeyValueDisplay label={t('Rewards')} value={''} />
      </VStack>
      <VStack w="full" spacing={0.5}>
        {items.map((item, index) => {
          return (
            <HStack w="full" key={`order-item-${index}`} alignItems={'start'}>
              <Box height="60px" width="80px">
                <ImageWithReload
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  src={toSmallImageUrl(item.item.images[0] || '')}
                  alt={`${item.item.name}-header-image`}
                  borderRadius="8px"
                />
              </Box>
              <VStack flex="1" alignItems="start" spacing="5px">
                <Body bold>{item.item.name}</Body>

                <HStack flexWrap={'wrap'} spacing="10px">
                  <KeyValueDisplay label={t('Quantity')} value={`${item.quantity}x`} />
                  <KeyValueDisplay label={t('Unit price')} value={`${commaFormatted(item.unitPriceInSats)} sats`} />
                  {item.item.category && (
                    <Badge variant="soft" colorScheme="neutral1">
                      {item.item.category}
                    </Badge>
                  )}
                </HStack>
              </VStack>
            </HStack>
          )
        })}
      </VStack>
    </CardLayout>
  )
}

export const KeyValueDisplay = ({ label, value }: { label: string; value: string }) => {
  return (
    <HStack flexWrap={'wrap'} spacing="5px">
      <Body size="sm" light whiteSpace={'nowrap'}>
        {label}:
      </Body>
      <Body size="sm" medium dark whiteSpace={'nowrap'}>
        {value}
      </Body>
    </HStack>
  )
}
