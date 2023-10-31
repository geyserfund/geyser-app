import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CardLayout } from '../../../../../components/layouts'
import { H2 } from '../../../../../components/typography'
import { dimensions } from '../../../../../constants'
import { ProjectContributors } from './ProjectContributors'

export const ProjectCreatorContributors = () => {
  const { t } = useTranslation()
  return (
    <VStack
      direction={{ base: 'column', lg: 'row' }}
      w="full"
      height={{
        base: 'auto',
        lg: `calc(100vh - ${dimensions.topNavBar.desktop.height}px)`,
      }}
      pt={{ base: '0px', lg: '20px' }}
      backgroundColor={{ base: 'neutral.0', lg: 'inherit' }}
      pb={{ base: '80px', lg: '20px' }}
      px={{ base: '10px', lg: '80px' }}
      spacing={{ base: '10px', lg: '20px' }}
      overflow="hidden"
    >
      <CardLayout
        direction="column"
        padding={{ base: 0, lg: '20px' }}
        w="full"
        height="100%"
        alignItems="start"
        spacing="0px"
        mobileDense
        overflow="hidden"
        pt={{ base: '50px', lg: '20px' }}
      >
        <VStack
          w="full"
          flexShrink={0}
          py="10px"
          alignItems="start"
          backgroundColor="neutral.0"
          position={{ base: 'fixed', lg: 'relative' }}
          top={{ base: dimensions.topNavBar.desktop.height, lg: 0 }}
          zIndex={10}
        >
          <H2>{t('Contributors')}</H2>
        </VStack>

        <ProjectContributors />
      </CardLayout>
    </VStack>
  )
}
