import { Box, Button, ButtonProps, Image } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { Link } from 'react-router'

import { Body } from '@/shared/components/typography/Body.tsx'
import { CampaignIconUrl, FundraiserIconUrl, getPath, PathsMap, ProductsIconUrl } from '@/shared/constants/index.ts'
import { TitleHeaderGradient } from '@/shared/styles/custom.ts'

import { BottomNavBarContainer } from '../components/bottomNav'
import { currentBottomNavItemAtom } from './discoveryNavAtom'

export enum BottomNavItemKey {
  campaigns = 'campaigns',
  fundraisers = 'fundraisers',
  products = 'products',
}

export type BottomNavItem = {
  label: string
  key: BottomNavItemKey
  path: keyof PathsMap
  IconComponent: React.ReactNode
  new?: boolean
}

const imageDimension = { base: '40px', sm: '45px', md: '50px' }

export const bottomNavItems = [
  {
    label: 'Fundraisers',
    key: BottomNavItemKey.fundraisers,
    path: 'discoveryFundraisers',
    IconComponent: <Image src={FundraiserIconUrl} height={imageDimension} width={imageDimension} />,
  },
  {
    label: 'Campaigns',
    key: BottomNavItemKey.campaigns,
    path: 'discoveryCampaigns',
    IconComponent: <Image src={CampaignIconUrl} height={imageDimension} width={imageDimension} />,
    new: true,
  },
  {
    label: 'Shop',
    key: BottomNavItemKey.products,
    path: 'discoveryProducts',
    IconComponent: <Image src={ProductsIconUrl} height={imageDimension} width={imageDimension} marginRight={2} />,
  },
] as BottomNavItem[]

export const DiscoveryBottomNav = () => {
  const currentNavItem = useAtomValue(currentBottomNavItemAtom)

  return (
    <BottomNavBarContainer spacing={1} w="full" marginX={0}>
      {bottomNavItems.map((item) => {
        return <DiscoveryBottomNavButton key={item.label} item={item} currentNavItem={currentNavItem} />
      })}
    </BottomNavBarContainer>
  )
}

type DiscoveryBottomNavButtonProps = {
  item: BottomNavItem
  currentNavItem?: BottomNavItem
} & ButtonProps

const DiscoveryBottomNavButton = ({ item, currentNavItem, ...rest }: DiscoveryBottomNavButtonProps) => {
  const isActive = currentNavItem?.path === item.path

  return (
    <Button
      variant="menu"
      colorScheme="primary1"
      size="xl"
      flex={1}
      key={item.label}
      as={Link}
      paddingX={4}
      to={getPath(item.path)}
      isActive={isActive}
      justifyContent={'center'}
      fontSize={{ base: '12px', sm: '16px', md: '18px' }}
      {...rest}
      position="relative"
    >
      {item.new && (
        <Box
          position="absolute"
          top={-2}
          background={TitleHeaderGradient}
          borderRadius="10px"
          borderBottomLeftRadius="2px"
          padding="0px 6px 1px 6px"
          marginLeft={2}
        >
          <Body as="span" size="xs" fontWeight={700} color="black !important">
            {t('new')}
          </Body>
        </Box>
      )}
      {item.IconComponent} {t(item.label)}
    </Button>
  )
}
