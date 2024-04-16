import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Link, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { Body1 } from '../../../../../components/typography'
import { getPath } from '../../../../../constants'
import { GeyserRewardsGuideLink } from '../../../../../constants/platform/url'
import { useProjectByNameOrIdQuery } from '../../../../../types'
import { ProjectCreationRewards as Rewards } from '../components/ProjectCreationRewards'
import useProjectRewardTemplates from '../hooks/useProjectRewardTemplates'
import { RewardCategory } from '../types'
import { RewardTemplate } from './RewardTemplate'

export const ProjectCreateRewardMain = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const params = useParams<{ projectId: string }>()

  const { data } = useProjectByNameOrIdQuery({
    skip: !params.projectId,
    variables: { where: { id: Number(params.projectId) } },
  })

  const project = data?.projectGet

  const [hasRewards, setHasRewards] = useState(Boolean(project?.rewards.length))

  const displayedTemplates = useProjectRewardTemplates(project?.tags || [])

  useEffect(() => {
    setHasRewards(Boolean(project?.rewards.length))
  }, [project?.rewards.length])

  const handleCreateRewardClick = () => {
    navigate(getPath('launchProjectRewardsNew', project?.id))
  }

  const handleSelectRewardTemplate = (category: RewardCategory) => {
    navigate(getPath('launchProjectRewardsNew', project?.id), { state: { category } })
  }

  return (
    <VStack spacing={8} width="100%" height="100%" gap={3}>
      <Box width="100%" display={'flex'} flexDirection={'column'} gap={2}>
        <Body1 semiBold color="neutral.9000">
          {t('Create a reward')}
        </Body1>

        <Body1 fontSize="14px" color="neutral.500">
          {t(
            'Rewards allow you to give something back to your contributors, from digital badges and physical products to sponsorships. Check out our guide on ',
          )}
          <Link href={GeyserRewardsGuideLink} target="_blank" isExternal>
            {t('How to leverage the power of Rewards')}
          </Link>
        </Body1>
        <Button w="100%" leftIcon={<AddIcon fontSize="10px" />} variant="primary" onClick={handleCreateRewardClick}>
          {t('Create reward')}
        </Button>
      </Box>
      <Body1 fontSize="14px" color="neutral.500">
        {t('Or, use a reward template below')}
      </Body1>
      <Box width="100%" display={'flex'} flexDirection={'row'} gap={2}>
        {displayedTemplates.map((reward) => (
          <RewardTemplate
            key={reward.category}
            reward={reward}
            onClick={() => handleSelectRewardTemplate(reward.category)}
          />
        ))}
      </Box>

      {hasRewards && (
        <Box width="100%" display={'flex'} flexDirection={'column'} gap={2} pb={10}>
          <Body1 semiBold color="neutral.900">
            {t('Edit rewards')}
          </Body1>
          <Rewards />
        </Box>
      )}
    </VStack>
  )
}
