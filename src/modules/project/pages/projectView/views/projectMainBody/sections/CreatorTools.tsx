import { Button, Image, Stack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { CardLayout } from '../../../../../../../components/layouts'
import { Body2 } from '../../../../../../../components/typography'
import { TitleDivider } from '../../../../../../../components/ui/TitleDivider'
import { getPath, MilestonesFlagUrl, ProjectNoTransactionImageUrl, ProjectRewardsImageUrl } from '../../../../../../../constants'
import { useProjectContext } from '../../../../../../../context'
import { ProjectStatus } from '../../../../../../../types'

export const CreatorTools = () => {
  const { t } = useTranslation()
  const { project, isProjectOwner, onMilestonesModalOpen } = useProjectContext()

  if (!project || !isProjectOwner || project.status !== ProjectStatus.Active) return null

  const projectHasRewards = project?.rewards.length > 0
  const projectHasMilestones = project?.milestones.length > 0
  const projectHasEntries = project?.entries.length > 0

  return (
    <Stack w="full" direction={{ base: 'column', lg: 'row' }} flexWrap={'wrap'}>
      {!projectHasRewards && (
        <DisplayCard
          title={t('Rewards')}
          body={t('Projects that offer Rewards raise an average of 3.3 times more funds than those that don’t')}
          buttonLabel={t('Create Reward')}
          imageSrc={ProjectRewardsImageUrl}
          buttonProps={{ as: Link, to: getPath('projectCreateReward', project?.name) }}
        />
      )}
      {!projectHasMilestones && (
        <DisplayCard
          title={t('Milestones')}
          body={t('Use milestones to inspire donors by showing them how your project is progressing.')}
          buttonLabel={t('Create Milestone')}
          imageSrc={MilestonesFlagUrl}
          buttonProps={{ onClick: onMilestonesModalOpen }}
        />
      )}
      {!projectHasEntries && (
        <DisplayCard
          title={t('Entries')}
          body={t('Use Entries to share updates and engage with your community in your own way')}
          buttonLabel={t('Add Entry')}
          imageSrc={ProjectNoTransactionImageUrl}
          buttonProps={{ as: Link, to: getPath('projectEntryCreation', project?.name) }}
        />
      )}
    </Stack>
  )
}

interface DisplayCardProps {
  title: string
  body: string
  imageSrc: string
  buttonLabel: string
  buttonProps: any
}

export const DisplayCard = ({ title, body, buttonLabel, imageSrc, buttonProps }: DisplayCardProps) => {
  return (
    <CardLayout flex="1" flexDirection="column" alignItems="flex-start" spacing="20px" minWidth={'265px'}>
      <TitleDivider>{title}</TitleDivider>
      <Image alignSelf={'center'} height="110px" width="auto" maxWidth="200px" objectFit="contain" src={imageSrc} />
      <Body2>{body}</Body2>
      <Button variant="primary" w="full" {...buttonProps}>
        {buttonLabel}
      </Button>
    </CardLayout>
  )
}
