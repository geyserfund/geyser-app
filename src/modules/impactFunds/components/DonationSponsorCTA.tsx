import {
  Box,
  Button,
  Flex,
  HStack,
  Link as ChakraLink,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router'

import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants'

type DonationSponsorCTAPropsType = {
  title: string
  description: string
  donateProjectName?: string
}

export const DonationSponsorCTA = ({ title, description, donateProjectName }: DonationSponsorCTAPropsType) => {
  const sponsorModal = useDisclosure()
  const highlightedSurfaceBg = useColorModeValue('primary1.50', 'primary1.700')
  const highlightedSurfaceBorderColor = useColorModeValue('primary1.200', 'primary1.600')
  const bodyTextColor = useColorModeValue('neutral1.9', 'neutral1.7')
  const titleTextColor = useColorModeValue('neutral1.11', 'neutral1.1')
  const secondaryTextColor = useColorModeValue('neutral1.8', 'neutral1.6')

  return (
    <>
      <Box
        p={8}
        bg={highlightedSurfaceBg}
        borderRadius="xl"
        borderWidth="1px"
        borderColor={highlightedSurfaceBorderColor}
      >
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'stretch', md: 'center' }}
          gap={6}
        >
          <VStack align="start" spacing={2} flex={1}>
            <H2 size="lg" bold>
              {title}
            </H2>
            <Body color={bodyTextColor}>{description}</Body>
          </VStack>
          <HStack spacing={3} flexShrink={0}>
            {donateProjectName && (
              <Button as={Link} to={getPath('fundingStart', donateProjectName)} size="lg" colorScheme="primary1">
                {t('Donate')}
              </Button>
            )}
            <Button size="lg" variant="outline" colorScheme="primary1" onClick={sponsorModal.onOpen}>
              {t('Become a Sponsor')}
            </Button>
          </HStack>
        </Flex>
      </Box>

      {/* Sponsor Modal */}
      <Modal isOpen={sponsorModal.isOpen} onClose={sponsorModal.onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('Become a Sponsor')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack align="stretch" spacing={5}>
              <Body color={bodyTextColor}>
                {t(
                  'Thank you for your interest in sponsoring this fund! We would love to discuss partnership opportunities with you.',
                )}
              </Body>

              <Box
                p={5}
                bg={highlightedSurfaceBg}
                borderRadius="lg"
                borderWidth="1px"
                borderColor={highlightedSurfaceBorderColor}
              >
                <VStack align="stretch" spacing={3}>
                  <Body fontWeight="semibold" color={titleTextColor}>
                    {t('Schedule a call with us')}
                  </Body>
                  <Body size="sm" color={bodyTextColor}>
                    {t(
                      'Book a time to speak with our team about sponsorship benefits, visibility opportunities, and how we can work together to support impactful projects.',
                    )}
                  </Body>
                  <Button
                    as={ChakraLink}
                    href="https://cal.com/metamick/thirtymin?overlayCalendar=true"
                    isExternal
                    colorScheme="primary1"
                    size="md"
                    mt={2}
                  >
                    {t('Schedule Call')}
                  </Button>
                </VStack>
              </Box>

              <Body size="sm" color={secondaryTextColor}>
                {t('You can also reach out to us directly at')} <strong>hello@geyser.fund</strong>
              </Body>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={sponsorModal.onClose}>
              {t('Close')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
