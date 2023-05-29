import {
  Button,
  ButtonProps,
  IconButton,
  IconButtonProps,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
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
  const hasItems = Boolean(entriesLength || rewardsLength || milestonesLength)
  return (
    <VStack ml={4} pt={5} pb={2}>
      <ProjectBackButton width="100%" />
      {hasItems ? (
        <CardLayout p={2} width="100%">
          <VStack width="100%">
            <ProjectNavigationButton
              // isActive={inView === 'header'}
              onClick={onProjectClick}
              aria-label="header"
              leftIcon={<ProjectIcon />}
            >
              Project
            </ProjectNavigationButton>
            {Boolean(entriesLength) && (
              <ProjectNavigationButton
                // isActive={inView === 'entries'}
                onClick={onEntriesClick}
                aria-label="entries"
                leftIcon={<EntryEditIcon />}
              >
                Entries
              </ProjectNavigationButton>
            )}
            {Boolean(rewardsLength) && (
              <ProjectNavigationButton
                // isActive={inView === 'rewards'}
                onClick={onRewardsClick}
                aria-label="rewards"
                leftIcon={<RewardGiftIcon />}
              >
                Rewards
              </ProjectNavigationButton>
            )}
            {Boolean(milestonesLength) && (
              <ProjectNavigationButton
                // isActive={inView === 'milestones'}
                onClick={onMilestonesClick}
                aria-label="milestones"
                leftIcon={<MilestoneIcon width="1.75em" />}
              >
                Milestones
              </ProjectNavigationButton>
            )}
          </VStack>
        </CardLayout>
      ) : null}
    </VStack>
  )
}

export const ProjectNavigationButton = ({
  children,
  leftIcon,
  ...props
}: PropsWithChildren<
  Pick<ButtonProps, 'leftIcon' | 'onClick' | 'isActive'> &
    Pick<IconButtonProps, 'aria-label' | 'variant'>
>) => {
  const hideLabel = useBreakpointValue({ base: true, xl: false })

  const Component = hideLabel ? IconButton : Button

  const ComponentProps = hideLabel
    ? {
        variant: 'transparent',
        children: leftIcon,
        ...props,
      }
    : {
        leftIcon,
        width: '100%',
        justifyContent: 'start',
        variant: 'transparent',
        children: <H3 pl={1}>{children}</H3>,
        ...props,
      }

  return <Component {...ComponentProps} />
}
