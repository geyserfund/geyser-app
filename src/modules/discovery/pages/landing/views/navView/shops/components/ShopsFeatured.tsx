/* eslint-disable camelcase */
import { Box, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useMemo, useState } from 'react'

import { fetchFeaturedShops } from '@/api/airtable.ts'
import { __development__, __staging__, VITE_APP_AIR_TABLE_KEY } from '@/shared/constants/config/env.ts'

import { FeaturedCardSkeleton } from '../../../mainView/defaultView/components/FeaturedCardLayout.tsx'
import { FeaturedDisplayCard } from '../../../mainView/defaultView/components/FeaturedDisplayCard.tsx'
import { LandingPageSectionTitle } from '../../../mainView/defaultView/components/LandingPageSectionTitle.tsx'
import { FeatureAirtableData } from '../../../mainView/defaultView/sections/Featured.tsx'

type FeaturedProductRecord = {
  id: string
  createdTime: string
  fields: {
    Name?: string
    Featured_Comment?: string
    Featured_Author?: string
    Featured_Author_?: string
    imageUrl?: string
    link?: string
  }
}

type FeaturedProductsResponse = {
  records: FeaturedProductRecord[]
}

const PLACEHOLDER_FEATURED_PRODUCTS: FeatureAirtableData[] = [
  {
    Name: 'Featured product preview',
    Type: 'display',
    Featured_Comment: 'Connect an Airtable key to load featured products from your base.',
    Featured_Author: 'Geyser',
    imageUrl: 'https://storage.googleapis.com/geyser-projects-media/app/campaigns/shop.png',
    link: '/products',
  },
  {
    Name: 'Local testing card',
    Type: 'display',
    Featured_Comment: 'This placeholder appears when Airtable data is unavailable in local/staging.',
    Featured_Author: 'Geyser',
    imageUrl: 'https://storage.googleapis.com/geyser-projects-media/app/campaigns/globe.png',
    link: '/products',
  },
]

const hasAirtableKey = Boolean(VITE_APP_AIR_TABLE_KEY)
const usePlaceholderForMissingAirtable = !hasAirtableKey && (__development__ || __staging__)

const normalizeProductRecord = (record: FeaturedProductRecord): FeatureAirtableData | null => {
  const name = record.fields.Name?.trim() || 'Featured Product'
  const featuredComment =
    record.fields.Featured_Comment?.trim() || 'Discover this featured item from the Geyser marketplace.'

  return {
    Name: name,
    Type: 'display',
    Featured_Comment: featuredComment,
    Featured_Author: record.fields.Featured_Author ?? record.fields.Featured_Author_ ?? '',
    imageUrl: record.fields.imageUrl,
    link: record.fields.link,
  }
}

export const ShopsFeatured = () => {
  const [loading, setLoading] = useState(true)
  const [records, setRecords] = useState<FeatureAirtableData[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (usePlaceholderForMissingAirtable) {
      setRecords(PLACEHOLDER_FEATURED_PRODUCTS)
      setLoading(false)
      return
    }

    const fetchFeatured = async () => {
      try {
        const response: FeaturedProductsResponse = await fetchFeaturedShops()
        const normalizedRecords = (response.records ?? [])
          .map(normalizeProductRecord)
          .filter(Boolean) as FeatureAirtableData[]

        if (normalizedRecords.length) {
          setRecords(normalizedRecords)
        } else if (__development__ || __staging__) {
          setRecords(PLACEHOLDER_FEATURED_PRODUCTS)
        }
      } catch {
        if (__development__ || __staging__) {
          setRecords(PLACEHOLDER_FEATURED_PRODUCTS)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchFeatured()
  }, [])

  const featuredRecord = useMemo(() => records[currentIndex], [currentIndex, records])

  useEffect(() => {
    if (records.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((previousIndex) => (previousIndex + 1) % records.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [records.length])

  if (loading) {
    return (
      <VStack alignItems="start" spacing={5} width="100%">
        <LandingPageSectionTitle>{t('Featured')}</LandingPageSectionTitle>
        <FeaturedCardSkeleton />
      </VStack>
    )
  }

  if (!featuredRecord) {
    return null
  }

  return (
    <VStack alignItems="start" spacing={5} width="100%">
      <LandingPageSectionTitle>{t('Featured')}</LandingPageSectionTitle>

      <Box w="full">
        <FeaturedDisplayCard data={featuredRecord} />
      </Box>

      {records.length > 1 ? (
        <HStack w="full">
          {records.map((record, index) => (
            <FeaturedDisplayCard
              key={`${record.Name}-${index}`}
              data={record}
              showMini
              startAnimating={index === currentIndex}
            />
          ))}
        </HStack>
      ) : null}
    </VStack>
  )
}
