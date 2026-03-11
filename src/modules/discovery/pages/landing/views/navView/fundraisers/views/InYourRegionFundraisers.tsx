import { useState } from 'react'

import { useGetUserIpCountryQuery } from '@/types/index.ts'

import { RenderProjectList } from '../../components/RenderProjectList.tsx'
import { FundraisersProjects } from '../components/FundraisersProjects.tsx'

export const InYourRegionFundraisers = () => {
  const [loading, setLoading] = useState(true)

  const { data: userIpCountryData } = useGetUserIpCountryQuery({
    onCompleted() {
      setLoading(false)
    },
    onError() {
      setLoading(false)
    },
  })

  if (loading) {
    return <RenderProjectList projects={[]} loading />
  }

  return <FundraisersProjects countryCode={userIpCountryData?.userIpCountry || undefined} />
}
