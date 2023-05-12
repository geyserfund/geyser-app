import { Button, ButtonProps, VStack } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

import { EntryEditIcon, RewardGiftIcon } from '../../../../components/icons'
import { MilestoneIcon } from '../../../../components/icons/svg'
import { ProjectIcon } from '../../../../components/icons/svg/ProjectIcon'
import { CardLayout } from '../../../../components/layouts'
import { H3 } from '../../../../components/typography'
import { UseProjectAnchors } from '../hooks/useProjectAnchors'
import { ProjectBackButton } from './ProjectBackButton'

export const ProjectNavigation = ({
  entriesLength,
  rewardsLength,
  milestonesLength,
  onProjectClick,
  onEntriesClick,
  onRewardsClick,
  onMilestonesClick,
}: UseProjectAnchors) => {
  return (
    <VStack ml={4} pt={5} pb={2}>
      <ProjectBackButton width="100%" />
      <CardLayout>
        <VStack maxWidth="100%">
          <ProjectNavigationButton
            // isActive={inView === 'header'}
            onClick={onProjectClick}
            leftIcon={<ProjectIcon />}
          >
            Project
          </ProjectNavigationButton>
          {Boolean(entriesLength) && (
            <ProjectNavigationButton
              // isActive={inView === 'entries'}
              onClick={onEntriesClick}
              leftIcon={<EntryEditIcon />}
            >
              Entries
            </ProjectNavigationButton>
          )}
          {Boolean(rewardsLength) && (
            <ProjectNavigationButton
              // isActive={inView === 'rewards'}
              onClick={onRewardsClick}
              leftIcon={<RewardGiftIcon />}
            >
              Rewards
            </ProjectNavigationButton>
          )}
          {Boolean(milestonesLength) && (
            <ProjectNavigationButton
              // isActive={inView === 'milestones'}
              onClick={onMilestonesClick}
              leftIcon={<MilestoneIcon />}
            >
              Milestones
            </ProjectNavigationButton>
          )}
        </VStack>
      </CardLayout>
    </VStack>
  )
}

export const ProjectNavigationButton = ({
  children,
  ...props
}: PropsWithChildren<
  Pick<ButtonProps, 'leftIcon' | 'onClick' | 'isActive'>
>) => {
  return (
    <Button
      justifyContent="start"
      width="100%"
      variant="transparent"
      {...props}
    >
      <H3 pl={1}>{children}</H3>
    </Button>
  )
}
