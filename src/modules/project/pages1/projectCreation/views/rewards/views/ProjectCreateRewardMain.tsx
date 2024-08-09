import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Link, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useProjectAtom, useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'
import { Body } from '@/shared/components/typography'

import { getPath } from '../../../../../../../shared/constants'
import { GeyserRewardsGuideLink } from '../../../../../../../shared/constants/platform/url'
import { RewardTemplate } from '../../../components/RewardTemplate'
import useProjectRewardTemplates from '../../../hooks/useProjectRewardTemplates'
import { RewardCategory } from '../../../types'
import { ProjectCreationRewards } from '../components/ProjectCreationRewards'

export const ProjectCreateRewardMain = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const { project } = useProjectAtom()
  const { rewards } = useRewardsAtom()

  const [hasRewards, setHasRewards] = useState(Boolean(rewards.length))

  const displayedTemplates = useProjectRewardTemplates(project?.tags || [])

  useEffect(() => {
    setHasRewards(Boolean(rewards.length))
  }, [rewards.length])

  const handleCreateRewardClick = () => {
    navigate(getPath('launchProjectRewardsCreate', project?.id))
  }

  const handleSelectRewardTemplate = (category: RewardCategory) => {
    navigate(getPath('launchProjectRewardsCreate', project?.id), { state: { category } })
  }

  return (
    <VStack spacing={8} width="100%" height="100%" gap={3}>
      <Box width="100%" display={'flex'} flexDirection={'column'} gap={2}>
        <Body medium>{t('Create a reward')}</Body>

        <Body size="sm" light>
          {t(
            'Rewards allow you to give something back to your contributors, from digital badges and physical products to sponsorships. Check out our guide on ',
          )}
          <Link href={GeyserRewardsGuideLink} target="_blank" isExternal>
            {t('How to leverage the power of Rewards')}
          </Link>
        </Body>
        <Button
          variant="solid"
          colorScheme="primary1"
          w="100%"
          leftIcon={<AddIcon fontSize="10px" />}
          onClick={handleCreateRewardClick}
        >
          {t('Create reward')}
        </Button>
      </Box>
      <Body size="sm" light>
        {t('Or, use a reward template below')}
      </Body>
      <Box
        width="100%"
        display="grid"
        gridTemplateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)']}
        gap={2}
      >
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
          <Body medium>{t('Rewards')}</Body>
          <ProjectCreationRewards />
        </Box>
      )}
    </VStack>
  )
}
