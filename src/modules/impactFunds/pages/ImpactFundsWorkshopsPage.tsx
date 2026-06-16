import { Box, Button, Flex, HStack, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiCaretRightBold } from 'react-icons/pi'
import { Link } from 'react-router'

import { Head } from '@/config/Head.tsx'
import { useImpactFundsDonateModal } from '@/modules/impactFunds/hooks/useImpactFundsDonateModal.tsx'
import {
  type ImpactFundDonateModalOpenOptions,
  WORKSHOPS_OPERATIONS_CATEGORY_ID,
} from '@/modules/impactFunds/utils/impactFundDonatePreferences.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H1, H2, H3 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { ImpactFundsFieldPartnerApplicationUrl } from '@/shared/constants/platform/url.ts'
import { UserExternalLinksComponent } from '@/shared/molecules/UserExternalLinks.tsx'
import { standardPadding } from '@/shared/styles/index.ts'

const openWorkshopsDonateOptions: ImpactFundDonateModalOpenOptions = {
  defaultCategoryIds: [WORKSHOPS_OPERATIONS_CATEGORY_ID],
}

const WORKSHOP_HERO_IMAGE_URL =
  'https://app.paper.design/file-assets/01KT2DBTZTEZXFBD7X82K0GAKQ/01KT9B8FMANZ6KR4BJWZ6F7W0V.jpg'
const AFRIBIT_WORKSHOP_DESCRIPTION =
  'Afribit workshop activity shows the next step after education: meeting entrepreneurs, capturing their stories, and helping local businesses become fundable campaigns.'
const BITCOIN_KAMPALA_WORKSHOP_VIDEO_URL = 'https://www.youtube.com/embed/LlnZiT4DpuY'
const workshopDecks = [
  {
    title: 'Bitcoin Crowdfunding Workshops - EN.pdf',
    description: 'English workshop deck',
    url: 'https://storage.googleapis.com/geyser-media/impact-funds/Bitcoin%20Crowdfunding%20Workshops%20-%20EN.pdf',
  },
  {
    title: 'Bitcoin Crowdfunding Workshops - ES.pdf',
    description: 'Spanish workshop deck',
    url: 'https://storage.googleapis.com/geyser-media/impact-funds/Bitcoin%20Crowding%20Workshops%20-%20ES.pdf',
  },
  {
    title: 'Bitcoin Crowdfunding Workshops - FR.pdf',
    description: 'French workshop deck',
    url: 'https://storage.googleapis.com/geyser-media/impact-funds/Bitcoin%20Crowdfunding%20Workshops%20-%20FR.pdf',
  },
] as const

type WorkshopColors = {
  pageBg: string
  surfaceBg: string
  mutedSurfaceBg: string
  darkSurfaceBg: string
  primaryText: string
  secondaryText: string
  borderColor: string
  accentText: string
  amberBg: string
}

