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

import { EntryEditIcon, RewardGiftIcon } from '../../../../components/icons'
import {
  ContributorsIcon,
  InsightsIcon,
  MilestoneIcon,
  OverviewIcon,
} from '../../../../components/icons/svg'
import { GeyserLogoIcon } from '../../../../components/icons/svg/GeyserLogoIcon'
import { ProjectIcon } from '../../../../components/icons/svg/ProjectIcon'
import { Body1, Caption } from '../../../../components/typography'
import { getPath, PathName } from '../../../../constants'
import { useProjectContext } from '../../../../context'
import { useMobileMode } from '../../../../utils'
import { useProjectDetails } from '../hooks/useProjectDetails'
import { useProjectSideNavAtom } from '../sideNav'
import { ProjectBackButton } from './ProjectBackButton'

export const ProjectNavigation = ({ showLabel }: { showLabel?: boolean }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const isMobile = useMobileMode()
  const [_, changeProjectSideNavOpen] = useProjectSideNavAtom()

  const { isProjectOwner, onCreatorModalOpen, project } = useProjectContext()

  const { entriesLength, rewardsLength, milestonesLength } =
    useProjectDetails(project)

  const hasItems = Boolean(entriesLength || rewardsLength || milestonesLength)

  const ProjectNavigationButtons = useMemo(
    () => [
      {
        name: 'Project',
        path: '',
        icon: ProjectIcon,
        render: true,
      },
      {
        name: 'Entries',
        path: PathName.projectEntries,
        icon: EntryEditIcon,
        render: Boolean(entriesLength),
      },
      {
        name: 'Rewards',
        path: PathName.projectRewards,
        icon: RewardGiftIcon,
        render: Boolean(rewardsLength),
      },
      {
        name: 'Milestones',
        path: PathName.projectMilestones,
        icon: MilestoneIcon,
        render: Boolean(milestonesLength),
      },
    ],
    [entriesLength, rewardsLength, milestonesLength],
  )

  const ProjectCreatorNavigationButtons = useMemo(
    () => [
      {
        name: 'Overview',
        path: PathName.projectOverview,
        icon: OverviewIcon,
      },
      {
        name: 'Insights',
        path: PathName.projectInsights,
        icon: InsightsIcon,
      },
      {
        name: 'Contributors',
        path: PathName.projectContributors,
        icon: ContributorsIcon,
      },
    ],
    [],
  )

  const currentActiveButton = useMemo(() => {
    const currentPath = location.pathname.split('/').pop()

    const allButtons = [
      ...ProjectNavigationButtons,
      ...ProjectCreatorNavigationButtons,
    ]

    return (
      allButtons.find((button) => button.path === currentPath)?.name ||
      'Project'
    )
  }, [
    ProjectNavigationButtons,
    ProjectCreatorNavigationButtons,
    location.pathname,
  ])

  const handleProjectDashboardButtonPress = () => {
    if (project?.name) {
      navigate(getPath('projectDashboard', project?.name))
    }
  }

  return (
    <VStack
      mx={{ base: '10px', lg: 4 }}
      pt={5}
      pb={2}
      maxWidth={{ base: 'auto', lg: '100px', xl: '250px' }}
      width="100%"
      height="100%"
      alignItems="end"
      spacing="20px"
    >
      <VStack
        height="100%"
        width={{ base: '190px', lg: '100px', xl: '200px' }}
        justifyContent={{ base: 'space-between', lg: 'flex-start' }}
      >
        <VStack width="100%">
          {isMobile && (
            <ProjectBackButton
              width="100%"
              onClick={changeProjectSideNavOpen}
            />
          )}
          {hasItems || isProjectOwner ? (
            <VStack spacing="15px" w="full">
              {isProjectOwner && (
                <VStack width="100%">
                  <HStack w="full" justifyContent="start">
                    <Caption fontWeight={700} color="neutral.500">
                      {t('Creator view')}
                    </Caption>
                  </HStack>

                  {ProjectCreatorNavigationButtons.map(
                    (creatorNavigationButtons) => {
                      return (
                        <ProjectNavigationButton
                          showLabel={showLabel}
                          key={creatorNavigationButtons.name}
                          onClick={() =>
                            navigate(creatorNavigationButtons.path)
                          }
                          aria-label={creatorNavigationButtons.name}
                          NavigationIcon={creatorNavigationButtons.icon}
                          isActive={
                            currentActiveButton ===
                            creatorNavigationButtons.name
                          }
                        >
                          {t(creatorNavigationButtons.name)}
                        </ProjectNavigationButton>
                      )
                    },
                  )}
                </VStack>
              )}
              <VStack width="100%">
                <HStack w="full" justifyContent="start">
                  <Caption fontWeight={700} color="neutral.500">
                    {t('Project')}
                  </Caption>
                </HStack>
                {ProjectNavigationButtons.map((navigationButton) => {
                  return (
                    navigationButton.render && (
                      <ProjectNavigationButton
                        key={navigationButton.name}
                        showLabel={showLabel}
                        onClick={() => navigate(navigationButton.path)}
                        aria-label={navigationButton.name}
                        NavigationIcon={navigationButton.icon}
                        isActive={currentActiveButton === navigationButton.name}
                      >
                        {t(navigationButton.name)}
                      </ProjectNavigationButton>
                    )
                  )
                })}
              </VStack>
            </VStack>
          ) : null}
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
                w="100%"
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
                w="100%"
                display={{ base: 'none', lg: 'block', xl: 'none' }}
                aria-label="edit"
                variant={'secondary'}
                onClick={handleProjectDashboardButtonPress}
                icon={<EditIcon fontSize="12px" />}
              />
            </VStack>
          ) : null}
        </VStack>
        <VStack
          width="100%"
          paddingTop={{ base: 0, lg: '80px' }}
          paddingBottom={'15px'}
        >
          <VStack w="full">
            <Button
              as={Link}
              display={{ base: 'flex', lg: 'none', xl: 'flex' }}
              w="full"
              alignItems="center"
              to={getPath('index')}
              variant="secondary"
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
              variant={'secondary'}
              onClick={changeProjectSideNavOpen}
              icon={<GeyserLogoIcon />}
            />
          </VStack>
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
  const hideLabel = useBreakpointValue(
    { base: true, xl: false },
    { ssr: false },
  )

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
