import { Box, HStack, IconButton, Link, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { PiX } from 'react-icons/pi'

import { fetchInfoBannerData } from '@/api/airtable'
import { GeyserLogoIcon } from '@/components/icons/svg/GeyserLogoIcon'
import { CardLayout } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { lightModeColors } from '@/shared/styles'

import { InfoBannerHistoryDataAtom } from './InfoBannerAtom'

type AirtableInfoBannerData = {
  id: string
  title: string
  description: string
  link: string
  linkText: string
}

export const InfoBanner = () => {
  const [infoBannerHistoryData, setInfoBannerHistoryData] = useAtom(InfoBannerHistoryDataAtom)

  const [loading, setLoading] = useState(true)

  const [data, setData] = useState<AirtableInfoBannerData>()

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetchInfoBannerData()

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

  console.log('chceking data', data)

  const available = data && !infoBannerHistoryData.includes(data.id)

  if (loading || !available) {
    return null
  }

  const handleInfoBannerHistoryData = () => {
    if (data) {
      setInfoBannerHistoryData((current) => {
        return [...current, data.id]
      })
    }
  }

  return (
    <Box position="fixed" bottom={20} left={{ base: 0, lg: 10 }} zIndex={10} paddingX={{ base: '10px', lg: 'unset' }}>
      <CardLayout
        background={'linear-gradient(85deg, #C4FFF4 0%, #FFFBE7 100%), var(--Colors-Default-White, #FFF)'}
        padding={5}
        position={'relative'}
        width={{ base: '100%', lg: '320px' }}
        borderRadius={'12px'}
      >
        <IconButton
          position="absolute"
          top={2}
          right={2}
          variant="ghost"
          aria-label="close"
          icon={<PiX />}
          color={lightModeColors.neutral1[11]}
          _hover={{ background: lightModeColors.neutral1[3] }}
          onClick={handleInfoBannerHistoryData}
        />

        <VStack w="full">
          <HStack w="full" alignItems={'center'}>
            <GeyserLogoIcon color={lightModeColors.neutral1[11]} />
            <Body size="lg" medium color={lightModeColors.neutral1[11]}>
              {data?.title}
            </Body>
          </HStack>
          <Body size="sm" color={lightModeColors.utils.text}>
            {data?.description}{' '}
            <Body as="span" color={lightModeColors.primary1[11]} onClick={handleInfoBannerHistoryData}>
              <Link isExternal href={data?.link} textDecoration={'underline'}>
                {data?.linkText}
              </Link>
            </Body>
          </Body>
        </VStack>
      </CardLayout>
    </Box>
  )
}