export const ImpactFundsWorkshopsPage = () => {
  const { openDonateModal, donateModalElement } = useImpactFundsDonateModal()
  const onDonateClick = () => openDonateModal(openWorkshopsDonateOptions)
  const colors: WorkshopColors = {
    pageBg: useColorModeValue('white', 'utils.pbg'),
    surfaceBg: useColorModeValue('white', 'neutral1.3'),
    mutedSurfaceBg: useColorModeValue('#F5F6F6', 'neutral1.3'),
    darkSurfaceBg: useColorModeValue('#17120C', 'neutral1.1'),
    primaryText: useColorModeValue('black', 'neutral1.12'),
    secondaryText: useColorModeValue('#626872', 'neutral1.10'),
    borderColor: useColorModeValue('#E2E4E6', 'neutral1.5'),
    accentText: useColorModeValue('#3F8F7C', 'primary1.200'),
    amberBg: useColorModeValue('#F09A34', 'amber.9'),
  }

  return (
    <>
      <Head
        title={t('Crowdfunding Workshops')}
        description={t(
          'Help local communities understand Bitcoin fundraising, launch credible projects, and turn trusted local activity into fundable impact.',
        )}
        image={WORKSHOP_HERO_IMAGE_URL}
        url={`https://geyser.fund${getPath('discoveryImpactFundsWorkshops')}`}
      />

      {donateModalElement}

      <VStack align="stretch" spacing={0} bg={colors.pageBg} color={colors.primaryText} w="full">
        <WorkshopBreadcrumb colors={colors} />
        <HeroSection colors={colors} onDonateClick={onDonateClick} />
        <PageSection colors={colors}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 6, lg: 10 }}>
            <VStack align="flex-start" spacing={4}>
              <Eyebrow color={colors.accentText}>{t('What are workshops?')}</Eyebrow>
              <H2 size={{ base: '36px', lg: '52px' }} lineHeight={{ base: '42px', lg: '58px' }} bold>
                {t('A practical format for turning local trust into fundable projects.')}
              </H2>
            </VStack>
            <VStack align="flex-start" spacing={5}>
              <Body size={{ base: 'md', lg: '20px' }} lineHeight={{ base: '27px', lg: '31px' }} bold>
                {t(
                  'Workshops help Field Partners introduce Bitcoin fundraising, all-or-nothing campaigns, and reusable capital to local communities.',
                )}
              </Body>
              <Body
                size={{ base: 'md', lg: '18px' }}
                lineHeight={{ base: '27px', lg: '29px' }}
                color={colors.secondaryText}
              >
                {t(
                  'They are how trusted local leaders find credible initiatives, explain how Geyser works, support onboarding, and help projects prepare to raise funds on the ground.',
                )}
              </Body>
            </VStack>
          </SimpleGrid>
        </PageSection>

        <PageSection colors={colors} bg={colors.mutedSurfaceBg}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 6, lg: 10 }}>
            <VStack align="flex-start" spacing={3}>
              <Eyebrow color={colors.secondaryText}>{t('How they work')}</Eyebrow>
              <H2 size={{ base: '34px', lg: '44px' }} lineHeight={{ base: '40px', lg: '50px' }} bold>
                {t('We provide the workshop kit. You bring the community.')}
              </H2>
            </VStack>
            <Body size={{ base: 'md', lg: '19px' }} lineHeight={{ base: '27px', lg: '30px' }} bold>
              {t(
                'Field Partners use Geyser slides, local trust, and follow-up support to help credible projects launch campaigns and build contributor confidence.',
              )}
            </Body>
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} mt={{ base: 8, lg: 10 }}>
            <StepCard colors={colors} number="01" title="Run the workshop">
              {t('Use the Geyser crowdfunding slides to teach Bitcoin fundraising and all-or-nothing campaigns.')}
            </StepCard>
            <StepCard colors={colors} number="02" title="Onboard projects">
              {t('Help credible local initiatives create campaigns, tell their story, and prepare to raise funds.')}
            </StepCard>
            <StepCard colors={colors} number="03" title="Earn as they grow" isDark>
              {t('Get 10% of fundraisers you onboard, plus a 85k launch fee for eligible workshops.')}
            </StepCard>
          </SimpleGrid>
        </PageSection>

        <PageSection colors={colors} bg={colors.darkSurfaceBg}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 6, lg: 10 }} mb={{ base: 6, lg: 8 }}>
            <H2 size={{ base: '34px', lg: '44px' }} lineHeight={{ base: '40px', lg: '50px' }} bold color="white">
              {t('Watch workshops already happening on the ground.')}
            </H2>
            <Body size={{ base: 'md', lg: '19px' }} lineHeight={{ base: '27px', lg: '30px' }} color="whiteAlpha.800">
              {t(
                'Two field examples showing how local partners bring people together, teach Bitcoin crowdfunding, and move projects toward campaign readiness.',
              )}
            </Body>
          </SimpleGrid>
          <VStack align="stretch" spacing={6}>
            <WorkshopVideoCard
              colors={colors}
              eyebrow="Bitcoin Kampala"
              title="Crowdfunding workshop at Satoshi Hub."
              videoUrl={BITCOIN_KAMPALA_WORKSHOP_VIDEO_URL}
            >
              {t(
                'Students and community members learned Bitcoin crowdfunding, discussed local project ideas, and connected the workshop back to campaign creation on Geyser.',
              )}
            </WorkshopVideoCard>
            <WorkshopVideoCard colors={colors} eyebrow="Afribit" title="Kibera projects preparing to fundraise.">
              {t(AFRIBIT_WORKSHOP_DESCRIPTION)}
            </WorkshopVideoCard>
          </VStack>
        </PageSection>

        <PageSection colors={colors}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 6, lg: 10 }}>
            <VStack align="flex-start" spacing={4}>
              <Eyebrow color={colors.secondaryText}>{t('Host workshops')}</Eyebrow>
              <H2 size={{ base: '34px', lg: '44px' }} lineHeight={{ base: '40px', lg: '50px' }} bold>
                {t('Download the workshop presentations.')}
              </H2>
              <Body
                size={{ base: 'md', lg: '18px' }}
                lineHeight={{ base: '27px', lg: '29px' }}
                color={colors.secondaryText}
              >
                {t(
                  'Use these slides as a guide to teach Bitcoin crowdfunding, help projects prepare, and support credible local campaigns.',
                )}
              </Body>
            </VStack>
            <VStack align="stretch" spacing={4}>
              {workshopDecks.map((deck) => (
                <WorkshopDownloadRow key={deck.title} colors={colors} deck={deck} />
              ))}
            </VStack>
          </SimpleGrid>
        </PageSection>

        <PageSection colors={colors}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
            <CalloutCard colors={colors} title="Create a Crowdfunding Workshop." buttonText="Apply now" isAmber />
            <CalloutCard colors={colors} title="Fund a local workshop." buttonText="Donate" onClick={onDonateClick} />
          </SimpleGrid>
        </PageSection>

        <FooterSection />
      </VStack>
    </>
  )
}

