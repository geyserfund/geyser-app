import { Button, HStack, Icon, Link as ChakraLink, StackProps, Tooltip, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Body } from '../components/typography'
import { getPath, GeyserTelegramUrl } from '../constants'
import {
  getProjectStatus,
  GetProjectStatusProps,
  ProjectStatusColorScheme,
  ProjectStatusCreatorText,
  ProjectStatusIcons,
  ProjectStatusLabels,
  ProjectStatusTooltip,
} from '../utils/project/getProjectStatus'

type ProjectStatusBarProps = {
  isProjectOwner?: boolean
} & Partial<GetProjectStatusProps> &
  StackProps

type ProjectStatusCTAType = {
  [key in ProjectStatusLabels]: (() => React.ReactNode) | undefined
}

export const ProjectStatusBar = ({ isProjectOwner, project, wallet, ...props }: ProjectStatusBarProps) => {
  const ProjectStatusCTA = useMemo(() => {
    if (!project) return {} as ProjectStatusCTAType

    return {
      [ProjectStatusLabels.UNSTABLE_WALLET]: () => (
        <Button variant="solid" colorScheme="primary1" as={Link} to={getPath('dashboardWallet', project?.name)}>
          {t('Connect wallet')}
        </Button>
      ),
      [ProjectStatusLabels.INACTIVE_WALLET]: () => (
        <Button variant="solid" colorScheme="primary1" as={Link} to={getPath('dashboardWallet', project?.name)}>
          {t('Connect wallet')}
        </Button>
      ),
      [ProjectStatusLabels.RUNNING]: undefined,
      [ProjectStatusLabels.DRAFT]: () => undefined,

      [ProjectStatusLabels.INACTIVE]: () => (
        <Button variant="solid" colorScheme="primary1" as={Link} to={getPath('dashboardSettings', project.name)}>
          {t('Settings')}
        </Button>
      ),

      [ProjectStatusLabels.IN_REVIEW]: () => (
        <Button variant="solid" colorScheme="primary1" as={ChakraLink} href={GeyserTelegramUrl} isExternal>
          {t('React out for help')}
        </Button>
      ),

      [ProjectStatusLabels.CLOSED]: undefined,
    } as ProjectStatusCTAType
  }, [project])

  if (!project || !wallet) {
    return null
  }

  const projectStatus = getProjectStatus({ project, wallet })

  const colorScheme = ProjectStatusColorScheme[projectStatus]

  const statusIcon = ProjectStatusIcons[projectStatus]

  const tooltipLabel = ProjectStatusTooltip[projectStatus]

  const creatorText = ProjectStatusCreatorText[projectStatus]

  const cta = ProjectStatusCTA[projectStatus]

  if (projectStatus === ProjectStatusLabels.RUNNING) {
    return null
  }

  return (
    <VStack
      w="full"
      spacing={3}
      paddingY={4}
      paddingX={{ base: 3, lg: 6 }}
      justifyContent="center"
      backgroundColor={`${colorScheme}.3`}
      {...props}
    >
      <HStack w="full" justifyContent={'center'} spacing={6}>
        <Tooltip label={isProjectOwner ? '' : tooltipLabel} placement="top" size="sm">
          <HStack alignItems="center">
            <Icon as={statusIcon} fontSize={'18px '} color="utils.text" />

            <Body size="sm" color={'utils.text'} medium>
              {t(projectStatus)}
            </Body>
          </HStack>
        </Tooltip>
        {isProjectOwner && cta && cta()}
      </HStack>

      {isProjectOwner && (
        <Body maxWidth={'560px'} textAlign={'center'}>
          {creatorText}
        </Body>
      )}
    </VStack>
  )
}

export const ProjectStatusIcon = ({ project, wallet, isProjectOwner }: ProjectStatusBarProps) => {
  const { t } = useTranslation()

  if (!project || !wallet) {
    return null
  }

  const status = getProjectStatus({ project, wallet })

  const CurrentIcon = ProjectStatusIcons[status]
  const colorScheme = ProjectStatusColorScheme[status]
  const tooltip = ProjectStatusTooltip[status]

  return (
    <Tooltip label={t(tooltip)} placement="top" size="sm">
      <HStack
        h={8}
        w={8}
        alignItems="center"
        justifyContent="center"
        backgroundColor={`${colorScheme}.3`}
        borderRadius={'8px'}
      >
        <Icon as={CurrentIcon} fontSize={'18px'} color={`${colorScheme}.11`} />
      </HStack>
    </Tooltip>
  )
}
