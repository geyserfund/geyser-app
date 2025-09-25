import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { fetchFeaturedProject } from '@/api/airtable'
import { H3 } from '@/shared/components/typography/Heading.tsx'
import { getFeaturedProject } from '@/shared/constants'
import { useNotification } from '@/utils'

import { FeaturedCardSkeleton } from '../components/FeaturedCardLayout.tsx'
import { FeaturedDisplayCard } from '../components/FeaturedDisplayCard'
import { FeaturedGrantCard } from '../components/FeaturedGrantCard'
import { FeaturedProjectCard } from '../components/FeaturedProjectCard'
import { ProjectRowLayout } from '../components/ProjectRowLayout'
import { FeaturedProjectsCarousel } from './FeaturedProjectsCarousel'

export const GEYSER_PROMOTIONS_PROJECT_NAME = 'geyserpromotions'
export const GEYSER_GET_FEATURED_REWARD_ID = '3c13fada-5bf0-44bd-924a-053dcc6f97aa'

export type FeatureAirtableData = {
  Name: string
  Type: 'project' | 'grant' | 'display'
  Featured_Comment: string
  Featured_Author?: string
  imageUrl?: string
  link?: string
}
export type FeaturedAirtableRecord = {
  id: string
  createdTime: string
  fields: FeatureAirtableData
}

export type FeaturedAirtableResponse = {
  records: FeaturedAirtableRecord[]
}

export const Featured = () => {
  const toast = useNotification()
  const { t } = useTranslation()

  const [loading, setLoading] = useState(true)

  const [data, setData] = useState<FeatureAirtableData>()
  const [allAirtableData, setAllAirtableData] = useState<FeatureAirtableData[]>([])

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response: FeaturedAirtableResponse = await fetchFeaturedProject()

        if (response.records.length > 1) {
          setAllAirtableData(response.records.map((record) => record.fields).filter((data) => data.Name !== ''))
        }

        const data = response?.records?.[0]?.fields
        if (data) {
          setData(data)
        }
      } catch (error) {
        toast.error({ title: 'Failed to fetch featured project' })
      }

      setLoading(false)
    }

    fetchFeatured()
  }, [])

  const renderFeatured = () => {
    if (loading) {
      return <FeaturedCardSkeleton />
    }

    if (allAirtableData.length > 1) {
      return <FeaturedProjectsCarousel allAirtableData={allAirtableData} />
    }

    if (data && data?.Type === 'display') {
      return <FeaturedDisplayCard data={data} />
    }

    if (data && data?.Type === 'project') {
      return <FeaturedProjectCard projectName={data.Name} data={data} />
    }

    if (data && data?.Type === 'grant') {
      return <FeaturedGrantCard grantId={data.Name} />
    }

    return <FeaturedProjectCard projectName={getFeaturedProject()} />
  }

  // const rightContent = () => {
  //   return (
  //     <Button
  //       as={RouterLink}
  //       to={getPathWithGeyserPromotionsHero(
  //         'projectRewardView',
  //         GEYSER_PROMOTIONS_PROJECT_NAME,
  //         GEYSER_GET_FEATURED_REWARD_ID,
  //       )}
  //       variant="surface"
  //       colorScheme="primary1"
  //       rightIcon={<PiStarFour />}
  //     >
  //       {t('Feature project')}
  //     </Button>
  //   )
  // }

  return (
    <>
      <ProjectRowLayout
        title={
          <H3 size="xl" bold color="primary1.11" textTransform="uppercase">
            {t('Featured')}
          </H3>
        }
        // rightContent={rightContent()}
        flex={1}
        maxWidth={{ base: '100%', md: '48%' }}
      >
        {renderFeatured()}
      </ProjectRowLayout>
    </>
  )
}
