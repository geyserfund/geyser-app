import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useProjectContext } from '../../../context'
import { ProjectRewardForCreateUpdateFragment, RewardCurrency } from '../../../types/generated/graphql'
import { CardLayout } from '../../layouts'
import { Body1, Body2 } from '../../typography'
import { ICard, ImageWithReload } from '../../ui'
import { ProjectRewardAvailability } from './ProjectRewardAvailability'
import { ProjectRewardShippingEstimate } from './ProjectRewardShippingEstimate'

type Props = ICard & {
  reward: ProjectRewardForCreateUpdateFragment
  count: number
  handleEdit?: any
  handleRemove?: any
  onRewardClick?: Function
}

export const RewardCard = ({ reward, count, ...rest }: Props) => {
  const { t } = useTranslation()
  const { project } = useProjectContext()

  const isRewardAvailable = reward.maxClaimable ? reward.maxClaimable - reward.sold > count : true

  return (
    <CardLayout p={'20px'} pos={'relative'} direction="column" spacing="10px" justifyContent={'space-between'}>
      <VStack spacing="10px" alignItems="start">
        <HStack justify="space-between">
          <Body1 xBold color="neutral.900">
            {reward.name}
          </Body1>
          <HStack>
            <Body1 xBold color="neutral.600">
              {project && project.rewardCurrency === RewardCurrency.Usdcent
                ? `$${reward.cost / 100}`
                : `${reward.cost.toLocaleString()} sats`}
            </Body1>
          </HStack>
        </HStack>
        <Box
          borderRadius={8}
          border="1px solid"
          borderColor={'neutral.700'}
          overflow={'hidden'}
          width="100%"
          height="160px"
        >
          <ImageWithReload src={reward.image || ''} alt={reward.name} width="100%" height="100%" objectFit="cover" />
        </Box>
        <HStack w="full" justifyContent="space-between" align="center" alignItems={'center'}>
          <Text fontWeight={400} fontSize="14px" color="neutral.900">
            <ProjectRewardAvailability reward={reward} />
            {reward.sold || 0} {t('backers')}
          </Text>
          {reward.category && (
            <Body2 color="neutral.900" xBold>
              {reward.category}
            </Body2>
          )}
        </HStack>
        <ProjectRewardShippingEstimate w="full" reward={reward} />
        <Text fontWeight={400} fontSize="14px" color="neutral.600" lineHeight={'1.4'}>
          {reward.description}
        </Text>
      </VStack>
      <Button
        variant="primaryNeutral"
        size="sm"
        height={'40px'}
        onClick={(e) => {
          rest.onRewardClick?.(e)
        }}
        isDisabled={!isRewardAvailable}
      >
        <Text fontSize={16} fontWeight={500} isTruncated>
          {t('Select item')}
        </Text>
      </Button>
    </CardLayout>
  )
}
