import { QuestionIcon } from '@chakra-ui/icons'
import { Button, Image, Stack, Text, Tooltip, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { CardLayout } from '../../../../../../../components/layouts'
import { Body2 } from '../../../../../../../components/typography'
import { TitleDivider } from '../../../../../../../components/ui/TitleDivider'
import {
  getPath,
  GoalsFlagUrl,
  ProjectNoTransactionImageUrl,
  ProjectRewardsImageUrl,
} from '../../../../../../../constants'
import { ProjectStatus } from '../../../../../../../types'
import { useMobileMode } from '../../../../../../../utils'
import { useProjectContext } from '../../../../../context'
import { useProjectGoals } from '../../../../projectView/hooks/useProjectGoals'
import { GoalModal } from '../components/GoalModal'

export const CreatorTools = () => {
  const { t } = useTranslation()
  const { project, isProjectOwner } = useProjectContext()
  const { hasGoals, refetch } = useProjectGoals()
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false)

  if (!project || !isProjectOwner || project.status !== ProjectStatus.Active) return null

  const toggleGoalModal = () => setIsGoalModalOpen(!isGoalModalOpen)

  const projectHasRewards = project?.rewards?.length > 0
  const projectHasEntries = project?.entries?.length > 0

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
      {!hasGoals && (
        <DisplayCard
          title={t('Goals')}
          body={t('Use goals to inspire donors by showing them how your project is progressing.')}
          buttonLabel={t('Create Goal')}
          imageSrc={GoalsFlagUrl}
          buttonProps={{ onClick: toggleGoalModal }}
          rightAction={<GoalTooltip />}
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
      {isGoalModalOpen && (
        <GoalModal isOpen={isGoalModalOpen} onClose={toggleGoalModal} projectId={project?.id} refetch={refetch} />
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
  rightAction?: React.ReactNode
}

export const DisplayCard = ({ title, body, buttonLabel, imageSrc, buttonProps, rightAction }: DisplayCardProps) => {
  return (
    <CardLayout flex="1" flexDirection="column" alignItems="flex-start" spacing="20px" minWidth={'265px'}>
      <TitleDivider rightAction={rightAction}>{title}</TitleDivider>
      <Image alignSelf={'center'} height="110px" width="auto" maxWidth="200px" objectFit="contain" src={imageSrc} />
      <Body2>{body}</Body2>
      <Button variant="primary" w="full" {...buttonProps}>
        {buttonLabel}
      </Button>
    </CardLayout>
  )
}

const GoalTooltip = () => {
  const { t } = useTranslation()

  const isMobile = useMobileMode()

  const tooltipText = (
    <VStack align="flex-start" display="flex" gap="10px">
      <Text>{t('We recently enhanced Milestones by transforming them into Goals.')}</Text>
      <Text>
        {t(
          'To do so we needed to trash existing Milestones. If you have any questions or would like us to give you the list of old Milestones reach out to us at support@geyser.fund.',
        )}
      </Text>
    </VStack>
  )
  return (
    <Tooltip
      label={tooltipText}
      bg={'neutral.900'}
      color={'neutral.0'}
      borderRadius={8}
      placement="top-start"
      fontSize={'12px'}
      fontWeight={'600'}
      padding={5}
      hasArrow
      shouldWrapChildren
      openDelay={isMobile ? 100 : 0}
      closeDelay={isMobile ? 100 : 0}
      closeOnClick={isMobile}
    >
      <QuestionIcon color={'primary.900'} cursor="pointer" />
    </Tooltip>
  )
}
