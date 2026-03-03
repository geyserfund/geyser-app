import { HStack, Icon } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowLeft } from 'react-icons/pi'
import { Link } from 'react-router'

import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'

type BackToProjectRowProps = {
  projectName: string
}

/** Renders a back-navigation row to the project page. @param projectName Project route name. */
export const BackToProjectRow = ({ projectName }: BackToProjectRowProps) => {
  return (
    <HStack
      as={Link}
      to={getPath('project', projectName)}
      width="100%"
      paddingX={{ base: 7, lg: 10 }}
      paddingY={2}
      spacing={2}
      borderRadius={8}
      alignItems="center"
      bg="neutral1.3"
      color="neutral1.11"
      _hover={{ bg: 'neutral1.5' }}
    >
      <Icon as={PiArrowLeft} boxSize={4} />
      <Body medium>{t('Back to project')}</Body>
    </HStack>
  )
}
