import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { useNavigate, useParams } from 'react-router-dom'

import TitleWithProgressBar from '../../../../../components/molecules/TitleWithProgressBar'
import { Body1 } from '../../../../../components/typography'
import { getPath } from '../../../../../constants'
import { useProjectByNameOrIdQuery } from '../../../../../types'
import { ProjectProvider } from '../../../context'
import { ProjectCreateReward } from '../../projectView/views/projectCreatorViews/sections/rewards/subviews/CreateReward/CreateReward'
import { FormContinueButton } from '../components/FormContinueButton'
import { ProjectCreateLayout } from '../components/ProjectCreateLayout'
import { RewardTemplate } from '../components/RewardTemplate'

const rewardTemplates: { title: string; type: 'membership' | 'gift' | 'tickets' | 'nostr_badge'; image: string }[] = [
  {
    title: 'Membership',
    type: 'membership',
    image: '/icons/192-maskable.png',
  },
  {
    title: 'Gift',
    type: 'gift',
    image: '/icons/192-maskable.png',
  },
  {
    title: 'Tickets',
    type: 'tickets',
    image: '/icons/192-maskable.png',
  },
  {
    title: 'Nostr badge',
    type: 'nostr_badge',
    image: '/icons/192-maskable.png',
  },
]

export const ProjectCreateRewards = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const params = useParams<{ projectId: string }>()

  const { data } = useProjectByNameOrIdQuery({
    skip: !params.projectId,
    variables: { where: { id: Number(params.projectId) } },
  })

  const project = data?.projectGet

  const [showCreateReward, setShowCreateReward] = useState(false)

  const handleNext = () => {
    navigate(getPath('launchProjectWithNode', project?.id))
  }

  const handleSaveReward = () => {
    console.log('save reward')
  }

  const handleCreateRewardClick = () => {
    setShowCreateReward(true)
  }

  const handleBack = () => {
    if (!project) {
      return navigate(-1)
    }

    navigate(getPath('launchProjectStory', project?.id))
  }

  const handleCancel = () => {
    setShowCreateReward(false)
  }

  return (
    <ProjectProvider projectId={params.projectId || ''}>
      <ProjectCreateLayout
        title={<TitleWithProgressBar title={t('Add Rewards')} subtitle={t('Create a project')} index={4} length={5} />}
        continueButton={
          showCreateReward ? (
            <Button flexGrow={1} variant="primary" onClick={handleSaveReward}>
              {t('Save Reward')}
            </Button>
          ) : (
            <FormContinueButton flexGrow={1} onClick={handleNext} />
          )
        }
        backButton={
          showCreateReward ? (
            <Button
              flexGrow={1}
              variant="secondary"
              onClick={handleCancel}
              leftIcon={<BiLeftArrowAlt fontSize="25px" />}
            >
              {t('Cancel')}
            </Button>
          ) : undefined
        }
        onBackClick={showCreateReward ? handleCancel : handleBack}
        minW={720}
        height="100%"
      >
        {showCreateReward ? (
          <ProjectCreateReward />
        ) : (
          <VStack spacing={8} width="100%" height="100%" gap={3}>
            <Box width="100%" display={'flex'} flexDirection={'column'} gap={2}>
              <Body1 semiBold color="neutral.900">
                {t('Create a reward')}
              </Body1>
              <Body1 fontSize="14px" color="neutral.500">
                {t(
                  'Rewards allow you to give something back to your contributors, from digital badges and physical products to sponsorships. Check out our guide on How to leverage the power of Rewards.',
                )}
              </Body1>
              <Button
                w="100%"
                leftIcon={<AddIcon fontSize="10px" />}
                variant="primary"
                onClick={handleCreateRewardClick}
              >
                {t('Create reward')}
              </Button>
            </Box>
            <Body1 fontSize="14px" color="neutral.500">
              {t('Or, use a reward template below')}
            </Body1>
            <Box width="100%" display={'flex'} flexDirection={'row'} gap={2}>
              {rewardTemplates.map((reward) => (
                <RewardTemplate key={reward.type} reward={reward} />
              ))}
            </Box>
          </VStack>
        )}
      </ProjectCreateLayout>
    </ProjectProvider>
  )
}