const HeroSection = ({ colors, onDonateClick }: { colors: WorkshopColors; onDonateClick: () => void }) => (
  <Box
    w="100vw"
    maxW="100vw"
    position="relative"
    left="50%"
    right="50%"
    ml="-50vw"
    mr="-50vw"
    overflow="hidden"
    minH={dimensions.impactLendingHero.minHeight}
    bg={colors.darkSurfaceBg}
  >
    <Box
      position="absolute"
      inset={0}
      backgroundImage={`url('${WORKSHOP_HERO_IMAGE_URL}')`}
      backgroundPosition={{ base: 'center', lg: '78% 34%' }}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    />
    <Box
      position="absolute"
      inset={0}
      bg="linear-gradient(90deg, rgba(0,0,0,0.72), rgba(0,0,0,0.34), rgba(0,0,0,0.08))"
    />
    <Flex
      position="relative"
      w="full"
      maxW={`${dimensions.maxWidth + 24 * 2}px`}
      minH={dimensions.impactLendingHero.minHeight}
      mx="auto"
      px={standardPadding}
      py={{ base: 10, lg: 12 }}
      align="center"
    >
      <VStack align="flex-start" spacing="22px" maxW={{ base: 'full', lg: '760px' }}>
        <H1 size={{ base: '3xl', md: '4xl', lg: '48px' }} bold lineHeight={{ base: '1.12', lg: '54px' }} color="white">
          {t('Crowdfunding Workshops')}
        </H1>
        <Body size={{ base: 'md', lg: 'lg' }} medium lineHeight={{ base: '26px', lg: '28px' }} color="whiteAlpha.900">
          {t(
            'Help local communities understand Bitcoin fundraising, launch credible projects, and turn trusted local activity into fundable impact.',
          )}
        </Body>
        <HStack spacing={3} flexWrap="wrap" pt="8px">
          <Button
            as="a"
            href={ImpactFundsFieldPartnerApplicationUrl}
            target="_blank"
            rel="noreferrer"
            h="42px"
            borderRadius="6px"
            px="18px"
            bg="white"
            color={colors.darkSurfaceBg}
            fontSize="sm"
            fontWeight="600"
          >
            {t('Apply now')}
          </Button>
          <Button
            h="42px"
            borderRadius="6px"
            px="18px"
            bg="#F7931A"
            color={colors.darkSurfaceBg}
            fontSize="sm"
            fontWeight="600"
            onClick={onDonateClick}
            _hover={{ bg: '#F7931A' }}
          >
            {t('Donate')}
          </Button>
        </HStack>
      </VStack>
    </Flex>
  </Box>
)

