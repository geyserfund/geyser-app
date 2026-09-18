import { HStack, useColorModeValue } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiCaretDown } from 'react-icons/pi'

import { DonateNavMenuContent } from '@/modules/navigation/components/navDropdown/DonateNavMenuContent.tsx'
import { getAboutNavDropdownSections } from '@/modules/navigation/components/navDropdown/navDropdownItems.ts'
import { NavDropdownMenu } from '@/modules/navigation/components/navDropdown/NavDropdownMenu.tsx'

/** LandingDesktopNav renders Donate and About, aligned with the landing title. */
export const LandingDesktopNav = ({ transparentMode = false }: { transparentMode?: boolean }) => {
  const navButtonRadius = { base: '8px', lg: '10px' }
  const navButtonSize = { base: 'md', lg: 'lg' }
  const navButtonFontSize = { lg: 'sm', xl: 'md' }
  const navButtonPaddingX = { lg: 2, xl: 4 }

  const buttonColor = 'black'
  const defaultButtonHoverBackground = useColorModeValue('blackAlpha.50', 'neutral1.3')
  const buttonHoverBackground = transparentMode ? 'whiteAlpha.200' : defaultButtonHoverBackground
  const defaultButtonActiveBackground = useColorModeValue('blackAlpha.100', 'neutral1.2')
  const buttonActiveBackground = transparentMode ? 'whiteAlpha.300' : defaultButtonActiveBackground

  const aboutSections = getAboutNavDropdownSections(t)

  return (
    <HStack spacing={{ lg: 1, xl: 2 }} align="center" flexShrink={0}>
      <NavDropdownMenu
        label={t('Donate')}
        mode="desktop"
        renderContent={({ onNavigate }) => <DonateNavMenuContent onNavigate={onNavigate} />}
        menuProps={{
          minWidth: { base: 'auto', lg: 'min(1020px, calc(100vw - 24px))' },
          width: { base: 'calc(100vw - 16px)', lg: 'min(1020px, calc(100vw - 24px))' },
          maxWidth: 'calc(100vw - 16px)',
          px: { base: 4, lg: 6 },
          py: { base: 4, lg: 6 },
          zIndex: 200,
        }}
        triggerIcon={<PiCaretDown />}
        triggerProps={{
          variant: 'ghost',
          size: navButtonSize,
          color: buttonColor,
          borderRadius: navButtonRadius,
          fontSize: navButtonFontSize,
          fontWeight: 600,
          paddingX: navButtonPaddingX,
          flexShrink: 0,
          _hover: { backgroundColor: buttonHoverBackground },
          _active: { backgroundColor: buttonActiveBackground },
          _expanded: { backgroundColor: buttonHoverBackground },
        }}
      />

      <NavDropdownMenu
        label={t('About')}
        sections={aboutSections}
        mode="desktop"
        menuProps={{
          minWidth: '220px',
          width: 'max-content',
          maxWidth: '280px',
          px: 3,
          py: 3,
          zIndex: 200,
        }}
        triggerIcon={<PiCaretDown />}
        triggerProps={{
          variant: 'ghost',
          size: navButtonSize,
          color: buttonColor,
          borderRadius: navButtonRadius,
          fontSize: navButtonFontSize,
          fontWeight: 600,
          paddingX: navButtonPaddingX,
          flexShrink: 0,
          _hover: { backgroundColor: buttonHoverBackground },
          _active: { backgroundColor: buttonActiveBackground },
          _expanded: { backgroundColor: buttonHoverBackground },
        }}
      />
    </HStack>
  )
}
