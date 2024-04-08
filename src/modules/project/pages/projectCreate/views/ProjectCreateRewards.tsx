import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import TitleWithProgressBar from '../../../../../components/molecules/TitleWithProgressBar'
import { Body1 } from '../../../../../components/typography'
import { getPath } from '../../../../../constants'
import { useProjectByNameOrIdQuery } from '../../../../../types'
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

  const handleNext = () => {
    navigate(getPath('launchProjectWithNode', project?.id))
  }

  const handleBack = () => {
    if (!project) {
      return navigate(-1)
    }

    navigate(getPath('launchProjectStory', project?.id))
  }

  return (
    <ProjectCreateLayout
      title={<TitleWithProgressBar title={t('Add Rewards')} subtitle={t('Create a project')} index={4} length={5} />}
      continueButton={<FormContinueButton flexGrow={1} onClick={handleNext} />}
      onBackClick={handleBack}
      minW={720}
      height="80%"
    >
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
          <Button w="100%" leftIcon={<AddIcon fontSize="10px" />} variant="primary">
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
    </ProjectCreateLayout>
  )
}
