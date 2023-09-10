import { AddIcon } from '@chakra-ui/icons'
import {
  Button,
  ButtonProps,
  HStack,
  IconButton,
  IconButtonProps,
  IconProps,
  Tooltip,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

import { EntryEditIcon, RewardGiftIcon } from '../../../../components/icons'
import {
  ContributorsIcon,
  InsightsIcon,
  MilestoneIcon,
  OverviewIcon,
} from '../../../../components/icons/svg'
import { ProjectIcon } from '../../../../components/icons/svg/ProjectIcon'
import { Body1, Caption } from '../../../../components/typography'
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
        <VStack spacing="15px">
          <VStack width="100%">
            <HStack w="full" justifyContent="start">
              <Caption fontWeight={700} color="neutral.500">
                {t('Creator view')}
              </Caption>
            </HStack>

            <ProjectNavigationButton
              onClick={onProjectClick}
              aria-label="header"
              NavigationIcon={OverviewIcon}
            >
              {t('Overview')}
            </ProjectNavigationButton>
            <ProjectNavigationButton
              onClick={onProjectClick}
              aria-label="header"
              NavigationIcon={InsightsIcon}
            >
              {t('Insights')}
            </ProjectNavigationButton>
            <ProjectNavigationButton
              onClick={onProjectClick}
              aria-label="header"
              NavigationIcon={ContributorsIcon}
            >
              {t('Contributors')}
            </ProjectNavigationButton>
          </VStack>

          <VStack width="100%">
            <HStack w="full" justifyContent="start">
              <Caption fontWeight={700} color="neutral.500">
                {t('Project')}
              </Caption>
            </HStack>
            <ProjectNavigationButton
              onClick={onProjectClick}
              aria-label="header"
              NavigationIcon={ProjectIcon}
            >
              {t('Project')}
            </ProjectNavigationButton>
            {Boolean(entriesLength) && (
              <ProjectNavigationButton
                onClick={onEntriesClick}
                aria-label="entries"
                NavigationIcon={EntryEditIcon}
              >
                {t('Entries')}
              </ProjectNavigationButton>
            )}
            {Boolean(rewardsLength) && (
              <ProjectNavigationButton
                isActive={true}
                onClick={onRewardsClick}
                aria-label="rewards"
                NavigationIcon={RewardGiftIcon}
              >
                {t('Rewards')}
              </ProjectNavigationButton>
            )}
            {Boolean(milestonesLength) && (
              <ProjectNavigationButton
                onClick={onMilestonesClick}
                aria-label="milestones"
                NavigationIcon={MilestoneIcon}
              >
                {t('Milestones')}
              </ProjectNavigationButton>
            )}
          </VStack>
        </VStack>
      ) : null}
      {isProjectOwner ? (
        <>
          <Button
            w="100%"
            variant="primary"
            onClick={() => onCreatorModalOpen()}
            leftIcon={<AddIcon fontSize="12px" />}
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
  NavigationIcon,
  ...props
}: PropsWithChildren<
  Pick<ButtonProps, 'leftIcon' | 'onClick' | 'isActive'> &
    Pick<IconButtonProps, 'aria-label' | 'variant'> & {
      NavigationIcon: (props: IconProps) => JSX.Element
    }
>) => {
  const hideLabel = useBreakpointValue(
    { base: true, xl: false },
    { ssr: false },
  )

  const color = props.isActive ? 'neutral.900' : 'neutral.700'

  if (hideLabel) {
    return (
      <Tooltip label={children} placement="right">
        <IconButton variant="transparent" {...props}>
          <NavigationIcon color={color} fontSize="1.5em" width="1.3em" />
        </IconButton>
      </Tooltip>
    )
  }

  return (
    <Button
      variant="transparent"
      justifyContent="start"
      width="100%"
      leftIcon={<NavigationIcon color={color} fontSize="1.5em" width="1.3em" />}
      _active={{ backgroundColor: 'neutral.100' }}
      {...props}
    >
      <Body1 semiBold color={color} width="100%" textAlign="left" pl={1}>
        {children}
      </Body1>
    </Button>
  )
}
