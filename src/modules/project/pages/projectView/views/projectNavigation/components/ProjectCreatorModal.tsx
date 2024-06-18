import { Box, HStack, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import { EntryEditIcon, GoalIcon, RewardGiftIcon } from '../../../../../../../components/icons'
import { Body2, H3 } from '../../../../../../../components/typography'
import { getPath } from '../../../../../../../constants'
import { UseModalReturn } from '../../../../../../../hooks/useModal'
import { CardLayout, CardLayoutProps } from '../../../../../../../shared/components/layouts'
import { Modal } from '../../../../../../../shared/components/layouts'
import { useProjectContext } from '../../../../../context'

export const ProjectCreatorModal = (props: UseModalReturn) => {
  const { t } = useTranslation()
  const { project, setMobileView, goals } = useProjectContext()

  const navigate = useNavigate()

  if (!project) return null
  return (
    <>
      <Modal {...props} title="Create content">
        <VStack spacing={4} alignItems="start">
          <CreationMenuItem
            as={Link}
            to={getPath('projectEntryCreation', project?.name)}
            icon={<EntryEditIcon />}
            title={t('Write an entry')}
            description={t('Engage your community with articles about your project updates')}
          />
          <CreationMenuItem
            icon={<RewardGiftIcon />}
            title={t('Sell a reward item')}
            description={t('Sell your work, merch, art, sponsorships, badges, or services')}
            onClick={() => {
              setMobileView(MobileViews.createReward)
              navigate(getPath('projectCreateReward', project?.name))
              props.onClose()
            }}
          />
          <Box
            onClick={() => {
              goals.onGoalsModalOpen()
              props.onClose()
            }}
          >
            <CreationMenuItem
              icon={<GoalIcon fontSize="25px" />}
              title={t('Add goal')}
              description={t('Inspire your followers to contribute to specific objectives.')}
            />
          </Box>
        </VStack>
      </Modal>
    </>
  )
}

interface CreationMenuItemProps extends CardLayoutProps {
  icon: React.ReactNode
  title: string
  description: string
}

export const CreationMenuItem = ({ icon, title, description, ...rest }: CreationMenuItemProps) => {
  return (
    <CardLayout hover height="100%" padding="12px" {...rest}>
      <HStack>
        {icon}
        <H3>{title}</H3>
      </HStack>
      <Body2>{description}</Body2>
    </CardLayout>
  )
}
