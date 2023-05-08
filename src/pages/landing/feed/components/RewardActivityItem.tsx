import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { CardLayout } from '../../../../components/layouts'
import { Body1, Body2 } from '../../../../components/typography'
import {
  ImageWithReload,
  LinkableAvatar,
  SatoshiAmount,
} from '../../../../components/ui'
import { getPath } from '../../../../constants'
import {
  ProjectRewardForLandingPageFragment,
  RewardCurrency,
} from '../../../../types'
import { TimeAgo } from '../../components'

export const RewardActivityItem = ({
  reward,
  dateTime,
}: {
  reward: ProjectRewardForLandingPageFragment
  dateTime?: string
}) => {
  const owner = reward.rewardProject.owners[0]?.user

  return (
    <VStack w="full" alignItems="start">
      <HStack w="full" justifyContent="start">
        {owner ? (
          <LinkableAvatar
            imageSrc={owner.imageUrl || ''}
            avatarUsername={owner.username}
            userProfileID={owner.id}
            imageSize={'24px'}
            textColor="brand.neutral600"
          />
        ) : null}
        <Body2>created a new reward for</Body2>
        <Body2
          as={Link}
          to={getPath('project', reward.rewardProject.name)}
          semiBold
          _hover={{ textDecoration: 'underline' }}
          isTruncated
          flex={1}
        >
          {reward.rewardProject.title}
        </Body2>
      </HStack>
      <RewardItem reward={reward} />
      <TimeAgo date={dateTime || ''} />
    </VStack>
  )
}

const RewardItem = ({
  reward,
}: {
  reward: ProjectRewardForLandingPageFragment
}) => {
  return (
    <CardLayout
      padding="0px"
      hover
      w="full"
      direction="column"
      overflow="hidden"
    >
      {reward.image && (
        <Box w="full" h="full" maxHeight="210px" overflow="hidden">
          <ImageWithReload w="full" h="full" grey src={`${reward.image}`} />
        </Box>
      )}
      <VStack w="full" padding="10px" alignItems="start">
        <HStack w="full">
          <VStack spacing="0px">
            {reward.rewardProject.rewardCurrency === RewardCurrency.Usdcent ? (
              <Text color="brand.textBlack" fontWeight="bold">
                {`$ ${reward.cost / 100}`}
              </Text>
            ) : (
              <SatoshiAmount fontSize="12px" color="brand.textBlack">
                {reward.cost}
              </SatoshiAmount>
            )}

            <Text fontSize="12px" color="brand.textBlack" fontWeight="bold">
              per item
            </Text>
          </VStack>
          <VStack spacing="0px" alignItems="flex-start">
            <Text fontWeight={500} color="brand.neutral900">
              {reward.rewardName}
            </Text>
            <Text
              fontSize="12px"
              backgroundColor="brand.neutral200"
              padding="2px 5px"
              borderRadius="4px"
            >
              <b>{reward.sold || 0}</b> collected
            </Text>
          </VStack>
        </HStack>
        <Body1>{reward.description}</Body1>
      </VStack>
    </CardLayout>
  )
}
