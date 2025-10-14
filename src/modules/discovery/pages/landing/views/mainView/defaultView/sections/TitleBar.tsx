import { t } from 'i18next'

import { FilterComponent } from '../../../../components/FilterComponent.tsx'
import { FeaturedContributions } from '../components/FeaturedContributions.tsx'
import { ProjectRowLayout } from '../components/ProjectRowLayout.tsx'

export const TitleBar = () => {
  return (
    <ProjectRowLayout
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
        flexDirection: { base: 'column', lg: 'column' },
        alignItems: 'center',
        paddingY: 2,
      }}
    >
      <FeaturedContributions />
    </ProjectRowLayout>
  )
}
