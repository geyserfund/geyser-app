import { t } from 'i18next'

import { FilterComponent } from '@/modules/discovery/filters/FilterComponent.tsx'

import { FeaturedContributions } from '../components/FeaturedContributions.tsx'
import { ProjectRowLayout } from '../components/ProjectRowLayout.tsx'

export const TitleBar = () => {
  return (
    <ProjectRowLayout
      w="full"
      title={t('Discover and fund Bitcoin projects worldwide')}
      rightContent={<FilterComponent />}
      spacing={8}
    >
      <FeaturedContributions />
    </ProjectRowLayout>
  )
}
