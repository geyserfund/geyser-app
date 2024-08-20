import { useEffect, useState } from 'react'

import { fetchFeaturedProject } from '@/api/airtable'
import { getFeaturedProject } from '@/shared/constants'
import { useNotification } from '@/utils'

import { FeaturedGrantCard } from '../components/FeaturedGrantCard'
import { FeaturedCardSkeleton, FeaturedProjectCard } from '../components/FeaturedProjectCard'

export const Featured = () => {
  const toast = useNotification()

  const [loading, setLoading] = useState(true)

  const [data, setData] = useState<{ Name: string; Type: 'project' | 'grant' }>()

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

  if (loading) {
    return <FeaturedCardSkeleton />
  }

  if (data && data?.Type === 'project') {
    return <FeaturedProjectCard projectName={data.Name} />
  }

  if (data && data?.Type === 'grant') {
    return <FeaturedGrantCard grantId={data.Name} />
  }

  return <FeaturedProjectCard projectName={getFeaturedProject()} />
}
