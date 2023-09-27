import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CardLayout } from '../../../../../components/layouts'
import { H3 } from '../../../../../components/typography'
import { ProjectContributors } from './ProjectContributors'

export const ProjectCreatorContributors = () => {
  const { t } = useTranslation()
  return (
    <VStack
      direction={{ base: 'column', lg: 'row' }}
      w="full"
      pt="20px"
      backgroundColor={{ base: 'neutral.0', lg: 'inherit' }}
      pb={{ base: '80px', lg: '20px' }}
      px={{ base: '10px', lg: '80px' }}
      spacing={{ base: '10px', lg: '20px' }}
    >
      <CardLayout
        direction="column"
        padding={{ base: 0, lg: '20px' }}
        w="full"
        alignItems="start"
        spacing="10px"
        mobileDense
        overflow="auto"
      >
        <H3>{t('Contributors')}</H3>
        <ProjectContributors />
      </CardLayout>
    </VStack>
  )
}