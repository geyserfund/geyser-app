import { VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router'

import { isManagedCircularGrantProject } from '@/modules/project/domain/managedCircularGrant.ts'
import { CardLayoutProps } from '@/shared/components/layouts/CardLayout'
import { AonProgressBar } from '@/shared/molecules/project/AonProgressBar.tsx'
import { AonProgressData } from '@/shared/molecules/project/AonProgressData.tsx'
import { isAllOrNothing } from '@/utils/index.ts'

import { getPathWithGeyserPromotionsHero } from '../../../../../../../../shared/constants/config/routerPaths.ts'
import { useFeaturedProjectForLandingPageQuery } from '../../../../../../../../types/generated/graphql.ts'
import { FeatureAirtableData } from '../sections/Featured.tsx'
import { FeaturedCardLayout, FeaturedCardSkeleton } from './FeaturedCardLayout.tsx'
import { MiniProjectCard } from './MiniProjectCard.tsx'

export const FeaturedProjectCard = ({
  projectName,
  showMini,
  startAnimating,
  data,
  ...rest
}: {
  projectName: string
  showMini?: boolean
  startAnimating?: boolean
  data?: FeatureAirtableData
} & CardLayoutProps) => {
  const navigate = useNavigate()
  const { data: response, loading } = useFeaturedProjectForLandingPageQuery({
    variables: {
      where: {
        name: projectName,
      },
    },
    skip: !projectName,
  })

  const project = response?.projectGet

  if (loading || !project) {
    if (showMini) {
      return null
    }

    return <FeaturedCardSkeleton />
  }

  if (showMini && project) {
    return (
      <MiniProjectCard
        imageUrl={project.thumbnailImage}
        title={project.title}
        startAnimating={startAnimating}
        onClick={() => navigate(getPathWithGeyserPromotionsHero('project', projectName))}
      />
    )
  }

  const isAON = isAllOrNothing(project)
  const isManagedCircularGrant = isManagedCircularGrantProject(project)
  const isGoalCampaign = isAON || isManagedCircularGrant

  return (
    <>
      <FeaturedCardLayout
        thumbnailImage={project.thumbnailImage ?? ''}
        title={project.title}
        startAnimating={startAnimating}
        comment={data?.Featured_Comment || project.shortDescription || ''}
        author={isAON ? undefined : data?.Featured_Author}
        imageAspectRatio={1}
        onClick={() => navigate(getPathWithGeyserPromotionsHero('project', projectName))}
        {...rest}
      >
        {isGoalCampaign && (
          <VStack w="full" alignItems="start" spacing={1}>
            <AonProgressBar project={isAON ? project : { fundingSummary: project.fundingSummary }} />
            <AonProgressData project={project} />
          </VStack>
        )}
      </FeaturedCardLayout>
    </>
  )
}
