import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { CardLayout } from '../../../../components/layouts'
import { Body1, Body2 } from '../../../../components/typography'
import { ImageWithReload, LinkableAvatar } from '../../../../components/ui'
import { getPath } from '../../../../constants'
import { ProjectReward } from '../../../../types'

export const RewardActivityItem = ({ reward }: { reward: ProjectReward }) => {
  const owner = reward.project.owners[0].user

  return (
    <VStack w="full">
      <HStack w="full" justifyContent="start" flexWrap="wrap">
        <LinkableAvatar
          imageSrc={`${owner.imageUrl}`}
          avatarUsername={owner.username}
          userProfileID={owner.id}
          imageSize={'24px'}
          textColor="brand.neutral600"
        />
        <Body2>created a new reward for</Body2>
        <Link to={getPath('project', reward.project.name)}>
          <Body2 semiBold _hover={{ textDecoration: 'underline' }}>
            {reward.project.title}
          </Body2>
        </Link>
      </HStack>
      <RewardItem reward={reward} />
    </VStack>
  )
}

export const RewardItem = ({ reward }: { reward: ProjectReward }) => {
  return (
    <CardLayout
      padding="0px"
      hover
      w="full"
      direction="column"
      overflow="hidden"
    >
      {reward.image && (
        <Box w="full" height="210px">
          <ImageWithReload w="full" h="full" grey src={`${reward.image}`} />
        </Box>
      )}
      <VStack w="full" padding="10px" alignItems="start">
        <HStack w="full">
          <VStack spacing="0px">
            <Text color="brand.textBlack" fontWeight="bold">
              {/*
                    Divided by 100 as cost is in cents
                  */}
              {`$ ${reward.cost / 100}`}
            </Text>

            <Text fontSize="12px" color="brand.textBlack" fontWeight="bold">
              per item
            </Text>
          </VStack>
          <VStack spacing="0px" alignItems="flex-start">
            <Text fontWeight={500} color="brand.neutral900">
              {reward.name}
            </Text>
            <Text
              fontSize="12px"
              backgroundColor="brand.neutral200"
              padding="2px 5px"
              borderRadius="4px"
            >
              <b>{reward.backers || 0}</b> collected
            </Text>
          </VStack>
        </HStack>
        <Body1>{reward.description}</Body1>
      </VStack>
    </CardLayout>
  )
}
