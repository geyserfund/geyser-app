import { HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { H1 } from '@/shared/components/typography/Heading.tsx'

import { FilterComponent } from '../../../../components/FilterComponent.tsx'
import { FeaturedContributions } from '../components/FeaturedContributions.tsx'

export const TitleBar = () => {
  return (
    <>
      {/* <ProjectRowLayout
        w="full"
        title={t('Discover and fund Bitcoin projects worldwide')}
        titleProps={{
          textAlign: 'center',
          size: 'xl',
        }}
        spacing={8}
        rightContent={<FilterComponent />}
        headerProps={{
          display: 'flex',
          flexDirection: { base: 'column', lg: 'row' },
          alignItems: 'center',
          paddingY: 2,
        }}
      >
        <FeaturedContributions />
      </ProjectRowLayout> */}
      <VStack w="full" spacing={8}>
        <HStack flexDirection={{ base: 'column', lg: 'row' }} w="full" justifyContent="space-between">
          <H1 size={{ base: 'xl', md: '2xl', xl: '3xl' }} bold color="primary1.11">
            {t('Discover and fund Bitcoin projects worldwide')}
          </H1>
          <FilterComponent />
        </HStack>
        <FeaturedContributions />
      </VStack>
    </>
  )
}
