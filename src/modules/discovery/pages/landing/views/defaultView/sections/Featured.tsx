import { Button } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { PiStarFour } from 'react-icons/pi'
import { Link as RouterLink } from 'react-router-dom'

import { fetchFeaturedProject } from '@/api/airtable'
import { getFeaturedProject, getPath } from '@/shared/constants'
import { useNotification } from '@/utils'

import { FeaturedGrantCard } from '../components/FeaturedGrantCard'
import { FeaturedCardSkeleton, FeaturedProjectCard } from '../components/FeaturedProjectCard'
import { ProjectRowLayout } from '../components/ProjectRowLayout'

const GEYSER_PROMOTIONS_PROJECT_NAME = 'geyserpromotions'
const GEYSER_GET_FEATURED_REWARD_ID = '5332'

export type FeatureAirtableData = {
  Name: string
  Type: 'project' | 'grant'
  Featured_Comment: string
  Featured_Author?: string
}

export const Featured = () => {
  const toast = useNotification()

  const [loading, setLoading] = useState(true)

  const [data, setData] = useState<FeatureAirtableData>()

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetchFeaturedProject()

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

    if (data && data?.Type === 'project') {
      return <FeaturedProjectCard projectName={data.Name} data={data} />
    }

    if (data && data?.Type === 'grant') {
      return <FeaturedGrantCard grantId={data.Name} />
    }

    return <FeaturedProjectCard projectName={getFeaturedProject()} />
  }

  const rightContent = () => {
    return (
      <Button
        as={RouterLink}
        to={getPath('projectRewardView', GEYSER_PROMOTIONS_PROJECT_NAME, GEYSER_GET_FEATURED_REWARD_ID)}
        variant="surface"
        colorScheme="primary1"
        rightIcon={<PiStarFour />}
      >
        {t('Feature project')}
      </Button>
    )
  }

  return (
    <>
      <ProjectRowLayout title={t('Featured')} rightContent={rightContent()} width="100%">
        {renderFeatured()}
      </ProjectRowLayout>
    </>
  )
}
