import { Box, HStack, Icon, Link as ChakraLink, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowBendDownRightBold, PiCoinsBold, PiHandshakeBold, PiUsersThreeBold } from 'react-icons/pi'

import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'

type ImpactFundWhyDonateModalProps = {
  isOpen: boolean
  onClose: () => void
}

/** Explains how the Impact Fund works, how capital is allocated, and why donations matter. */
export function ImpactFundWhyDonateModal({ isOpen, onClose }: ImpactFundWhyDonateModalProps): JSX.Element {
  const iconBg = useColorModeValue('primary1.100', 'primary1.900')
  const iconColor = useColorModeValue('primary1.700', 'primary1.300')
  const mutedTextColor = useColorModeValue('neutral1.9', 'neutral1.11')
  const cardBg = useColorModeValue('neutral1.2', 'neutral1.3')

  const items = [
    {
      icon: PiCoinsBold,
      title: t('What is the Bitcoin Adoption Impact Fund?'),
      description: (
        <Body size="sm" color={mutedTextColor}>
          {t(
            'This is a single pooled fund focused on grassroots Bitcoin adoption and awareness. You grow the pool by making a one-time or recurring donation and choosing a region and/or category you want to support.',
          )}
        </Body>
      ),
    },
    {
      icon: PiHandshakeBold,
      title: t('How is funding distributed?'),
      description: (
        <Body size="sm" color={mutedTextColor}>
          {t(
            'Funds are deployed over time to local initiatives that promote Bitcoin adoption, awareness, and circulation. Initiatives are curated with a trust network of field partners who help source projects and keep allocations aligned with local needs.',
          )}{' '}
          <ChakraLink href="#impact-fund-how-it-works" textDecoration="underline" onClick={onClose}>
            {t('See how it works on this page')}
          </ChakraLink>
        </Body>
      ),
    },
    {
      icon: PiUsersThreeBold,
      title: t('Why your donation matters'),
      description: (
        <Body size="sm" color={mutedTextColor}>
          {t(
            'Your contribution increases deployable capital so the fund can sustain support for builders over time. Donors receive periodic impact reporting on how funds were distributed and the outcomes they helped enable.',
          )}
        </Body>
      ),
    },
    {
      icon: PiArrowBendDownRightBold,
      title: t('Why this fund exists'),
      description: (
        <Body size="sm" color={mutedTextColor}>
          {t(
            "Many projects that advance Bitcoin adoption still struggle with visibility and funding, while individual donors can find it hard to vet opportunities at scale. Geyser's experience reviewing projects—together with our contributor and partner networks—powers this fund so you can back adoption without doing diligence on every initiative yourself.",
          )}
        </Body>
      ),
    },
  ] as const

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      title={
        <>
          {t('Why donate to the Impact Fund')}
          ?
        </>
      }
      contentProps={{ maxW: { base: 'calc(100vw - 1.5rem)', lg: '720px' } }}
      bodyProps={{ gap: 4, alignItems: 'stretch' }}
    >
      <VStack spacing={3} align="stretch">
        {items.map((item) => (
          <Box key={item.title} bg={cardBg} borderRadius="xl" p={4}>
            <HStack align="start" spacing={3}>
              <Box
                w="40px"
                h="40px"
                borderRadius="lg"
                bg={iconBg}
                color={iconColor}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <Icon as={item.icon} boxSize={5} />
              </Box>
              <VStack align="stretch" spacing={1}>
                <Body bold>{item.title}</Body>
                {item.description}
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Modal>
  )
}
