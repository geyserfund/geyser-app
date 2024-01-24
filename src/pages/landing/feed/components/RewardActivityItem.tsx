import { Box, HStack, Text, VStack, Stack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Body2 } from '../../../../components/typography'
import {
  LinkableAvatar
} from '../../../../components/ui'
import { getPath } from '../../../../constants'
import {
  ProjectRewardForLandingPageFragment, RewardCurrency
} from '../../../../types'
import { TimeAgo } from '../../components'
import { useProjectContext } from '../../../../context'

export const RewardActivityItem = ({
  reward,
  dateTime,
}: {
  reward: ProjectRewardForLandingPageFragment
  dateTime?: string
}) => {
  const { t } = useTranslation()
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
            textColor="neutral.600"
          />
        ) : null}
        <Body2>{t('created a new reward for')}</Body2>
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
  const { t } = useTranslation()
  const { project } = useProjectContext();

  return (
    <Box
      backgroundColor="neutral.50"
      border='2px'
      borderColor='neutral.200'
      borderRadius={12}
      mt={2}
      p={3}
      pos={'relative'}
      width={"100%"}
    >
      <Stack direction="row">
          <Box borderRadius={12} overflow={'hidden'} width="70px">
              <div style={{display: 'block', position: 'relative', paddingTop: '100%', width: '100%'}}>
                  <div style={{display: 'block', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: `transparent url(${reward.image}) no-repeat center center / cover`}}>
                  </div>
              </div>
          </Box>
          <Stack direction="column" flex={1} pl={2} gap={0.25}>
              <Text fontWeight={700} fontSize={16} color='neutral.900'>{reward.rewardName}</Text>
              <Text fontSize={12} color='neutral.600'>{
                  `${(reward.maxClaimable && reward.maxClaimable > 0 ? (reward.maxClaimable - reward.sold) + ` ${t('remaining')}, ` : '')}${reward.sold} ${t('sold')}`
                }</Text>
          </Stack>
          <Stack direction="column" align={'flex-end'}>
              <Text fontWeight={700} fontSize={16} color='neutral.600'>{project && project.rewardCurrency == RewardCurrency.Usdcent ? `$${reward.cost / 100}` : `${reward.cost.toLocaleString()} sats`}</Text>
          </Stack>
      </Stack>
    </Box>
  )
}
