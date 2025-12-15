import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Image,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { t } from 'i18next'
import { useNavigate } from 'react-router'

import { useAuthContext } from '@/context/auth.tsx'
import { useAuthModal } from '@/modules/auth/hooks/useAuthModal.ts'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H2 } from '@/shared/components/typography/Heading.tsx'
import {
  AllOrNothingCampaignsStartingImageUrl,
  CampaignsComingSoonImageUrl,
  getPath,
} from '@/shared/constants/index.ts'
import { standardPadding } from '@/shared/styles/reponsiveValues.ts'

import { NewCampaigns } from './views/NewCampaigns.tsx'

export const CampaignsComingSoon = () => {
  const { isLoggedIn } = useAuthContext()

  const navigate = useNavigate()

  const { loginOnOpen } = useAuthModal()

  const handleLaunchCampaignButtonClick = () => {
    if (!isLoggedIn) {
      loginOnOpen({
        showLightning: false,
        noEmailPopup: true,
        showGoogle: false,
      })
    }

    navigate(getPath('launchProject'))
  }

  return (
    <VStack w="full" gap={10} paddingBottom={8} px={standardPadding}>
      <Stack w="full" gap={8} direction={{ base: 'column', lg: 'row' }} alignItems="center">
        <Image
          height="auto"
          width="full"
          maxWidth="400px"
          src={CampaignsComingSoonImageUrl}
          alt="Campaigns Coming Soon"
        />
        <VStack w="full" width="full" gap={1} alignItems="start">
          <H2 size={{ base: 'xl', lg: '2xl' }} bold textAlign="center">
            {t('Fund big ideas, only if they succeed')}
          </H2>

          <Body size="md">
            {t('All-or-Nothing on Bitcoin means creators get the funds only if they reach the goal.')}
            <br />
            {t('If you do not, contributors can claim their funds back.')}
          </Body>
        </VStack>
      </Stack>

      <VStack w="full" gap={6}>
        <H2 size={{ base: 'xl', lg: '3xl' }} bold>
          {t('Early Launches')}
        </H2>
        <VStack w="full" gap={3} align="stretch">
          <NewCampaigns />
        </VStack>
      </VStack>

      <Image
        height="auto"
        width="full"
        maxWidth="400px"
        src={AllOrNothingCampaignsStartingImageUrl}
        alt="Campaigns Coming Soon"
      />

      <VStack w="full" gap={2}>
        <H2 size="2xl" bold>
          {t('Join the early launches! ')}
        </H2>
        <Body size="lg" textAlign="center">
          {t('Create your campaign now and join the Early Launch projects.')}
          <br />
          {t('All or Nothing will be available for anyone in the coming months.')}
        </Body>
      </VStack>

      <Button size="xl" colorScheme="primary1" onClick={handleLaunchCampaignButtonClick}>
        {t('Launch your campaign')}
      </Button>

      <VStack w={'full'} alignItems="start">
        <H2 size={{ base: 'xl', lg: '2xl' }} bold>
          {t('All-or-Nothing on Bitcoin - FAQ')}
        </H2>
        <CardLayout w="full" dense>
          <Accordion w="full" allowMultiple>
            {FaqList.map((faq) => (
              <AccordionItem key={faq.question}>
                <AccordionButton>
                  <Body bold as="span" flex="1" textAlign="left">
                    {faq.question}
                  </Body>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4}>{faq.answer}</AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </CardLayout>
      </VStack>

      <VStack w="full" maxW="800px">
        <H2 size={{ base: 'xl', lg: '2xl' }} bold>
          {t('Powered by')}
        </H2>
        <Image
          src={'https://storage.googleapis.com/geyser-projects-media/app/campaigns/rootstock_image.png'}
          height="60px"
          width="auto"
          alt="All or Nothing"
        />
      </VStack>
    </VStack>
  )
}

const FaqList = [
  {
    question: t('What is All-or-Nothing on Bitcoin?'),
    answer: t(
      'All-or-Nothing is a funding option where your project only receives the funds if you reach your goal by the deadline. If you do not reach the goal, contributors get their money back. It helps creators and supporters commit to a clear outcome.',
    ),
  },
  {
    question: t('How does it work?'),
    answer: t(
      ' You set a funding goal and a timeline. People contribute during your campaign, but the funds only go to you if the goal is met in time. If the goal is not met, all contributions are refunded to supporters automatically.',
    ),
  },
  {
    question: t('What types of projects could make use of All-or-Nothing?'),
    answer: t(
      'All-or-Nothing is great for projects that need a clear minimum amount to deliver, like product builds, events, documentary or media production, community spaces, open-source releases, or any milestone-based work. If your project cannot realistically move forward without hitting a specific budget, All-or-Nothing is the right fit.',
    ),
  },
  {
    question: t('How do I launch it?'),
    answer: t(
      ' Go to https://geyser.fund/launch and launch your project. You can already do this now, but we are in the Early Launches period, so we will only be launching a select number of projects at first.',
    ),
  },
  {
    question: t('Can I launch it without Bitcoin?'),
    answer: t(
      'Yes. You can launch without adding a bitcoin address upfront. If your project gets funded, you can add a bitcoin address afterward to receive the funds.',
    ),
  },
  {
    question: t('Which countries can one launch from?'),
    answer: t(
      ' Because All-or-Nothing is non-custodial, you can launch from most countries. The full list of supported countries is available in the guides.',
    ),
  },
  {
    question: t('What happens if I launch a project and I fail?'),
    answer: t('If you do not reach your goal by the deadline, all funds are returned to contributors.'),
  },
  {
    question: t('How do I get a refund?'),
    answer: t(
      'If you contributed to an All-or-Nothing project that is still live, you can request a refund at any time by going to the Project page.',
    ),
  },
  {
    question: t('What happens if I do not ask for a refund or withdraw the funds?'),
    answer: t(
      'After 60 days, unclaimed funds are automatically added to the Impact Fund. The Impact Fund supports projects on Geyser that enable Bitcoin adoption.',
    ),
  },
  {
    question: t('Where can I get more information?'),
    answer: t(' Check the guides for step-by-step instructions, eligibility details, and best practices.'),
  },
  {
    question: t('What’s the difference between All-or-Nothing and flexible funding?'),
    answer: t(
      'With All-or-Nothing, you only receive funds if you hit your goal before the deadline. If you do not hit it, contributors are refunded. With Direct Fundraisers, you keep whatever you raise even if you do not reach your goal. ',
    ),
  },
  {
    question: t('How long can my campaign run?'),
    answer: t(
      'Campaign length is flexible (1 day to 2 months). You choose a timeline that makes sense for your community and your goal. Shorter campaigns create urgency, longer campaigns give more time to rally support. Exact limits and recommendations are in the guides.',
    ),
  },
  {
    question: t('When exactly do I receive the funds if I succeed?'),
    answer: t(
      'As soon as you hit your goal, you can claim the funds immediately. It is not automatic - you need to actively withdraw them from your project dashboard.',
    ),
  },
  {
    question: t('What currencies are supported for funding?'),
    answer: t(
      'Right now All-or-Nothing supports Lightning, and on-chain BTC only. If you want additional currency display or options, let us know - feedback helps shape what we build next.',
    ),
  },
  {
    question: t('Can I run multiple All-or-Nothing campaigns at once?'),
    answer: t('Yes. You can launch and run multiple All-or-Nothing projects at the same time.'),
  },
  {
    question: t('How do I know if my campaign is successful?'),
    answer: t(
      'You can see the progress of your campaign in real-time on the project page. You will also receive a notification when your campaign reaches its goal.',
    ),
  },
  {
    question: t('Who do I contact if I need help or something goes wrong?'),
    answer: t('Email support@geyser.fund and the team will help you out.'),
  },
]
