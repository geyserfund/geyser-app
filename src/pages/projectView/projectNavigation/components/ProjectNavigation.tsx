import {
  Button,
  ButtonGroup,
  ButtonProps,
  IconButton,
  IconButtonProps,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'

import { EntryEditIcon, RewardGiftIcon } from '../../../../components/icons'
import { MilestoneIcon } from '../../../../components/icons/svg'
import { ProjectIcon } from '../../../../components/icons/svg/ProjectIcon'
import { CardLayout } from '../../../../components/layouts'
import { H3 } from '../../../../components/typography'
import { getPath } from '../../../../constants'
import { useProjectContext } from '../../../../context'
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
  const navigate = useNavigate()

  const { isProjectOwner, project, onMilestonesModalOpen, onRewardsModalOpen } =
    useProjectContext()
  const hasItems = Boolean(entriesLength || rewardsLength || milestonesLength)
  return (
    <VStack ml={4} pt={5} pb={2}>
      <ProjectBackButton width="100%" />
      {hasItems ? (
        <CardLayout py={2} px={0} width="100%">
          <VStack width="100%">
            <ProjectNavigationButton
              // isActive={inView === 'header'}
              onClick={onProjectClick}
              aria-label="header"
              leftIcon={<ProjectIcon height="1.6em" />}
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
                leftIcon={<MilestoneIcon width="1.6em" />}
              >
                Milestones
              </ProjectNavigationButton>
            )}
          </VStack>
        </CardLayout>
      ) : null}
      {isProjectOwner ? (
        <CardLayout p={2} pl={3} width="100%" borderColor="primary.400">
          <ProjectCreatorButton
            onClick={() =>
              navigate(getPath('projectEntryCreation', `${project?.name}`))
            }
            icon={<EntryEditIcon />}
            aria-label="create entry button"
          >
            Write an entry
          </ProjectCreatorButton>
          <ProjectCreatorButton
            onClick={() => onRewardsModalOpen()}
            icon={<RewardGiftIcon />}
            aria-label="create reward button"
          >
            Sell a reward
          </ProjectCreatorButton>
          <ProjectCreatorButton
            onClick={() => onMilestonesModalOpen()}
            icon={<MilestoneIcon width="1.8em" />}
            aria-label="create milestone button"
          >
            Add goal
          </ProjectCreatorButton>
        </CardLayout>
      ) : null}
    </VStack>
  )
}

export const ProjectCreatorButton = ({
  icon,
  children,
  ...props
}: Pick<ButtonProps, 'onClick' | 'children'> &
  Pick<IconButtonProps, 'icon' | 'aria-label'>) => {
  const hideLabel = useBreakpointValue({ base: true, xl: false })
  return (
    <ButtonGroup spacing={0} justifyContent="center">
      <IconButton variant="primary" {...props}>
        {icon}
      </IconButton>
      {hideLabel ? null : (
        <Button
          justifyContent="start"
          width="100%"
          variant="transparent"
          {...props}
        >
          <H3>{children}</H3>
        </Button>
      )}
    </ButtonGroup>
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
        variant: 'secondary',
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
