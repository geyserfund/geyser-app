import { Box, Divider, HStack, Icon, Link as ChakraLink, MenuItem, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { Fragment } from 'react'
import type { IconType } from 'react-icons'
import { PiArrowUpRight, PiHandHeart, PiHandshake, PiHouse, PiRocket, PiStack, PiUserCircle } from 'react-icons/pi'
import { Link } from 'react-router'

import { useAuthContext } from '@/context'
import { LandingSearchInput } from '@/modules/discovery/pages/landing/components/LandingSearchInput.tsx'
import { myProjectsActivityDotAtom } from '@/modules/discovery/state/activityDotAtom'
import {
  getAboutNavDropdownSections,
  getDonateNavDropdownSections,
} from '@/modules/navigation/components/navDropdown/navDropdownItems.ts'
import { Body } from '@/shared/components/typography'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { FAQUrl, getPath, GeyserHackathonsUrl, ImpactFundsFieldPartnerApplicationUrl } from '@/shared/constants/index.ts'

import type { NavDropdownMenuItem, NavDropdownMenuSection } from '../../components/navDropdown/NavDropdownMenu.tsx'
import { ModeChange } from './components/ModeChange'

const HAMBURGER_ICON_SIZE = '18px'
const HAMBURGER_ICON_COLOR = 'black'

type ProfileNavContentProps = {
  onNavigate?: () => void
  showSearch?: boolean
}

type MobileNavigationItem = {
  emphasized?: boolean
  href?: string
  icon: IconType
  label: string
  path?: string
}

export const ProfileNavContent = ({ onNavigate, showSearch = false }: ProfileNavContentProps) => {
  const { logout, user, isLoggedIn } = useAuthContext()

  const myProjectActivityDot = useAtomValue(myProjectsActivityDotAtom)
  const donateSections = getDonateNavDropdownSections(t)
  const aboutSections = getAboutNavDropdownSections(t).map((section) => ({
    ...section,
    items: section.items
      .filter((item) => !item.to?.includes('#field-partners') && !item.to?.includes('#impact'))
      .map((item) => ({ ...item, trailingIcon: undefined })),
  }))
  const hamburgerSections = [...donateSections, ...aboutSections]
  const mobileNavigationItems: MobileNavigationItem[] = [
    { label: 'Home', path: getPath('discoveryLanding'), icon: PiHouse },
    { label: 'My projects', path: getPath('discoveryMyProjects'), icon: PiRocket },
    {
      label: 'Support Geyser',
      path: getPath('fundingStart', 'geyser'),
      icon: PiHandHeart,
      emphasized: true,
    },
    { label: 'Become a Field Partner', href: ImpactFundsFieldPartnerApplicationUrl, icon: PiHandshake },
  ]

  return (
    <VStack
      padding={4}
      width={dimensions.mobileSideNav.width}
      spacing={4}
      alignItems={'start'}
      justifyContent={'start'}
      height="100%"
    >
      <VStack w="full" spacing={4}>
        {showSearch ? (
          <Box w="full">
            <LandingSearchInput width="full" />
          </Box>
        ) : null}
        <VStack spacing={2} w="full">
          {isLoggedIn && (
            <MenuItem as={Link} to={getPath('heroProfile', user.heroId)} onClick={onNavigate}>
              <HStack position="relative">
                <Icon as={PiUserCircle} boxSize={HAMBURGER_ICON_SIZE} color={HAMBURGER_ICON_COLOR} />
                <Body size="md">{t('Profile')}</Body>
              </HStack>
            </MenuItem>
          )}

          {mobileNavigationItems.map((item) => {
            const activityDot = item.label === 'My projects' ? myProjectActivityDot : false
            const itemContent = (
              <HStack position="relative" w="full" justify="space-between" spacing={3}>
                <HStack spacing={2.5}>
                  <Icon as={item.icon} boxSize={HAMBURGER_ICON_SIZE} color={HAMBURGER_ICON_COLOR} />
                  <Body size="md">{t(item.label)}</Body>
                </HStack>
                {activityDot ? (
                  <Box
                    position="absolute"
                    top={2}
                    right={'-4'}
                    borderRadius="50%"
                    backgroundColor="error.9"
                    height="6px"
                    width="6px"
                  />
                ) : null}
              </HStack>
            )
            const itemStyle = item.emphasized
              ? {
                  backgroundColor: 'primary1.3',
                  borderRadius: 'lg',
                  _hover: { backgroundColor: 'primary1.4' },
                }
              : undefined

            if (item.href) {
              return (
                <MenuItem
                  key={item.label}
                  as={ChakraLink}
                  href={item.href}
                  isExternal
                  onClick={onNavigate}
                  {...itemStyle}
                >
                  {itemContent}
                </MenuItem>
              )
            }

            return (
              <MenuItem key={item.label} as={Link} to={item.path} onClick={onNavigate} {...itemStyle}>
                {itemContent}
              </MenuItem>
            )
          })}
        </VStack>
        <Divider borderColor="neutral1.6" />
        <SideNavigationSections sections={hamburgerSections} onNavigate={onNavigate} />
        {isLoggedIn ? (
          <>
            <Divider borderColor="neutral1.6" />

            <VStack spacing={2} w="full">
              <MenuItem as={Link} to={getPath('userProfileSettings', user.id)} onClick={onNavigate}>
                <Body size="md">{t('Profile settings')}</Body>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onNavigate?.()
                  logout()
                }}
              >
                <Body size="md">{t('Sign Out')}</Body>
              </MenuItem>
            </VStack>
          </>
        ) : null}

        <Divider borderColor="neutral1.6" />

        <MenuItem
          as={ChakraLink}
          href="/newsletter"
          onClick={() => {
            onNavigate?.()
          }}
        >
          <Body size="md">{t('Subscribe')}</Body>
        </MenuItem>
        <MenuItem as={ChakraLink} isExternal href={FAQUrl} _focusVisible={{}} gap={2}>
          <Body size="md">{t('FAQ')}</Body>
          <Icon as={PiArrowUpRight} boxSize={HAMBURGER_ICON_SIZE} color={HAMBURGER_ICON_COLOR} />
        </MenuItem>
        <MenuItem as={ChakraLink} isExternal href={GeyserHackathonsUrl} _focusVisible={{}} gap={2}>
          <Body size="md">{t('Hackathons')}</Body>
          <Icon as={PiArrowUpRight} boxSize={HAMBURGER_ICON_SIZE} color={HAMBURGER_ICON_COLOR} />
        </MenuItem>
        <MenuItem as={Link} to={getPath('discoveryProjects')} onClick={onNavigate}>
          <HStack spacing={2.5}>
            <Icon as={PiStack} boxSize={HAMBURGER_ICON_SIZE} color={HAMBURGER_ICON_COLOR} />
            <Body size="md">{t('Browse legacy projects')}</Body>
          </HStack>
        </MenuItem>
      </VStack>

      <VStack w="full" spacing={4}>
        <Divider borderColor="neutral1.6" />

        <ModeChange />
      </VStack>
    </VStack>
  )
}

