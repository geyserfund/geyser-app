import { Box, HStack, Icon, Link as ChakraLink, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowBendDownRightBold, PiCoinsBold, PiUsersThreeBold } from 'react-icons/pi'

import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'

type ImpactFundWhyDonateModalProps = {
  isOpen: boolean
  onClose: () => void
}

/** Explains how impact funds work and why sponsors donate into them. */
export const ImpactFundWhyDonateModal = ({ isOpen, onClose }: ImpactFundWhyDonateModalProps): JSX.Element => {
  const iconBg = useColorModeValue('primary1.100', 'primary1.900')
  const iconColor = useColorModeValue('primary1.700', 'primary1.300')
  const mutedTextColor = useColorModeValue('neutral1.9', 'neutral1.11')
  const cardBg = useColorModeValue('neutral1.2', 'neutral1.3')

  const items = [
    {
      icon: PiCoinsBold,
      title: t('What are Impact Funds?'),
      description: (
        <Body size="sm" color={mutedTextColor}>
          {t(
            'Impact Funds pool and distribute capital to the most promising and impactful Bitcoin projects. The focus is mainly on small to medium projects to help them get off the ground. Impact Funds aim to make it dead simple for anyone to contribute towards Bitcoin adoption.',
          )}
        </Body>
      ),
    },
    {
      icon: PiUsersThreeBold,
      title: t('How is funding distributed?'),
      description: (
        <Body size="sm" color={mutedTextColor}>
          {t(
            'Applications are reviewed by the fund moderators, and capital is allocated using one of four funding models: direct grant, capped matching, all-or-nothing co-funding or workshops.',
          )}{' '}
          <ChakraLink href="#impact-fund-funding-models" textDecoration="underline" onClick={onClose}>
            {t('Read more about each Funding Model')}
          </ChakraLink>
        </Body>
      ),
    },
    {
      icon: PiArrowBendDownRightBold,
      title: t('Why your donation matters'),
      description: (
        <Body size="sm" color={mutedTextColor}>
          {t(
            'Recurring donations increase the capital available for deployment and help each fund support more builders over time. More donations means more impact, which will be shared with all contributors in our impact reports.',
          )}
        </Body>
      ),
    },
    {
      icon: PiArrowBendDownRightBold,
      title: t('Why were impact funds created?'),
      description: (
        <Body size="sm" color={mutedTextColor}>
          {t(
            "There are a lot of projects that can push Bitcoin adoption forward around the world, but it's not always easy for them to get the necessary funding, as they might lack reputation or visibility. It is also difficult for contributors to do the vetting and decide which projects to trust. Operating Geyser has given us unique insights into vetting impactful projects and a broad network of both contributors and corporate partners. We created Impact Funds so you can easily support Bitcoin adoption without any effort.",
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
      title={t('Why donate to an Impact Fund?')}
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
