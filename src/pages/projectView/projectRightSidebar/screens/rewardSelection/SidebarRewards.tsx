import { Button, Text, VStack, Stack } from '@chakra-ui/react'

import { MobileViews, useProjectContext } from '../../../../../context'
import { ProjectRewardForCreateUpdateFragment } from '../../../../../types'
import { useTranslation } from 'react-i18next'
import { PathName } from '../../../../../constants'
import { useNavigate } from 'react-router-dom'
import { useCustomTheme } from '../../../../../utils'

export const SidebarRewards = () => {
  const {
    setMobileView,
    fundForm: { updateReward },
  } = useProjectContext()
  const { t } = useTranslation()
  const { project } = useProjectContext()
  const navigate = useNavigate()
  const { colors } = useCustomTheme()

  const onRewardClick = (reward: ProjectRewardForCreateUpdateFragment) => {
    setMobileView(MobileViews.rewards)
    navigate(PathName.projectRewards + "#r" + reward.id)
  }

  return (
    <VStack
      py={{ base: '0px', lg: '10px' }}
      spacing={4}
      width="100%"
      height="100%"
      overflowY="hidden"
      position="relative"
      alignItems="flex-start"
    >
      <Text fontWeight={500} fontSize={20}>{t('Available Rewards')}</Text>
      {project.rewards && project.rewards.length > 0 && project.rewards.map((reward) => (
        <VStack
          textAlign="left"
          alignItems="start"
          w="100%"
          py={10}
          px="10px"
          overflow="hidden"
          spacing={1}
          as={Button}
          onClick={() => {
            onRewardClick(reward)
          }}
          size="lg"
          variant="transparent"
          key={reward.id}
          style={{border: `2px solid ${colors.neutral['300']}`}}
        >
          <Text fontWeight={500} fontSize={16} color='neutral.900'>{reward.name}</Text>
          <Stack direction='row'>
            <Text fontWeight={500} fontSize={16} color='neutral.500'>${reward.cost / 100}</Text>
            <Text fontWeight={500} fontSize={16} color='neutral.500'>{reward.products.length} {t('items included')}</Text>
          </Stack>
        </VStack>
      ))}
    </VStack>
  )
}
