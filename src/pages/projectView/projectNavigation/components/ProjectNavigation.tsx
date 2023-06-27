import {
  Button,
  ButtonProps,
  IconButton,
  IconButtonProps,
  Text,
  Tooltip,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

import { EntryEditIcon, RewardGiftIcon } from '../../../../components/icons'
import { MilestoneIcon } from '../../../../components/icons/svg'
import { ProjectIcon } from '../../../../components/icons/svg/ProjectIcon'
import { CardLayout } from '../../../../components/layouts'
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
  const { t } = useTranslation()
  const { isProjectOwner, onCreatorModalOpen } = useProjectContext()
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
              leftIcon={<ProjectIcon fontSize="1.5em" width="1.3em" />}
            >
              {t('Project')}
            </ProjectNavigationButton>
            {Boolean(entriesLength) && (
              <ProjectNavigationButton
                // isActive={inView === 'entries'}
                onClick={onEntriesClick}
                aria-label="entries"
                leftIcon={<EntryEditIcon fontSize="1.5em" width="1.3em" />}
              >
                {t('Entries')}
              </ProjectNavigationButton>
            )}
            {Boolean(rewardsLength) && (
              <ProjectNavigationButton
                // isActive={inView === 'rewards'}
                onClick={onRewardsClick}
                aria-label="rewards"
                leftIcon={<RewardGiftIcon fontSize="1.5em" width="1.3em" />}
              >
                {t('Rewards')}
              </ProjectNavigationButton>
            )}
            {Boolean(milestonesLength) && (
              <ProjectNavigationButton
                // isActive={inView === 'milestones'}
                onClick={onMilestonesClick}
                aria-label="milestones"
                leftIcon={<MilestoneIcon fontSize="1.5em" width="1.3em" />}
              >
                {t('Milestones')}
              </ProjectNavigationButton>
            )}
          </VStack>
        </CardLayout>
      ) : null}
      {isProjectOwner ? (
        <>
          <Button
            w="100%"
            variant="primary"
            onClick={() => onCreatorModalOpen()}
          >
            {t('Create')}
          </Button>
        </>
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
  const hideLabel = useBreakpointValue(
    { base: true, xl: false },
    { ssr: false },
  )

  if (hideLabel) {
    return (
      <Tooltip label={children} placement="right">
        <IconButton variant="transparent" {...props}>
          {leftIcon}
        </IconButton>
      </Tooltip>
    )
  }

  return (
    <Button
      variant="transparent"
      justifyContent="start"
      width="100%"
      leftIcon={leftIcon}
      {...props}
    >
      <Text variant="h3" width="100%" textAlign="left" pl={1}>
        {children}
      </Text>
    </Button>
  )
}
