import { HStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { fetchFeaturedWalletsData } from '@/api/airtable.ts'
import { useGetUserIpCountryQuery } from '@/types/generated/graphql.ts'

import { RenderSponsorImage } from './RenderSponsorImage.tsx'

type AirtableResponse = {
  records: Array<{
    id: string
    createdTime: string
    fields: FeaturedWallet
  }>
}

type FeaturedWallet = {
  id: number
  countryCode: string
  name: string
  imageUrl: string
  imageUrlDark: string
  url: string
}

const GLOBAL_COUNTRY_CODE = 'global'

export const RenderSponsorFromTable = () => {
  const [totalWalletList, setTotalWalletList] = useState<FeaturedWallet[]>([])
  const [featuredWalletList, setFeaturedWalletList] = useState<FeaturedWallet[]>([])

  const { data: userIpCountryData } = useGetUserIpCountryQuery()

  useEffect(() => {
    fetchFeaturedWalletsData().then((data: AirtableResponse) => {
      // Transform the Airtable response to our FeaturedWallet format
      const wallets = data.records.map((record) => ({
        ...record.fields,
      }))
      setTotalWalletList(wallets)
    })
  }, [])

  useEffect(() => {
    if (userIpCountryData?.userIpCountry && totalWalletList.length > 0) {
      const filteredWallets = totalWalletList.filter(
        (wallet) =>
          (userIpCountryData.userIpCountry && wallet.countryCode.includes(userIpCountryData.userIpCountry)) ||
          wallet.countryCode === GLOBAL_COUNTRY_CODE,
      )
      setFeaturedWalletList(filteredWallets)
    } else {
      const filteredWallets = totalWalletList.filter((wallet) => wallet.countryCode === GLOBAL_COUNTRY_CODE)
      setFeaturedWalletList(filteredWallets)
    }
  }, [userIpCountryData, totalWalletList])

  console.log('checking userIpCountryData', userIpCountryData)

  return (
    <HStack width={'full'} justifyContent={'flex-start'} spacing={'10px'} flexWrap="wrap">
      {featuredWalletList.map((wallet) => {
        return (
          <RenderSponsorImage
            key={wallet.name}
            url={wallet.url}
            imageUrl={wallet.imageUrl}
            imageUrlDark={wallet.imageUrlDark}
            backgroundColor="transparent"
            padding={`${wallet.name}`.toLowerCase().includes('speed') ? '8px' : '0px'}
            alt={`${wallet.name} sponsor image`}
          />
        )
      })}
    </HStack>
  )
}
