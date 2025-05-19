import { HStack, Icon, Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiInfo } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { ProjectPrelaunchStatus } from '@/shared/molecules/ProjectPrelaunchStatus.tsx'
import { isPrelaunch, useMobileMode } from '@/utils/index.ts'

import { useProjectAtom } from '../../hooks/useProjectAtom.ts'

export const ProjectPreLaunchNav = () => {
  const { project } = useProjectAtom()

  const isMobile = Boolean(useMobileMode())

  if (!isPrelaunch(project?.status)) {
    return null
  }

  return (
    <Feedback
      variant={FeedBackVariant.WARNING}
      noIcon
      minHeight="44px"
      paddingY={0}
      paddingX={0}
      alignItems="center"
      flex="1"
      spacing={2}
    >
      <HStack w="full" alignItems="center" justifyContent={'center'} spacing={2}>
        <HStack flexGrow={1} justifyContent={'center'} flexWrap={'nowrap'}>
          <Body
            as={Link}
            to={getPath('discoveryLaunchpad')}
            size={{ base: 'md', lg: 'lg' }}
            bold
            textDecoration={'underline'}
          >
            {isMobile ? `${t('Launchpad')}` : `${t('Project in Launchpad')}`}
          </Body>

          <ProjectPrelaunchStatus project={project} />

          <PopOverInfo />
        </HStack>
      </HStack>
    </Feedback>
  )
}

const PopOverInfo = () => {
  const isMobile = Boolean(useMobileMode())
  return (
    <Popover trigger={isMobile ? 'click' : 'hover'}>
      <PopoverTrigger>
        <HStack h="full" alignItems="center">
          <Icon as={PiInfo} />
        </HStack>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody maxWidth="300px">
          <Body size="sm" dark>
            {t(
              'This project needs to raise $210 in 7 days to go live. Share this project on social media to help launch it.',
            )}
          </Body>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
