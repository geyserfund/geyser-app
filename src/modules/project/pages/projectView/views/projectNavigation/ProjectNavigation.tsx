import { AddIcon, EditIcon } from '@chakra-ui/icons'
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
import { PropsWithChildren, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import {
  ContributorsNavIcon,
  EntryEditIcon,
  HomeNavIcon2,
  InsightsNavIcon,
  RewardGiftIcon,
} from '../../../../../../components/icons'
import { MilestoneIcon } from '../../../../../../components/icons/svg'
import { GeyserLogoIcon } from '../../../../../../components/icons/svg/GeyserLogoIcon'
import { SkeletonLayout } from '../../../../../../components/layouts'
import { Body1, Caption } from '../../../../../../components/typography'
import { getPath, PathName } from '../../../../../../constants'
import { MobileViews, useProjectContext } from '../../../../context'
import { standardProjectPageSideMargin } from '../../constants'
import { useProjectDetails } from './hooks/useProjectDetails'
import { useProjectSideNavAtom } from './sideNav'

export const ProjectNavigation = ({ showLabel }: { showLabel?: boolean }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [_, changeProjectSideNavOpen] = useProjectSideNavAtom()

  const { isProjectOwner, onCreatorModalOpen, project, setMobileView, loading } = useProjectContext()

  const { entriesLength, rewardsLength, milestonesLength } = useProjectDetails(project)

  const ProjectNavigationButtons = useMemo(
    () => [
      {
        name: 'Project',
        path: '',
        mobileView: MobileViews.description,
        icon: HomeNavIcon2,
        subViews: [],
        render: true,
      },
      {
        name: 'Entries',
        path: PathName.projectEntries,
        mobileView: MobileViews.entries,
        icon: EntryEditIcon,
        subViews: [],
        render: Boolean(entriesLength),
      },
      {
        name: 'Rewards',
        path: PathName.projectRewards,
        mobileView: MobileViews.rewards,
        icon: RewardGiftIcon,
        subViews: [],
        render: Boolean(rewardsLength),
      },
      {
        name: 'Milestones',
        path: PathName.projectMilestones,
        mobileView: MobileViews.milestones,
        icon: MilestoneIcon,
        subViews: [],
        render: Boolean(milestonesLength),
      },
    ],
    [entriesLength, rewardsLength, milestonesLength],
  )

  const ProjectCreatorNavigationButtons = useMemo(
    () => [
      {
        name: 'Insights',
        path: PathName.projectInsights,
        mobileView: MobileViews.insights,
        subViews: [],
        icon: InsightsNavIcon,
      },
      {
        name: 'Rewards',
        path: PathName.projectManageRewards,
        mobileView: MobileViews.manageRewards,
        subViews: [MobileViews.createReward, MobileViews.editReward],
        icon: RewardGiftIcon,
      },
      {
        name: 'Contributors',
        path: PathName.projectContributors,
        mobileView: MobileViews.contributors,
        subViews: [],
        icon: ContributorsNavIcon,
      },
    ],
    [],
  )

  const currentActiveButton = useMemo(() => {
    const currentPath = location.pathname.split('/').pop()

    const allButtons = [...ProjectNavigationButtons, ...ProjectCreatorNavigationButtons]

    return (
      allButtons.find(
        (button) =>
          button.path === currentPath ||
          (button.subViews && button.subViews.find((subview: MobileViews) => subview === currentPath)),
      )?.path || ''
    )
  }, [ProjectNavigationButtons, ProjectCreatorNavigationButtons, location.pathname])

  const handleProjectDashboardButtonPress = () => {
    if (project?.name) {
      navigate(getPath('projectDashboard', project?.name))
    }
  }

  return (
    <VStack
      ml={standardProjectPageSideMargin}
      pt={5}
      pb={2}
      maxWidth={{ base: 'auto', lg: '100px', xl: '220px' }}
      width="100%"
      height="100%"
      alignItems="end"
      spacing="20px"
    >
      <VStack
        height="100%"
        mx="10px"
        width={{ base: '190px', lg: '80px', xl: '200px' }}
        justifyContent={{ base: 'space-between', lg: 'flex-start' }}
      >
        <VStack width="100%">
          <VStack w="full">
            <Button
              as={Link}
              display={{ base: 'flex', lg: 'none', xl: 'flex' }}
              w="full"
              justifyContent="start"
              alignItems="center"
              to={getPath('index')}
              variant="ghost"
              onClick={changeProjectSideNavOpen}
              leftIcon={<GeyserLogoIcon />}
            >
              {t('Geyser home')}
            </Button>
            <IconButton
              w="100%"
              as={Link}
              to={getPath('index')}
              display={{ base: 'none', lg: 'flex', xl: 'none' }}
              aria-label="edit"
              justifyContent={'center'}
              alignItems="center"
              variant={'ghost'}
              onClick={changeProjectSideNavOpen}
              icon={<GeyserLogoIcon />}
            />
          </VStack>
          <VStack spacing="15px" w="full">
            <VStack width="100%">
              <HStack
                w="full"
                justifyContent={{
                  base: 'start',
                  lg: 'center',
                  xl: 'start',
                }}
              >
                <Caption fontWeight={700} color="neutral.500">
                  {t('Project')}
                </Caption>
              </HStack>
              {ProjectNavigationButtons.map((navigationButton) => {
                const handleProjectNavigationButtonClick = () => {
                  setMobileView(navigationButton.mobileView)
                  navigate(navigationButton.path)
                }

                return navigationButton.render ? (
                  <ProjectNavigationButton
                    key={navigationButton.name}
                    showLabel={showLabel}
                    onClick={handleProjectNavigationButtonClick}
                    aria-label={navigationButton.name}
                    NavigationIcon={navigationButton.icon}
                    isActive={currentActiveButton === navigationButton.path}
                  >
                    {t(navigationButton.name)}
                  </ProjectNavigationButton>
                ) : loading || !project ? (
                  <ProjectNavigationButtonSkeleton key={navigationButton.name} />
                ) : null
              })}
            </VStack>
            {isProjectOwner && (
              <VStack width="100%">
                <HStack
                  w="full"
                  justifyContent={{
                    base: 'start',
                    lg: 'center',
                    xl: 'start',
                  }}
                >
                  <Caption fontWeight={700} color="neutral.500">
                    {t('Creator view')}
                  </Caption>
                </HStack>

                {ProjectCreatorNavigationButtons.map((creatorNavigationButtons) => {
                  const handleProjectNavigationButtonClick = () => {
                    setMobileView(creatorNavigationButtons.mobileView)
                    navigate(creatorNavigationButtons.path)
                  }

                  return (
                    <ProjectNavigationButton
                      showLabel={showLabel}
                      key={creatorNavigationButtons.name}
                      onClick={handleProjectNavigationButtonClick}
                      aria-label={creatorNavigationButtons.name}
                      NavigationIcon={creatorNavigationButtons.icon}
                      isActive={currentActiveButton === creatorNavigationButtons.path}
                    >
                      {t(creatorNavigationButtons.name)}
                    </ProjectNavigationButton>
                  )
                })}
              </VStack>
            )}
          </VStack>

          {isProjectOwner ? (
            <VStack w="full" spacing="10px">
              <Button
                w="100%"
                display={{ base: 'block', lg: 'none', xl: 'block' }}
                variant="primary"
                onClick={() => onCreatorModalOpen()}
                leftIcon={<AddIcon fontSize="12px" />}
              >
                {t('Add')}
              </Button>
              <IconButton
                display={{ base: 'none', lg: 'block', xl: 'none' }}
                aria-label="Add"
                variant="primary"
                onClick={() => onCreatorModalOpen()}
                icon={<AddIcon fontSize="12px" />}
              />

              <Button
                w="100%"
                display={{ base: 'block', lg: 'none', xl: 'block' }}
                variant={'secondary'}
                onClick={handleProjectDashboardButtonPress}
                leftIcon={<EditIcon fontSize="12px" />}
                isTruncated
              >
                {t('Edit project')}
              </Button>
              <IconButton
                display={{ base: 'none', lg: 'block', xl: 'none' }}
                aria-label="edit"
                variant={'secondary'}
                onClick={handleProjectDashboardButtonPress}
                icon={<EditIcon fontSize="12px" />}
              />
            </VStack>
          ) : null}
        </VStack>
      </VStack>
    </VStack>
  )
}

export const ProjectNavigationButton = ({
  children,
  NavigationIcon,
  showLabel,
  ...props
}: PropsWithChildren<
  Pick<ButtonProps, 'leftIcon' | 'onClick' | 'isActive'> &
    Pick<IconButtonProps, 'aria-label' | 'variant'> & {
      NavigationIcon: (props: IconProps) => JSX.Element
      showLabel?: boolean
    }
>) => {
  const hideLabel = useBreakpointValue({ base: true, xl: false }, { ssr: false })

  const color = props.isActive ? 'neutral.900' : 'neutral.700'

  if (hideLabel && !showLabel) {
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

export const ProjectNavigationButtonSkeleton = () => {
  const hideLabel = useBreakpointValue({ base: true, xl: false }, { ssr: false })

  if (hideLabel) {
    return <SkeletonLayout height="40px" width="40px" />
  }

  return (
    <HStack w="full" padding="3px 5px">
      <SkeletonLayout height="32px" width="32px" />
      <SkeletonLayout height="25px" flex="1" />
    </HStack>
  )
}
