import { Box, HStack, Tooltip, VStack } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { useTranslation } from 'react-i18next'

import { CardLayout } from '../../../../../../../components/layouts'
import { TransactionTime } from '../../../../../../../components/molecules'
import { Body1, Body2, Caption } from '../../../../../../../components/typography'
import { ImageWithReload, ProjectAvatarLink } from '../../../../../../../components/ui'
import { RewardStatus, RewardStatusLabel } from '../../../../../../../constants'
import { getRewardShippingStatusBackgroundColor } from '../../../../../../../helpers/getProjectShippingStatusBackgroundColor'
import { ProfileOrderFragment, ProjectAvatarFragment } from '../../../../../../../types'
import { commaFormatted, toSmallImageUrl, useCustomTheme } from '../../../../../../../utils'

export const ProfileOrderCard = ({ order }: { order: ProfileOrderFragment }) => {
  const { t } = useTranslation()
  const { colors } = useCustomTheme()

  const { items } = order

  const { backgroundColor } = getRewardShippingStatusBackgroundColor(order.status as RewardStatus, colors)

  const project = order.fundingTx.sourceResource as ProjectAvatarFragment

  return (
    <CardLayout w="full" p={0} overflow="visible">
      <VStack w="full" p="10px" pb={0} spacing="10px">
        <HStack w="full" justifyContent={'space-between'}>
          <HStack>
            {order.confirmedAt && (
              <TransactionTime onChain={order.fundingTx.onChain} dateTime={order.confirmedAt} fontSize={'16px'} />
            )}
            <Body1>▶</Body1>
            <ProjectAvatarLink project={project} />
          </HStack>
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
              <Body2 color={'neutral.900'}>{RewardStatusLabel[order.status as RewardStatus]}</Body2>
            </HStack>
          </Tooltip>
        </HStack>
        <VStack w="full" alignItems={'start'}>
          <HStack flexWrap={'wrap'} spacing="20px">
            <KeyValueDisplay label={t('Total')} value={`${commaFormatted(order.totalInSats)} sats`} />
            {order.confirmedAt && (
              <KeyValueDisplay
                label={t('Date Purchased')}
                value={DateTime.fromMillis(order.confirmedAt).toFormat('LLL dd, yyyy')}
              />
            )}
          </HStack>
          <KeyValueDisplay label={t('Reference code')} value={order.referenceCode} />
        </VStack>
      </VStack>
      {items.map((item, index) => {
        return (
          <HStack
            key={`order-item-${index}`}
            p="10px"
            borderTop="2px solid"
            borderColor="neutral.200"
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
            <VStack flex="1" alignItems="start">
              <Body1 semiBold color="neutral.900">
                {item.item.name}
              </Body1>

              <Body2 color="neutral.600">{item.item.description}</Body2>
              <HStack flexWrap={'wrap'} spacing="20px">
                <KeyValueDisplay label={t('Cost per unit')} value={`${item.unitPriceInSats} sats`} />
                <KeyValueDisplay label={t('Quantity')} value={`${item.quantity}x`} />
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
    <HStack flexWrap={'wrap'}>
      <Body2 color="neutral.600" whiteSpace={'nowrap'}>
        {label}:
      </Body2>
      <Body2 semiBold color="neutral.900" whiteSpace={'nowrap'}>
        {value}
      </Body2>
    </HStack>
  )
}
