import { Link as ChakraLink, ListItem, UnorderedList, VStack } from '@chakra-ui/react'
import type { TFunction } from 'i18next'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Head } from '@/config/Head.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H1, H2 } from '@/shared/components/typography/Heading.tsx'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { getPath } from '@/shared/constants/config/routerPaths.ts'
import { standardPadding } from '@/shared/styles/reponsiveValues.ts'

type PrivacyPolicyContent = {
  collectedInformationItems: readonly string[]
  contributionInformationItems: readonly string[]
  useInformationItems: readonly string[]
  logFileItems: readonly string[]
  ccpaRightsItems: readonly string[]
  gdprRightsItems: readonly string[]
}

const getPrivacyPolicyContent = (t: TFunction): PrivacyPolicyContent => ({
  collectedInformationItems: [
    t('name'),
    t('email address'),
    t('the contents of the message and/or attachments you may send'),
  ],
  contributionInformationItems: [
    t('Rounded amount being contributed'),
    t('Day of contribution'),
    t('Reward selected'),
    t('Country of IP address'),
  ],
  useInformationItems: [
    t('Provide, operate, and maintain our website'),
    t('Improve, personalize, and expand our website'),
    t('Understand and analyze how you use our website'),
    t('Develop new products, services, features, and functionality'),
    t('Broadcast your data to external relays'),
    t(
      'Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes',
    ),
    t('Send you emails'),
    t('Find and prevent fraud'),
  ],
  logFileItems: [
    t('internet protocol (IP) addresses'),
    t('browser type'),
    t('Internet Service Provider (ISP)'),
    t('date and time stamp'),
    t('referring/exit pages'),
    t('possibly the number of clicks'),
  ],
  ccpaRightsItems: [
    t(
      "Request that a business that collects consumer's personal data disclose the categories and specific pieces of personal data collected",
    ),
    t('Request that a business delete any personal data collected about the consumer that a business has collected'),
  ],
  gdprRightsItems: [
    t('The right to access'),
    t('The right to rectification'),
    t('The right to erasure'),
    t('The right to restrict processing'),
    t('The right to object to processing'),
    t('The right to data portability'),
  ],
})

type PrivacyPolicySectionProps = {
  title: string
  children: ReactNode
}

const PrivacyPolicySection = ({ title, children }: PrivacyPolicySectionProps) => {
  return (
    <CardLayout w="full" gap={4}>
      <H2>{title}</H2>
      <VStack w="full" spacing={3} alignItems="stretch">
        {children}
      </VStack>
    </CardLayout>
  )
}

const PrivacyPolicyParagraph = ({ children }: { children: ReactNode }) => {
  return <Body lineHeight={1.7}>{children}</Body>
}

const PrivacyPolicyList = ({ items }: { items: readonly ReactNode[] }) => {
  return (
    <UnorderedList spacing={2} pl={5}>
      {items.map((item, index) => (
        <ListItem key={index}>
          <Body lineHeight={1.7}>{item}</Body>
        </ListItem>
      ))}
    </UnorderedList>
  )
}

