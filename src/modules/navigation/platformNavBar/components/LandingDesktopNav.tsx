import { Badge, Box, Button, HStack, Menu, MenuButton, MenuList, Portal, SimpleGrid, VStack, useColorModeValue } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiCaretDown } from 'react-icons/pi'
import { Link } from 'react-router'

import { LandingSearchInput } from '@/modules/discovery/pages/landing/components/LandingSearchInput.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'

/** LandingDesktopNav renders the landing-specific desktop navigation cluster. */
export const LandingDesktopNav = () => {
  const buttonColor = useColorModeValue('gray.800', 'whiteAlpha.900')
  const menuBorderColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.300')
  const menuBackgroundColor = useColorModeValue('white', 'gray.800')
  const menuHoverColor = useColorModeValue('gray.50', 'whiteAlpha.100')
  const mutedColor = useColorModeValue('gray.700', 'gray.300')
  const disabledColor = useColorModeValue('blackAlpha.400', 'whiteAlpha.400')
  const newBadgeTextColor = useColorModeValue('gray.900', 'gray.900')
  const soonBadgeBackgroundColor = useColorModeValue('#d7d7d7', '#a3a3a3')
  const soonBadgeTextColor = useColorModeValue('#555555', '#4a4a4a')

  const donateItems = [
    {
      title: t('Fundraisers'),
      description: t('Browse ongoing causes and initiatives.'),
      to: getPath('discoveryFundraisers'),
    },
    {
      title: t('Impact Funds'),
      description: t('Fund a category through curated funds.'),
      to: getPath('discoveryImpactFunds'),
      badge: { label: t('new'), backgroundColor: '#58efd9', textColor: newBadgeTextColor },
    },
    {
      title: t('Campaigns'),
      description: t('Browse time-bound campaigns.'),
      to: getPath('discoveryCampaigns'),
    },
    {
      title: t('Micro-Lending'),
      description: t('Browse loans supporting small businesses.'),
      disabled: true,
      badge: { label: t('soon'), backgroundColor: soonBadgeBackgroundColor, textColor: soonBadgeTextColor },
    },
  ]

  const handleScrollToNews = () => {
    window.document.getElementById('landing-whats-happening')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <HStack flex={1} spacing={0} minWidth={0}>
      <HStack spacing={1} flexShrink={0} minWidth="290px" paddingLeft={{ lg: 2, xl: 3 }}>
        <Menu placement="bottom-start" strategy="fixed">
          <MenuButton
            as={Button}
            variant="ghost"
            color={buttonColor}
            borderRadius="full"
            fontSize="lg"
            fontWeight={400}
            minHeight="48px"
            paddingX={6}
            rightIcon={<PiCaretDown />}
          >
            {t('Donate')}
          </MenuButton>
          <Portal>
            <MenuList
              borderRadius="9px"
              overflow="hidden"
              p={4}
              minWidth="805px"
              borderColor={menuBorderColor}
              backgroundColor={menuBackgroundColor}
            >
              <SimpleGrid columns={2} columnGap={6} rowGap={2}>
                {donateItems.map((item) => {
                  const content = (
                    <VStack align="stretch" spacing={1} width="100%">
                      <HStack align="center" justify="flex-start" spacing={2}>
                        <Body
                          fontSize="lg"
                          dark={!item.disabled}
                          color={item.disabled ? disabledColor : undefined}
                          fontWeight={400}
                          lineHeight={1.2}
                        >
                          {item.title}
                        </Body>
                        {item.badge ? (
                          <Badge
                            px={2.5}
                            py={0.5}
                            minWidth="58px"
                            textAlign="center"
                            borderRadius="5px"
                            textTransform="lowercase"
                            fontSize="xs"
                            fontWeight={600}
                            backgroundColor={item.badge.backgroundColor}
                            color={item.badge.textColor}
                          >
                            {item.badge.label}
                          </Badge>
                        ) : null}
                      </HStack>
                      <Body
                        fontSize="sm"
                        color={item.disabled ? disabledColor : mutedColor}
                        fontWeight={300}
                        lineHeight={1.3}
                      >
                        {item.description}
                      </Body>
                    </VStack>
                  )

                  if (item.disabled) {
                    return (
                      <Box
                        key={item.title}
                        paddingX={4}
                        paddingY={3}
                        backgroundColor="transparent"
                        display="flex"
                        alignItems="flex-start"
                        justifyContent="flex-start"
                        cursor="not-allowed"
                        borderRadius="6px"
                      >
                        {content}
                      </Box>
                    )
                  }

                  return (
                    <Box
                      key={item.title}
                      as={Link}
                      to={item.to}
                      paddingX={4}
                      paddingY={3}
                      display="flex"
                      alignItems="flex-start"
                      justifyContent="flex-start"
                      backgroundColor="transparent"
                      borderRadius="6px"
                      _hover={{ backgroundColor: menuHoverColor }}
                      _focusVisible={{ backgroundColor: menuHoverColor }}
                      transition="background-color 0.15s ease"
                    >
                      {content}
                    </Box>
                  )
                })}
              </SimpleGrid>
            </MenuList>
          </Portal>
        </Menu>

        <Button
          as={Link}
          to={getPath('discoveryImpactFunds')}
          variant="ghost"
          color={buttonColor}
          borderRadius="full"
          fontSize="lg"
          fontWeight={400}
        >
          {t('Impact')}
        </Button>

        <Button
          variant="ghost"
          color={buttonColor}
          borderRadius="full"
          fontSize="lg"
          fontWeight={400}
          onClick={handleScrollToNews}
        >
          {t('News')}
        </Button>
      </HStack>

      <HStack flex={1} justify="center" minWidth={0}>
        <LandingSearchInput width={{ lg: '360px', xl: '420px' }} />
      </HStack>
    </HStack>
  )
}