const WorkshopBreadcrumb = ({ colors }: { colors: WorkshopColors }) => (
  <Box w="full" bg={colors.pageBg} py={{ base: 4, lg: 5 }}>
    <Box w="full" maxW={`${dimensions.maxWidth + 24 * 2}px`} mx="auto" px={standardPadding}>
      <HStack spacing={2} color={colors.secondaryText} flexWrap="wrap">
        <Body
          as={Link}
          to={getPath('discoveryImpactFunds')}
          size="xs"
          bold
          letterSpacing="0.18em"
          textTransform="uppercase"
          _hover={{ color: colors.primaryText }}
        >
          {t('Impact Fund')}
        </Body>
        <PiCaretRightBold size={11} />
        <Body
          as={Link}
          to={getPath('discoveryImpactFundsWorkshops')}
          size="xs"
          bold
          letterSpacing="0.18em"
          textTransform="uppercase"
          color={colors.primaryText}
          aria-current="page"
        >
          {t('Crowdfunding Workshop')}
        </Body>
      </HStack>
    </Box>
  </Box>
)

const PageSection = ({
  colors,
  children,
  bg,
  py = dimensions.impactLendingSection.paddingY,
  ...props
}: {
  colors: WorkshopColors
  children: React.ReactNode
  bg?: string
  py?: React.ComponentProps<typeof Box>['py']
} & Omit<React.ComponentProps<typeof Box>, 'py'>) => (
  <Box w="full" bg={bg || colors.pageBg} px={standardPadding} py={py} {...props}>
    <Box maxW={`${dimensions.maxWidth + 24 * 2}px`} mx="auto">
      {children}
    </Box>
  </Box>
)

const FooterSection = () => (
  <Box w="full" px={standardPadding} pb={{ base: 28, lg: 10 }}>
    <Box maxW={`${dimensions.maxWidth + 24 * 2}px`} mx="auto">
      <UserExternalLinksComponent />
    </Box>
  </Box>
)

const Eyebrow = ({ children, color }: { children: React.ReactNode; color: string }) => (
  <Body size="sm" bold color={color} textTransform="uppercase" letterSpacing="4px">
    {children}
  </Body>
)

const StepCard = ({
  colors,
  number,
  title,
  children,
  isDark,
}: {
  colors: WorkshopColors
  number: string
  title: string
  children: React.ReactNode
  isDark?: boolean
}) => (
  <VStack
    align="stretch"
    spacing={4}
    bg={isDark ? colors.darkSurfaceBg : colors.surfaceBg}
    color={isDark ? 'white' : colors.primaryText}
    borderRadius="4px"
    p={{ base: 6, lg: 7 }}
    minH="210px"
  >
    <Eyebrow color={isDark ? colors.amberBg : '#E75E4F'}>{number}</Eyebrow>
    <H3 size={{ base: '24px', lg: '28px' }} lineHeight={{ base: '30px', lg: '34px' }} bold>
      {t(title)}
    </H3>
    <Body size="md" lineHeight="26px" color={isDark ? 'whiteAlpha.800' : colors.secondaryText}>
      {children}
    </Body>
  </VStack>
)

