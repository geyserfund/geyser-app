import { Box, Button, ButtonProps, Image } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { Link } from 'react-router'

import MarketplaceNavIcon from '@/assets/marketplace-nav.png'
import { NavigationNewBadge } from '@/shared/components/navigation/AnimatedNavSlide.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { CampaignIconUrl, FundraiserIconUrl, getPath, PathsMap, ProductsIconUrl } from '@/shared/constants/index.ts'

import { BottomNavBarContainer } from '../components/bottomNav'
import { currentBottomNavItemAtom } from './discoveryNavAtom'

export enum BottomNavItemKey {
  campaigns = 'campaigns',
  fundraisers = 'fundraisers',
  impactFunds = 'impactFunds',
  marketplace = 'marketplace',
}

export type BottomNavItem = {
  label: string
  key: BottomNavItemKey
  path: keyof PathsMap
  IconComponent: React.ReactNode
  new?: boolean
}

const imageDimension = { base: '40px', sm: '45px', md: '50px' }
const campaignImageDimension = { base: '46px', sm: '53px', md: '58px' }
const merchImageDimension = { base: '44px', sm: '49.5px', md: '55px' }
const iconSlotHeight = { base: '46px', sm: '53px', md: '58px' }

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
    IconComponent: <Image src={CampaignIconUrl} height={campaignImageDimension} width={campaignImageDimension} />,
  },
  {
    label: 'Shops',
    key: BottomNavItemKey.marketplace,
    path: 'discoveryProducts',
    IconComponent: <Image src={MarketplaceNavIcon} height={merchImageDimension} width={merchImageDimension} />,
  },
  {
    label: 'Impact Funds',
    key: BottomNavItemKey.impactFunds,
    path: 'discoveryImpactFunds',
    IconComponent: <Image src={ProductsIconUrl} height={imageDimension} width={imageDimension} />,
  },
] as BottomNavItem[]

export const DiscoveryBottomNav = () => {
  const currentNavItem = useAtomValue(currentBottomNavItemAtom)

  return (
    <BottomNavBarContainer spacing={1} w="full" marginX={0} padding={2} paddingBottom={3}>
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
      paddingY={1}
      minHeight={{ base: '72px', sm: '80px', md: '88px' }}
      height="auto"
      to={getPath(item.path)}
      isActive={isActive}
      justifyContent={'center'}
      alignItems="center"
      flexDirection="column"
      gap={0.5}
      fontSize={{ base: '12px', sm: '16px', md: '18px' }}
      {...rest}
      position="relative"
    >
      {item.new && <NavigationNewBadge position="absolute" top={-1} marginLeft={2} />}
      <Box display="flex" justifyContent="center" alignItems="center" w="full" h={iconSlotHeight}>
        {item.IconComponent}
      </Box>
      <Body fontWeight={600} textAlign="center" lineHeight="1">
        {t(item.label)}
      </Body>
    </Button>
  )
}