const SideNavigationSections = ({
  sections,
  onNavigate,
}: {
  sections: NavDropdownMenuSection[]
  onNavigate?: () => void
}) => (
  <VStack w="full" spacing={4} align="stretch">
    {sections.map((section, sectionIndex) => (
      <Fragment key={section.title ?? `section-${sectionIndex}`}>
        {sectionIndex > 0 ? <Divider borderColor="neutral1.6" /> : null}
        <VStack w="full" spacing={2} align="stretch">
          {section.items.map((item: NavDropdownMenuItem) => {
            const itemContent = (
              <HStack spacing={2.5} width="full">
                {item.leadingIcon ? (
                  <Icon as={item.leadingIcon} boxSize={HAMBURGER_ICON_SIZE} color={HAMBURGER_ICON_COLOR} />
                ) : null}
                <Body size="md">{item.title}</Body>
                {item.trailingIcon ? (
                  <Icon as={item.trailingIcon} boxSize={HAMBURGER_ICON_SIZE} color={HAMBURGER_ICON_COLOR} />
                ) : null}
              </HStack>
            )

            return item.href ? (
              <MenuItem key={item.title} as={ChakraLink} href={item.href} isExternal onClick={onNavigate}>
                {itemContent}
              </MenuItem>
            ) : (
              <MenuItem key={item.title} as={Link} to={item.to} onClick={onNavigate}>
                {itemContent}
              </MenuItem>
            )
          })}
        </VStack>
      </Fragment>
    ))}
  </VStack>
)