const WorkshopVideoCard = ({
  colors,
  eyebrow,
  title,
  videoUrl,
  children,
}: {
  colors: WorkshopColors
  eyebrow: string
  title: string
  videoUrl?: string
  children: React.ReactNode
}) => (
  <Flex direction={{ base: 'column', lg: 'row' }} bg={colors.surfaceBg} p={{ base: 4, lg: 5 }} gap={{ base: 5, lg: 7 }}>
    <Flex
      position="relative"
      align="center"
      justify="center"
      bg="#111"
      minH={{ base: '220px', lg: '330px' }}
      flex={1.5}
    >
      {videoUrl ? (
        <Box
          as="iframe"
          src={videoUrl}
          title={t(title)}
          w="full"
          h="full"
          minH={{ base: '220px', lg: '330px' }}
          border="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <>
          <Flex align="center" justify="center" w="64px" h="46px" borderRadius="12px" bg="#F7CC45">
            <Box
              as="span"
              ml="4px"
              w="0"
              h="0"
              borderTop="10px solid transparent"
              borderBottom="10px solid transparent"
              borderLeft="16px solid #111"
            />
          </Flex>
          <Box position="absolute" bottom={4} left={4} bg="black" px={3} py={2}>
            <Body size="xs" bold color="white">
              {t(eyebrow)}
            </Body>
          </Box>
        </>
      )}
    </Flex>
    <VStack align="flex-start" justify="center" spacing={4} flex={0.9} py={{ base: 0, lg: 5 }}>
      <Eyebrow color="#E75E4F">{t(eyebrow)}</Eyebrow>
      <H3 size={{ base: '28px', lg: '34px' }} lineHeight={{ base: '34px', lg: '40px' }} bold>
        {t(title)}
      </H3>
      <Body size={{ base: 'md', lg: '18px' }} lineHeight={{ base: '26px', lg: '29px' }} color={colors.secondaryText}>
        {children}
      </Body>
    </VStack>
  </Flex>
)

const WorkshopDownloadRow = ({ colors, deck }: { colors: WorkshopColors; deck: (typeof workshopDecks)[number] }) => (
  <Flex
    align="center"
    justify="space-between"
    gap={4}
    borderWidth="1px"
    borderColor={colors.borderColor}
    p={{ base: 4, lg: 5 }}
  >
    <VStack align="flex-start" spacing={1}>
      <Body size="md" bold color={colors.primaryText}>
        {t(deck.title)}
      </Body>
      <Body size="sm" color={colors.secondaryText}>
        {t(deck.description)}
      </Body>
    </VStack>
    <Button
      as="a"
      href={deck.url}
      target="_blank"
      rel="noreferrer"
      bg={colors.darkSurfaceBg}
      color="white"
      borderRadius="0"
      px={7}
    >
      {t('Download')}
    </Button>
  </Flex>
)

const CalloutCard = ({
  colors,
  title,
  buttonText,
  onClick,
  isAmber,
}: {
  colors: WorkshopColors
  title: string
  buttonText: string
  onClick?: () => void
  isAmber?: boolean
}) => (
  <VStack
    align="flex-start"
    spacing={5}
    bg={isAmber ? '#F7CC45' : colors.darkSurfaceBg}
    color={isAmber ? colors.primaryText : 'white'}
    p={{ base: 6, lg: 8 }}
    minH="260px"
  >
    <Eyebrow color={isAmber ? colors.primaryText : colors.amberBg}>{isAmber ? t('Apply') : t('Donate')}</Eyebrow>
    <H2 size={{ base: '30px', lg: '38px' }} lineHeight={{ base: '36px', lg: '44px' }} bold>
      {t(title)}
    </H2>
    <Body size="md" lineHeight="26px" color={isAmber ? colors.primaryText : 'whiteAlpha.800'}>
      {isAmber
        ? t('For existing Geyser Field Partners ready to host, onboard projects, promote campaigns, and report impact.')
        : t(
            'Help Field Partners bring people together, teach Bitcoin fundraising, and turn promising local ideas into fundable projects.',
          )}
    </Body>
    {isAmber ? (
      <Button
        as="a"
        href={ImpactFundsFieldPartnerApplicationUrl}
        target="_blank"
        rel="noreferrer"
        mt="auto"
        bg={colors.darkSurfaceBg}
        color="white"
        borderRadius="0"
        px={7}
      >
        {t(buttonText)}
      </Button>
    ) : (
      <Button onClick={onClick} mt="auto" bg={colors.surfaceBg} color={colors.primaryText} borderRadius="0" px={7}>
        {t(buttonText)}
      </Button>
    )}
  </VStack>
)
