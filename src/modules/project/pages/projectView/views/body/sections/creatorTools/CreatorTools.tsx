import { Button, HStack, Link } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowUpRight } from 'react-icons/pi'
import { useLocation } from 'react-router'

import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body } from '@/shared/components/typography/Body.tsx'
import { GuideStepByStepUrl } from '@/shared/constants/index.ts'

import { ProjectStatus } from '../../../../../../../../types/index.ts'
import { useProjectAtom } from '../../../../../../hooks/useProjectAtom.ts'
import { CreatorButtons } from './components/CreatorButtons.tsx'

export const CreatorTools = () => {
  const { project, isProjectOwner } = useProjectAtom()
  const location = useLocation()
  const isDraftUrl = location.pathname.includes('/draft')

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
      backgroundColor="neutral1.3"
      spacing={4}
    >
      <HStack w="full" justifyContent="space-between">
        <Body size="2xl" bold>
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

      <HStack w="full" spacing={4} alignItems="stretch">
        <CreatorButtons />
      </HStack>
    </CardLayout>
  )
}