/** Displays Geyser's Privacy Policy as a long-form legal page. */
export const PrivacyPolicyPage = () => {
  const { t } = useTranslation()
  const {
    ccpaRightsItems,
    collectedInformationItems,
    contributionInformationItems,
    gdprRightsItems,
    logFileItems,
    useInformationItems,
  } = useMemo(() => getPrivacyPolicyContent(t), [t])

  return (
    <>
      <Head
        title={t('Privacy Policy')}
        description={t("Read Geyser's Privacy Policy and how information is collected and used.")}
        url={`https://geyser.fund${getPath('legalPrivacy')}`}
      />

      <VStack
        w="full"
        maxWidth={`${dimensions.maxWidth + 24 * 2}px`}
        marginX="auto"
        paddingX={standardPadding}
        spacing={{ base: 4, lg: 6 }}
        alignItems="stretch"
        paddingBottom={10}
      >
        <CardLayout w="full" gap={3}>
          <H1>{t('Privacy Policy')}</H1>
          <PrivacyPolicyParagraph>
            {t(
              'At Geyser Fund, accessible from geyser.fund, we highly prioritize the privacy of our visitors and users. This Privacy Policy document contains types of information that is collected and recorded by Geyser Fund and how we use it.',
            )}
          </PrivacyPolicyParagraph>
          <PrivacyPolicyParagraph>
            {t(
              'If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at',
            )}{' '}
            <ChakraLink href="mailto:hello@geyser.fund" textDecoration="underline">
              hello@geyser.fund
            </ChakraLink>
            .
          </PrivacyPolicyParagraph>
          <PrivacyPolicyParagraph>
            {t(
              'This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Geyser Fund. This policy is not applicable to any information collected offline or via channels other than this website.',
            )}
          </PrivacyPolicyParagraph>
        </CardLayout>

        <PrivacyPolicySection title={t('Consent')}>
          <PrivacyPolicyParagraph>
            {t(
              'By using our website, you hereby consent to our Privacy Policy and agree to its terms described below.',
            )}
          </PrivacyPolicyParagraph>
        </PrivacyPolicySection>

        <PrivacyPolicySection title={t('Information we collect')}>
          <PrivacyPolicyParagraph>
            {t('Each user gets a notice prior to being asked to provide information regarding its purpose and reason.')}
          </PrivacyPolicyParagraph>
          <PrivacyPolicyParagraph>
            {t(
              'When you contact us directly, we may receive additional information about you including but not limited to',
            )}
            :
          </PrivacyPolicyParagraph>
          <PrivacyPolicyList items={collectedInformationItems} />
          <PrivacyPolicyParagraph>
            {t(
              'When you register for our services and/or open an Account, we may ask for your contact information, including items such as name and email address.',
            )}
          </PrivacyPolicyParagraph>
          <PrivacyPolicyParagraph>
            {t('When you contribute a project on Geyser, we collect the following information')}:
          </PrivacyPolicyParagraph>
          <PrivacyPolicyList items={contributionInformationItems} />
        </PrivacyPolicySection>

        <PrivacyPolicySection title={t('How we use your information')}>
          <PrivacyPolicyParagraph>
            {t('The information provided upon the consent of the users will be used for the following purposes')}:
          </PrivacyPolicyParagraph>
          <PrivacyPolicyList items={useInformationItems} />
        </PrivacyPolicySection>

        <PrivacyPolicySection title={t('Log Files')}>
          <PrivacyPolicyParagraph>
            {t(
              'As a hosting company, Geyser Fund follows a standard procedure of using log files within the scope of its hosting service analytics. The information collected by log files include',
            )}
            :
          </PrivacyPolicyParagraph>
          <PrivacyPolicyList items={logFileItems} />
          <PrivacyPolicyParagraph>
            {t(
              "No sensitive or personally identifiable information is collected within the scope of it. The data is used fot the purposes of analyzing trends, website administration, tracking users' movement on the website, and gathering demographic information.",
            )}
          </PrivacyPolicyParagraph>
        </PrivacyPolicySection>

        <PrivacyPolicySection title={t('Propagation of data over relays')}>
          <PrivacyPolicyParagraph>
            {t(
              'Geyser stores project and user data on a Nostr Relay and propagates information to other Nostr Relays in order for data to be accessible across clients. This means that your information will be broadcast to other Nostr Relays. The relays to which your data will be broadcast to are visible in your project settings.',
            )}
          </PrivacyPolicyParagraph>
        </PrivacyPolicySection>

        <PrivacyPolicySection title={t('Cookies and Web Beacons')}>
          <PrivacyPolicyParagraph>
            {t(
              "Like any other website, Geyser Fund uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited.",
            )}
          </PrivacyPolicyParagraph>
          <PrivacyPolicyParagraph>
            {t(
              "The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.",
            )}
          </PrivacyPolicyParagraph>
          <PrivacyPolicyParagraph>
            {t('For more general information on cookies, please read')}{' '}
            <ChakraLink href="https://www.generateprivacypolicy.com/#cookies" isExternal textDecoration="underline">
              {t('the Cookies article on Generate Privacy Policy website')}
            </ChakraLink>
            .
          </PrivacyPolicyParagraph>
        </PrivacyPolicySection>

        <PrivacyPolicySection title={t('Advertising Partners Privacy Policies')}>
          <PrivacyPolicyParagraph>
            {t(
              'You may consult this list to find the Privacy Policy for each of the advertising partners of Geyser Fund.',
            )}
          </PrivacyPolicyParagraph>
          <PrivacyPolicyParagraph>
            {t(
              'Note that Geyser Fund has no access to or control over cookies that are used by third-party advertisers.',
            )}
          </PrivacyPolicyParagraph>
        </PrivacyPolicySection>

        <PrivacyPolicySection title={t('Third Party Privacy Policies')}>
          <PrivacyPolicyParagraph>
            {t("Geyser Fund's Privacy Policy does not apply to other advertisers or websites.")}
          </PrivacyPolicyParagraph>
          <PrivacyPolicyParagraph>
            {t(
              'You can choose to disable cookies through your individual browser options. More detailed information about cookie management with specific web browsers can be found at the browsers respective websites.',
            )}
          </PrivacyPolicyParagraph>
        </PrivacyPolicySection>

        <PrivacyPolicySection title={t('CCPA Privacy Rights (Do Not Sell My Personal Information)')}>
          <PrivacyPolicyParagraph>
            {t('Under the CCPA, among other rights, California consumers have the right to request from a business')}:
          </PrivacyPolicyParagraph>
          <PrivacyPolicyList items={ccpaRightsItems} />
          <PrivacyPolicyParagraph>
            {t(
              'If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at',
            )}{' '}
            <ChakraLink href="mailto:hello@geyser.fund" textDecoration="underline">
              hello@geyser.fund
            </ChakraLink>
            .
          </PrivacyPolicyParagraph>
        </PrivacyPolicySection>

        <PrivacyPolicySection title={t('GDPR Data Protection Rights')}>
          <PrivacyPolicyParagraph>
            {t(
              'We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following',
            )}
            :
          </PrivacyPolicyParagraph>
          <PrivacyPolicyList items={gdprRightsItems} />
          <PrivacyPolicyParagraph>
            {t(
              'If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.',
            )}
          </PrivacyPolicyParagraph>
        </PrivacyPolicySection>

        <PrivacyPolicySection title={t("Children's Information")}>
          <PrivacyPolicyParagraph>
            {t(
              "Protection of children's rights and information is an integral part of our values. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.",
            )}
          </PrivacyPolicyParagraph>
          <PrivacyPolicyParagraph>
            {t(
              'Geyser Fund does not knowingly collect any Personal Identifiable Information from children under the age of 13.',
            )}
          </PrivacyPolicyParagraph>
        </PrivacyPolicySection>
      </VStack>
    </>
  )
}
