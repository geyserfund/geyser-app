import { t } from 'i18next'

import { FilterComponent } from '../../../../components/FilterComponent.tsx'
import { FeaturedContributions } from '../components/FeaturedContributions.tsx'
import { ProjectRowLayout } from '../components/ProjectRowLayout.tsx'

export const TitleBar = () => {
  return (
    <ProjectRowLayout
      w="full"
      title={t('Discover and fund Bitcoin projects worldwide')}
      spacing={8}
      rightContent={<FilterComponent />}
    >
      <FeaturedContributions />
    </ProjectRowLayout>
  )
}
