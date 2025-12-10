import { Box, Button, HStack, Link, Text, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowUpRight } from 'react-icons/pi'
import { Link as RouterLink, useLocation } from 'react-router'

import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath, GuideStepByStepUrl } from '@/shared/constants/index.ts'
import { isAllOrNothing } from '@/utils'

import { ProjectStatus } from '../../../../../../../types'
import { useProjectAtom } from '../../../../../hooks/useProjectAtom'
import { useGoalsModal } from '../../../hooks'
import { PromoteProjectMenu } from './PromoteProjectMenu.tsx'

/** Creator tool button with emoji on top and text below */
const CreatorToolButton = ({
  emoji,
  label,
  to,
  onClick,
}: {
  emoji: string
  label: string
  to?: string
  onClick?: () => void
}) => {
  const buttonContent = (
    <VStack spacing={1}>
      <Text fontSize="24px">{emoji}</Text>
      <Body size="sm" medium>
        {label}
      </Body>
    </VStack>
  )

  if (to) {
    return (
      <Box
        as={RouterLink}
        to={to}
        flex={1}
        p={4}
        borderRadius="8px"
        border="1px solid"
        borderColor="neutral1.6"
        bg="utils.pbg"
        cursor="pointer"
        _hover={{ borderColor: 'neutral1.9' }}
        transition="border-color 0.2s"
        textAlign="center"
      >
        {buttonContent}
      </Box>
    )
  }

  return (
    <Box
      flex={1}
      p={4}
      borderRadius="8px"
      border="1px solid"
      borderColor="neutral1.6"
      bg="utils.pbg"
      cursor="pointer"
      _hover={{ borderColor: 'neutral1.9' }}
      transition="border-color 0.2s"
      textAlign="center"
      onClick={onClick}
    >
      {buttonContent}
    </Box>
  )
}

export const CreatorTools = () => {
  const { project, isProjectOwner } = useProjectAtom()
  const location = useLocation()
  const isDraftUrl = location.pathname.includes('/draft')

  const isAon = isAllOrNothing(project)
  const { onGoalModalOpen } = useGoalsModal()

  if (
    !isProjectOwner ||
    isDraftUrl ||
    (project.status && [ProjectStatus.Closed, ProjectStatus.Deleted].includes(project.status))
  )
    return null

  return (
    <CardLayout
      display={{ base: 'none', lg: 'flex' }}
      w="full"
      direction="row"
      flexWrap="wrap"
      backgroundColor="neutral.1"
      spacing={4}
    >
      <HStack w="full" justifyContent="space-between">
        <Body size="lg" medium>
          {t('Creator tools')}
        </Body>
        <Button
          size={'md'}
          as={Link}
          href={GuideStepByStepUrl}
          isExternal
          variant="ghost"
          colorScheme="neutral1"
          paddingX={2}
          rightIcon={<PiArrowUpRight />}
        >
          {t('Guides')}
        </Button>
      </HStack>

      <HStack w="full" spacing={4}>
        <CreatorToolButton emoji="📦" label={t('Add a product')} to={getPath('projectRewardCreate', project?.name)} />

        {!isAon && <CreatorToolButton emoji="🏁" label={t('Add a Goal')} onClick={() => onGoalModalOpen()} />}

        <CreatorToolButton emoji="✍️" label={t('Write an update')} to={getPath('projectPostCreate', project?.name)} />

        <PromoteProjectMenu projectName={project?.name} />
      </HStack>
    </CardLayout>
  )
}
