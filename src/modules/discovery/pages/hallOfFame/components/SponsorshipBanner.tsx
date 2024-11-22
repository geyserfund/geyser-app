import { Image, Link } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { fetchHeroSponsorshipBannerData } from '@/api/airtable'
import { CardLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'

type AirtableHeroSponsorshipBannerData = {
  id: string
  image: string
  text: string
  link: string
  linkText: string
}

export const SponsorshipBanner = () => {
  const [loading, setLoading] = useState(true)

  const [data, setData] = useState<AirtableHeroSponsorshipBannerData>()

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetchHeroSponsorshipBannerData()

        const records = response?.records || []

        if (records.length > 0) {
          const recordLength = records.length
          const data = records[recordLength - 1]?.fields
          if (data) {
            setData(data)
          }
        }
      } catch (error) {}

      setLoading(false)
    }

    fetchFeatured()
  }, [])

  if (loading || !data) {
    return null
  }

  return (
    <CardLayout
      w="full"
      direction="row"
      alignItems={'center'}
      spacing={6}
      padding={{ base: '12px', lg: '16px 24px' }}
      backgroundColor="neutral1.4"
    >
      <Image src={data?.image} height="40px" width="40px" />
      <Body size="xl" medium>
        {data?.text}{' '}
        <Body as="span">
          <Link isExternal href={data?.link} textDecoration={'underline'}>
            {data?.linkText}
          </Link>
        </Body>
      </Body>
    </CardLayout>
  )
}
