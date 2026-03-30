import { Link as ChakraLink, ListItem, OrderedList, UnorderedList, VStack } from '@chakra-ui/react'
import type { TFunction } from 'i18next'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Head } from '@/config/Head.tsx'
import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { Body, H1, H2, H3 } from '@/shared/components/typography/index.ts'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { getPath } from '@/shared/constants/index.ts'
import { standardPadding } from '@/shared/styles/index.ts'

const EFFECTIVE_DATE = 'March 27, 2026'

type TermsContent = {
  ambassadorEarningsItems: readonly string[]
  contentLicenseItems: readonly string[]
  creatorRemedies: readonly string[]
  feeItems: readonly string[]
  ourRightsItems: readonly string[]
  prohibitedSiteActions: readonly string[]
  systemActions: readonly string[]
}

const getTermsContent = (t: TFunction): TermsContent => ({
  prohibitedSiteActions: [
    t(
      "Don't break the law. Don't take any action that infringes or violates other people's rights, violates the law, or breaches any contract or legal duty you have toward anyone.",
    ),
    t(
      "Don't launch projects that are prohibited or subject to regulatory restrictions that you have not complied with. It is your responsibility to ensure that your project's subject and purpose adhere to Geyser's policies, rules, and guidelines, as well as any applicable laws, statutes, ordinances, or regulations.",
    ),
    t(
      "Don't victimize anyone. Don't do anything threatening, abusive, harassing, defamatory, libelous, tortious, obscene, profane, or invasive of another person's privacy.",
    ),
    t(
      "Don't spam. Don't distribute unsolicited or unauthorized advertising or promotional material, or any junk mail, spam, or chain letters.",
    ),
    t(
      "Don't lie to people. Don't post information you know is false, misleading, or inaccurate. Don't do anything deceptive or fraudulent.",
    ),
    t(
      "Don't offer prohibited items or services. Don't offer any rewards that are illegal or subject to regulatory restrictions that you have not complied with. It is your responsibility to ensure that rewards are offered in full compliance with all Geyser policies, rules, and guidelines, as well as any applicable laws, statutes, ordinances, or regulations.",
    ),
    t(
      "Don't scam. Use of the Services to facilitate scams or deception is strictly prohibited, including, but not limited to, the promotion of altcoins or non-bitcoin crypto tokens. Geyser is a Bitcoin-only platform, and this will be enforced.",
    ),
    t(
      "Don't offer or accept loans or financial instruments. Don't promise refund or any return, interest, securities, shares, bonds and other financial instruments in exchange for a donation.",
    ),
    t(
      "Don't launch projects that are located in conflict zones. Avoid launching projects that may result in, or be deemed to result in financing war, terrorist organisations, criminal activity or violence.",
    ),
    t(
      "Don't harm anyone's computer. Don't distribute software viruses, or anything else (code, films, programs) designed to interfere with the proper function of any software, hardware, or equipment on the Site (whether it belongs to Geyser or another party).",
    ),
    t(
      "Don't abuse other users' personal information. When you use Geyser - and especially if you create a successful project - you may receive information about other users, including things like their names, email addresses, and postal addresses. This information is provided for the purpose of participating in a Geyser project: don't use it for other purposes, and don't abuse it.",
    ),
  ],
  systemActions: [
    t("Don't try to interfere with the proper workings of the Services."),
    t("Don't bypass any measures we've put in place to secure the Services."),
    t(
      "Don't try to damage or get unauthorized access to any system, data, password, or other information, whether it belongs to Geyser or another party.",
    ),
    t(
      "Don't take any action that imposes an unreasonable load on our infrastructure, or on our third-party providers. (We reserve the right to determine what's reasonable.)",
    ),
    t(
      'Don\'t use any kind of software or device (whether it\'s manual or automated) to "crawl" or "spider" any part of the Site.',
    ),
    t(
      "Don't take apart or reverse engineer any aspect of Geyser in an effort to access things like source code, underlying ideas, or algorithms.",
    ),
  ],
  creatorRemedies: [
    t(
      'They post an update that explains what work has been done, how funds were used, and what prevents them from finishing the project as planned',
    ),
    t(
      "They work diligently and in good faith to bring the project to the best possible conclusion in a timeframe that's communicated to contributors",
    ),
    t(
      "They're able to demonstrate that they've used funds appropriately and made every reasonable effort to complete the project as promised",
    ),
    t("They've been honest, and have made no material misrepresentations in their communication to contributors"),
    t(
      'They offer to return any remaining funds to contributors who have not received their reward (in proportion to the amounts pledged), or else explain how those funds will be used to complete the project in some alternate form.',
    ),
  ],
  feeItems: [
    t('We will charge a 5% fee from any contribution made to a project that uses a lightning address.'),
    t(
      'We will apply a +10% fee from any project that enlists into our Promotions Network, a portion of which goes automatically to the promoter.',
    ),
    t(
      'Fees may also be charged in the event that the contribution is made via on-chain transaction to a project using a lightning address. Such fees may vary and will depend on the current fees in the Bitcoin main network and fees of third party services relating to on-chain payments to a lightning address.',
    ),
    t(
      "You're responsible for paying any additional fees or taxes associated with your bitcoin activity, such as on-chain fees or lightning routing fees.",
    ),
  ],
  ambassadorEarningsItems: [
    t('Ambassador Earnings is an optional program and may be modified, paused, or discontinued by Geyser at any time.'),
    t('Participation in the program constitutes acceptance of these terms.'),
    t('Geyser does not guarantee any level of earnings or continued availability of rewards.'),
    t('Projects may opt in or out of Ambassador Earnings at any time, which may affect eligibility for rewards.'),
    t(
      'Users must not engage in self-referrals, fraudulent activity, spam, misrepresentation of projects, false claims, promises of financial returns, or any behavior intended to manipulate the system or mislead contributors.',
    ),
    t(
      'Geyser reserves the right to withhold or revoke rewards in cases of suspected abuse or violation of these terms.',
    ),
    t('Users are responsible for complying with applicable laws and regulations in their jurisdiction.'),
    t('Geyser is not liable for any losses, damages, or disputes arising from participation in the program.'),
  ],
  contentLicenseItems: [
    t(
      'Geyser has no obligation to review your content. Geyser may, but will not have any obligation to, review, monitor, display, post, store, maintain, accept, or otherwise make use of, any of your Content.',
    ),
    t(
      "We can use the Content you've submitted. You grant to us, and others acting on our behalf, the worldwide, non-exclusive, perpetual, irrevocable, royalty-free, sublicensable, transferable right to use, exercise, commercialize, and exploit the copyright, publicity, trademark, and database rights with respect to your Content. In general, we use this Content to promote projects and showcase our community on the website.",
    ),
    t(
      'Geyser may reject and remove Content. Geyser may, in its sole discretion, reject, delete, move, re-format, remove, or refuse to post or otherwise make use of UGC without notice or any liability to you or any third-party in connection with our operation of Content venues in an appropriate manner.',
    ),
    t(
      'When we use the Content, we can make changes, like editing or translating it. You grant us the right to edit, modify, reformat, excerpt, delete, or translate any of your Content.',
    ),
    t(
      "You won't submit stuff you don't hold the copyright for (unless you have permission). Your Content will not contain third-party copyrighted material, or material that is subject to other third-party proprietary rights, unless you have permission from the rightful owner of the material, or you are otherwise legally entitled to post the material (and to grant Geyser all the license rights outlined here).",
    ),
    t(
      'Any royalties or licensing on your Content are your responsibility. You will pay all royalties and other amounts owed to any person or entity based on your Content, or on Geyser hosting of that Content.',
    ),
    t(
      "You promise that if we use your Content, we're not violating anyone's rights or copyrights. If Geyser or its users exploit or make use of your submission in the ways contemplated in this agreement, you promise that this will not infringe or violate the rights of any third party, including (without limitation) any privacy rights, publicity rights, copyrights, contract rights, or any other intellectual property or proprietary rights.",
    ),
    t(
      "You're responsible for the stuff you post. All information submitted to the Site, whether publicly posted or privately transmitted, is the sole responsibility of the person from whom that Content originated.",
    ),
    t(
      "We're not responsible for mistakes in your Content. Geyser will not be liable for any errors or omissions in any Content.",
    ),
  ],
  ourRightsItems: [
    t('We can make changes to the Geyser Site and Services without notice or liability.'),
    t(
      "We have the right to decide who's eligible to use Geyser. We may in limited circumstances impose restrictions or limitations on accounts, or - for particularly significant or repeated violations of our Terms or any other rules on the Site, we may cancel accounts or decline to offer our Services. (Especially if you're abusing them.) We can change our eligibility criteria at any time. If these things are prohibited by law where you live, then we revoke your right to use Geyser in that jurisdiction.",
    ),
    t('We have the right to cancel any pledge to any project, at any time and for any reason.'),
    t(
      "We reserve the right to review any project before or after its launch and to refuse to publish it or take it down later. We might ask you for more details or documents about the project, the people behind it, and anyone else involved. If you don't provide the information we ask for within the specified time, we might have to remove your project.",
    ),
    t(
      'We have the right to reject, cancel, interrupt, remove, or suspend any project at any time if it violates our Terms, if a court or public authority demands such action, if the project involves a country, state, item, or activity that is subject to sanctions or regulations, if any third-party claims are raised in relation to the project against us, contributors, or creators, or if there is any other valid reason to do so in order to avoid or mitigate legal, financial or reputational risk.',
    ),
    t(
      'We reserve the right to take any other actions related to the project that we deem necessary to ensure our compliance with applicable laws.',
    ),
    t(
      'We have a right to temporarily suspend the availability of the Service due to technical reasons, including, without limitation, maintenance, renovation, updating, or upgrading of the platform.',
    ),
  ],
})

type TermsSectionProps = {
  title: string
  children: ReactNode
}

const TermsSection = ({ title, children }: TermsSectionProps) => {
  return (
    <CardLayout w="full" gap={4}>
      <H2>{title}</H2>
      <VStack w="full" spacing={3} alignItems="stretch">
        {children}
      </VStack>
    </CardLayout>
  )
}

const TermsParagraph = ({ children }: { children: ReactNode }) => {
  return <Body lineHeight={1.7}>{children}</Body>
}

const TermsList = ({ items, ordered = false }: { items: readonly ReactNode[]; ordered?: boolean }) => {
  const content = items.map((item, index) => (
    <ListItem key={index}>
      <Body lineHeight={1.7}>{item}</Body>
    </ListItem>
  ))

  if (ordered) {
    return (
      <OrderedList spacing={2} pl={5}>
        {content}
      </OrderedList>
    )
  }

  return (
    <UnorderedList spacing={2} pl={5}>
      {content}
    </UnorderedList>
  )
}

/** Displays Geyser's Terms and Conditions as a long-form legal page. */
export const TermsPage = () => {
  const { t } = useTranslation()
  const {
    ambassadorEarningsItems,
    contentLicenseItems,
    creatorRemedies,
    feeItems,
    ourRightsItems,
    prohibitedSiteActions,
    systemActions,
  } = useMemo(() => getTermsContent(t), [t])

  return (
    <>
      <Head
        title={t('Terms and Conditions')}
        description={t("Read Geyser's Terms and Conditions and platform rules.")}
        url={`https://geyser.fund${getPath('legalTerms')}`}
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
          <H1>{t('Terms and Conditions')}</H1>
          <Body fontWeight={600}>
            {t('Effective Date and Last Updated')}: {EFFECTIVE_DATE}
          </Body>
          <TermsParagraph>
            {t("This page explains our terms of use. When you use Geyser, you're agreeing to all the rules below.")}
          </TermsParagraph>
          <TermsParagraph>
            {t(
              'The services are provided by Geyser, Inc. and their office is at 8 The Green, STE R, Dover, Kent County, Delaware 19901. By using this website (the "Site") and services (together with the Site, the "Services") offered by Geyser Inc., you\'re agreeing to these legally binding rules (the "Terms").',
            )}
          </TermsParagraph>
          <TermsParagraph>
            {t("You're also agreeing to our ")}
            <ChakraLink href={getPath('legalPrivacy')} isExternal textDecoration="underline">
              {t('Privacy Policy')}
            </ChakraLink>
            {t(
              ". We may change these terms from time to time. If we do, we'll let you know about any material changes, either by notifying you on the Site or by sending you an email.",
            )}
          </TermsParagraph>
        </CardLayout>

        <TermsSection title={t("What We Do and Don't Do")}>
          <TermsParagraph>
            {t(
              'We provide you with access to technology that enables you to share information about your project and collect donations directly from contributors using the Bitcoin and Lightning networks. Please be aware that these networks are public, and we do not own or control them. By using our website and services, you acknowledge that you understand and accept that you are using Bitcoin and the Lightning network at your own risk.',
            )}
          </TermsParagraph>
          <TermsParagraph>
            {t(
              "It's important to note that we provide access to technology and technology only. Geyser does not offer any financial services or services related to crypto-assets. Specifically, Geyser does not custody, administer, or control any funds at any time, nor does it provide money transfer services or any similar services.",
            )}
          </TermsParagraph>
        </TermsSection>

        <TermsSection title={t('About Creating an Account')}>
          <TermsParagraph>
            {t(
              "You can browse Geyser without registering for an account. But to use some of Geyser's functions, you'll need to create an account. When you do that, the information you give us has to be accurate and complete. Don't impersonate anyone else or choose names that are offensive or that violate anyone's rights. If you don't follow these rules, we may cancel your account.",
            )}
          </TermsParagraph>
          <TermsParagraph>
            {t(
              "You're responsible for all the activity on your account, and for keeping your sign in confidential. If you find out that someone's used your account without your permission, you should report it to hello@geyser.fund.",
            )}
          </TermsParagraph>
          <TermsParagraph>
            {t(
              'To sign up for an account, you need to be at least 18 years old, or old enough to form a binding contract where you live. If necessary, we may ask you for proof of age.',
            )}
          </TermsParagraph>
        </TermsSection>

        <TermsSection title={t("Things You Definitely Shouldn't Do")}>
          <TermsParagraph>
            {t(
              "Thousands of people use Geyser. We expect all of them to behave responsibly and help keep this a nice place. Don't do any of these things on the Site.",
            )}
          </TermsParagraph>
          <TermsList items={prohibitedSiteActions} />
          <TermsParagraph>
            {t(
              "We also need to make sure that the Site is secure and our systems function properly. So don't do any of these things - most of which boil down to 'don't mess with our system.'",
            )}
          </TermsParagraph>
          <TermsList items={systemActions} />
          <TermsParagraph>
            {t(
              'Whenever we mention laws, legal obligations, statutes, ordinances, regulations, or regulatory restrictions, we are referring to any provisions that may apply to or be legally binding on you and/or us in all relevant geographical locations or jurisdictions.',
            )}
          </TermsParagraph>
          <TermsParagraph>
            {t(
              "Geyser reserves the right to delist any project from the Site and from Geyser's platform that does not conform to these Terms.",
            )}
          </TermsParagraph>
        </TermsSection>

        <TermsSection title={t('How Project Donations and Rewards Work')}>
          <TermsParagraph>
            {t(
              "Geyser provides a funding platform for creative projects. When a creator posts a project on Geyser, they're inviting other people to participate. A contributor who makes a donation to the project is doing so voluntarily with no expectations of financial or returns.",
            )}
          </TermsParagraph>
          <TermsParagraph>
            {t(
              "A contributor who funds with a reward based on the creator's offer forms a contract with the creator. Geyser is not party to this contract. The contract is an agreement between creators and their backers. Here are the terms that govern that agreement:",
            )}
          </TermsParagraph>
          <TermsParagraph>
            {t(
              "When a creator purchases an item with a reward, the creator must fulfill each reward. Once a creator has done so, they've satisfied their obligation to their contributors. Throughout the process, creators owe their contributors a high standard of effort, honest communication, and a dedication to bringing the project to life. Geyser take no responsibility for the failure of creators to live up to their contracts with contributors, and by using the Services, creators and contributors both hereby waive any claims against and hold harmless Geyser, its employees, officers, directors, agents, successors, and assigns relating to a breach of contract between creators and contributors.",
            )}
          </TermsParagraph>
          <TermsParagraph>
            {t(
              "At the same time, contributors must understand that when they purchase a reward they may not be buying something when they contribute towards a project - they're helping to create something that may be new, that does not yet already exists. There may be changes or delays, and there's a chance something could happen that prevents the creator from being able to finish the project as promised.",
            )}
          </TermsParagraph>
          <TermsParagraph>
            {t(
              "If a creator is unable to fulfill rewards, they've failed to live up to the basic obligations of this agreement. To right this, they must make every reasonable effort to find another way of bringing the project to the best possible conclusion for contributors. A creator in this position has only remedied the situation and met their obligations to backers if:",
            )}
          </TermsParagraph>
          <TermsList items={creatorRemedies} ordered />
          <TermsParagraph>
            {t(
              "The creator is solely responsible for fulfilling the promises made in their project. If they're unable to satisfy the terms of this agreement, they may be subject to legal action by contributors who selected a reward.",
            )}
          </TermsParagraph>
        </TermsSection>

        <TermsSection title={t('How Funding Works')}>
          <TermsParagraph>{t('When you contribute to a project the funds go straight to the creator.')}</TermsParagraph>

          <H3>{t('On-chain transactions')}</H3>
          <TermsParagraph>
            {t(
              `On-chain transactions are swapped to lightning using Boltz Exchange's non-custodial submarine swap. This means that you are solely responsible for maintaining and securing the backup file ("Refund File") associated with your onchain transactions - which Geyser does not store, administer and/or control. We do not maintain any backups of the Refund File. The Refund File is intended to serve as a mechanism for you to secure access to your funds in the event of an onchain transaction failing. The loss of the Refund File may irreversibly prevent access to your funds. Geyser shall not be liable for any loss or damage of funds arising from your failure to comply with the aforementioned backup requirements. Geyser doesn't offer refunds. Responsibility for finishing a project lies entirely with the project creator. Geyser doesn't hold funds on creators' behalf, cannot guarantee creators' work, and does not offer refunds. All payments are processed via the Bitcoin and Lightning networks. This means that payments are cash final, there can be no reimbursement. Once again, please keep in mind that these are public networks that are entirely beyond our control. Geyser does not have control over the Bitcoin and/or Lightning network. By using our services, creators and contributors acknowledge that they understand how the Bitcoin and Lightning networks operate and that they, not Geyser, will be responsible for any lost funds due to incorrect addresses, insufficient liquidity, failed payments, nodes going offline, network downtime, malicious or faulty software, hard forks, hash rate attacks, or any other foreseeable or unforeseeable risks inherent to the Bitcoin network that are beyond Geyser's control.`,
            )}
          </TermsParagraph>

          <H3>{t('On-Ramp Transactions and Identity Verification')}</H3>
          <TermsParagraph>
            <strong>{t('Third-Party Services')}</strong>:{' '}
            {t(
              "Our platform may give users access to third-party on-ramp services that enable contributions in fiat. These services are operated by third-party providers, and we don't control, endorse, or take responsibility for their operations, terms, or policies.",
            )}
          </TermsParagraph>
          <TermsParagraph>
            <strong>{t('No Warranties')}</strong>:{' '}
            {t(
              "We don't guarantee the accuracy, reliability, legality, security, or availability of any on-ramp service. Users choose to engage with these services at their own discretion and risk.",
            )}
          </TermsParagraph>
          <TermsParagraph>
            <strong>{t('Indemnification')}</strong>:{' '}
            {t(
              'Users agree to indemnify and hold us harmless from any claims, losses, damages, liabilities, costs, or expenses arising from their use of on-ramp services, including but not limited to disputes with third-party providers, unauthorized transactions, or regulatory matters.',
            )}
          </TermsParagraph>
          <TermsParagraph>
            <strong>{t('No Financial Responsibility')}</strong>:{' '}
            {t(
              "We are not a financial institution and/or payment processor and/or money services business. We don't process, hold, or manage funds related to on-ramp transactions, and we can't be held responsible for any losses, fees, delays, chargebacks, or transaction failures.",
            )}
          </TermsParagraph>
          <TermsParagraph>
            <strong>{t('User Due Diligence')}</strong>:{' '}
            {t(
              "Users should carefully review any third-party on-ramp provider before initiating a transaction. It is the user's responsibility to review and accept the provider's terms and policies before proceeding with any transactions.",
            )}
          </TermsParagraph>
          <TermsParagraph>
            <strong>{t('Using Banxa')}</strong>:{' '}
            {t(
              "If users make fiat contributions through Banxa, they must review and accept Banxa's Customer Terms and Conditions before completing their transaction. Banxa operates independently, and its services are subject to its own policies.",
            )}
          </TermsParagraph>
          <TermsParagraph>
            <strong>{t('Identity Verification with SumSub')}</strong>:{' '}
            {t(
              "Users completing Know Your Customer (KYC) verification through SumSub must review and accept SumSub's Terms and Conditions before proceeding. We don't control SumSub's verification process and aren't responsible for their services and/or decisions.",
            )}
          </TermsParagraph>
        </TermsSection>

        <TermsSection title={t("Stuff We Don't Do and Aren't Responsible For")}>
          <TermsParagraph>
            {t(
              "Geyser isn't liable for any damages or losses related to your use of the Services. We don't become involved in disputes between users, or between users and any third party relating to the use of the Services. We don't oversee the performance or punctuality of projects, and we don't endorse any content users submit to the Site. When you use the Services, you release Geyser from claims, damages, and demands of every kind - known or unknown, suspected or unsuspected, disclosed or undisclosed - arising out of or in any way related to such disputes and the Services. All content you access through the Services is at your own risk. You're solely responsible for any resulting damage or loss to any party.",
            )}
          </TermsParagraph>
        </TermsSection>

        <TermsSection title={t('Our Fees')}>
          <TermsParagraph>
            {t(
              "We will not collect any fees without giving you a chance to review and accept them. If our fees ever change, we'll announce that on our Site.",
            )}
          </TermsParagraph>
          <TermsList items={feeItems} />
        </TermsSection>

        <TermsSection title={t('Ambassador Earnings - Terms & Conditions')}>
          <TermsList items={ambassadorEarningsItems} />
        </TermsSection>

        <TermsSection title={t('User Responsibility for Tax Compliance')}>
          <TermsParagraph>
            {t(
              "As a user of Geyser Inc.'s crowdfunding platform, you acknowledge and agree that you are solely responsible for the calculation and payment of any applicable taxes and/or similar public levies or charges, including but not limited to donation taxes, reward sale taxes, VAT, GST, and any other applicable taxes or levies that may arise from your use of the platform. This includes the responsibility to accurately report and remit such taxes in accordance with the laws and regulations of your respective country or jurisdiction.",
            )}
          </TermsParagraph>
          <TermsParagraph>
            {t(
              'You agree to indemnify and hold Geyser Inc., its affiliates, and its respective directors, officers, employees, and agents harmless from any claims, liabilities, penalties, or expenses arising out of or related to your failure to comply with tax obligations in connection with your use of the platform.',
            )}
          </TermsParagraph>
        </TermsSection>

        <TermsSection title={t('Sanctioned Countries and Compliance')}>
          <H3>{t('Prohibition on Projects from Sanctioned Countries')}</H3>
          <TermsParagraph>
            {t(
              'Geyser Inc. strictly prohibits creators from launching projects if they are located in or utilizing nodes/wallets situated in sanctioned countries, or if they are associated with sanctioned individuals or organizations. This policy is in compliance with the regulations set forth by the Office of Foreign Assets Control (OFAC), European Commission and United Nations. For more information, please refer to the OFAC Sanctions List Service at OFAC and EU sanctions map at ',
            )}
            <ChakraLink href="https://sanctionsmap.eu" isExternal textDecoration="underline">
              sanctionsmap.eu
            </ChakraLink>
            .
          </TermsParagraph>

          <H3>{t('Prohibition on Funding from Sanctioned Countries')}</H3>
          <TermsParagraph>
            {t(
              'Geyser Inc. does not permit funders to contribute to projects if they are located in or utilizing nodes/wallets situated in sanctioned countries, or if they are associated with sanctioned individuals or organizations. This measure ensures adherence to OFAC, European Union and United Nations regulations. For detailed information, please visit the OFAC Sanctions List Service at OFAC and EU sanctions map at ',
            )}
            <ChakraLink href="https://sanctionsmap.eu" isExternal textDecoration="underline">
              sanctionsmap.eu
            </ChakraLink>
            .
          </TermsParagraph>

          <H3>{t('Compliance and Enforcement')}</H3>
          <TermsParagraph>
            {t(
              'Geyser Inc. reserves the right to take necessary actions to ensure compliance with these policies, including but not limited to suspending or terminating accounts and projects found to be in violation of these terms. Users are responsible for ensuring that their activities on the platform do not contravene any applicable sanctions laws and regulations.',
            )}
          </TermsParagraph>
        </TermsSection>

        <TermsSection title={t('Other Websites')}>
          <TermsParagraph>
            {t(
              "The Site may contain links to other websites. (For instance, project pages, user profiles, and comments may link to other sites.) When you access third-party websites, you do so at your own risk. We don't control or endorse those sites.",
            )}
          </TermsParagraph>
        </TermsSection>

        <TermsSection title={t('Your Intellectual Property')}>
          <TermsParagraph>
            {t(
              `Geyser doesn't own content you submit to us (your "Content"). But we do need certain licenses from you in order to perform our Services. When you submit a project for review, or launch a project, you agree to these terms:`,
            )}
          </TermsParagraph>
          <TermsList items={contentLicenseItems} />
        </TermsSection>

        <TermsSection title={t("Geyser's Intellectual Property")}>
          <TermsParagraph>
            {t(
              "Geyser's Services are legally protected in various ways, including copyrights, trademarks, service marks, patents, trade secrets, and other rights and laws. You agree to respect all copyright and other legal notices, information, and restrictions contained in any content accessed through the Site. You also agree not to change, translate, or otherwise create derivative works of the Service.",
            )}
          </TermsParagraph>
          <TermsParagraph>
            {t(
              'Geyser grants you a license to reproduce content from the Services for personal use only. This license covers both Geyser\'s own protected content and user-generated content on the Site. (This license is worldwide, non-exclusive, non-sublicensable, and non-transferable.) If you want to use, reproduce, modify, distribute, or store any of this content for a commercial purpose, you need prior written permission from Geyser or the relevant copyright holder. A "commercial purpose" means you intend to use, sell, license, rent, or otherwise exploit content for commercial use, in any way.',
            )}
          </TermsParagraph>
        </TermsSection>

        <TermsSection title={t('How We Deal with Copyright Issues')}>
          <TermsParagraph>
            {t(
              'The Digital Millennium Copyright Act lays out a system of legal requirements for dealing with allegations of copyright infringement. Geyser complies with the DMCA, and we respond to notices of alleged infringement if they comply with the law and the requirements set forth in our Copyright Policy. We reserve the right to delete or disable content alleged to be infringing, and to terminate accounts for repeat infringers. (We do this when appropriate and at our sole discretion.)',
            )}
          </TermsParagraph>
          <TermsParagraph>
            {t("If you'd like to submit a claim of copyright infringement, please email us at ")}
            <ChakraLink href="mailto:hello@geyser.fund" textDecoration="underline">
              hello@geyser.fund
            </ChakraLink>
            .
          </TermsParagraph>
        </TermsSection>

        <TermsSection title={t('Deleting Your Account')}>
          <TermsParagraph>
            {t(
              'You may Deactivate your project at any time, which will not allow anyone to fund your initiative. But you may not be able to delete your project at any time in order for Geyser to ensure that no scam is being carried out.',
            )}
          </TermsParagraph>
          <TermsParagraph>
            {t(
              "You can delete your profile or project directly in the project or profile settings. If you have any issues you can reach out to the team at hello@geyser.fund. Once we delete it, we may retain certain information as required by law or as necessary for our legitimate business purposes. All provisions of this agreement survive termination of an account, including our rights regarding any content you've already submitted to the Site. (For instance, if you've launched a project, deleting your account will not automatically remove the project from the Site.) You can contact us at hello@geyser.fund for additional information or to request project page deletion (this is not available in all circumstances). Additionally, since Geyser is built on Nostr, any data that is deleted on Geyser may still exist on other Nostr Relays. More on this in the next section.",
            )}
          </TermsParagraph>
        </TermsSection>

        <TermsSection title={t('Propagation of information over relays')}>
          <TermsParagraph>
            {t(
              'Geyser stores project and user data on a Nostr Relay and propagates information to other Nostr Relays in order for data to be accessible across Nostr clients.',
            )}
          </TermsParagraph>
          <TermsParagraph>
            {t(
              'This means that your project and profile information will be broadcast to other Nostr Relays. You can check which Relays data is being broadcast to by checking your project settings.',
            )}
          </TermsParagraph>
        </TermsSection>

        <TermsSection title={t('Our Rights')}>
          <TermsParagraph>
            {t(
              'To ensure compliance with our Terms, protect the health and integrity of our system, and to help ensure that creators and backers enjoy a safe and secure environment, Geyser reserves these rights:',
            )}
          </TermsParagraph>
          <TermsList items={ourRightsItems} />
          <TermsParagraph>
            {t(
              "Geyser is not liable for any damages as a result of any of these actions including delisting the project. It is our general policy not to comment on the reasons for any such action. However, if we impose restrictions on or limit a verified account holder's access to any of our Services or if we intend to cancel a verified account, we will let the account holder know the reasons for this action and how they can remedy any issues (where appropriate), unless we're prohibited from doing so by law or in the interest of safety. For account cancelations, we will let the account holder know the reasons for this action at least 30 days in advance, unless we're canceling for reasons related to illicit or inappropriate content, the safety of a good or service, counterfeiting, fraud, malware, spam, data breaches, other cybersecurity risks, or the suitability of a good or service for minors, or court and/or a public authority order.",
            )}
          </TermsParagraph>
        </TermsSection>

        <TermsSection title={t('Our Ethos')}>
          <TermsParagraph>
            {t(
              'At Geyser, we believe Bitcoin is a peaceful revolution built on freedom, openness, and self-sovereignty, and our manifesto reminds us that small actions compound into global movements for change. Guided by these principles, we believe in the transformational power of a platform that can empower individuals all around the world to tell their story and fund their ideas.',
            )}
          </TermsParagraph>
          <TermsParagraph>
            {t(
              'Geyser is committed to equal treatment and to fostering a platform free from discrimination based on race, ethnicity, gender, sexual orientation, religion, political opinion, nationality, or other status.',
            )}
          </TermsParagraph>
        </TermsSection>

        <TermsSection title={t('Warranty Disclaimer')}>
          <TermsParagraph>
            {t(
              'You use our Services solely at your own risk. They are provided to you "as is" and "as available" and without warranty of any kind, express or implied. GEYSER SPECIFICALLY DISCLAIMS ANY AND ALL WARRANTIES AND CONDITIONS OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR A PARTICULAR PURPOSE, AND ANY WARRANTIES IMPLIED BY ANY COURSE OF DEALING, COURSE OF PERFORMANCE, OR USAGE OF TRADE. NO ADVICE OR INFORMATION (ORAL OR WRITTEN) OBTAINED BY YOU FROM GEYSER SHALL CREATE ANY WARRANTY.',
            )}
          </TermsParagraph>
        </TermsSection>

        <TermsSection title={t('Indemnification')}>
          <TermsParagraph>
            {t(
              "If you do something that gets us sued, or break any of the promises you make in this agreement, you agree to defend, indemnify, and hold us harmless from all liabilities, claims, and expenses (including reasonable attorneys' fees and other legal costs) that arise from or relate to your use or misuse of Geyser. We reserve the right to assume the exclusive defense and control of any matter otherwise subject to this indemnification clause, in which case you agree that you'll cooperate and help us in asserting any defenses.",
            )}
          </TermsParagraph>
          <TermsParagraph>
            {t(
              'As part of this, by accepting these Terms of Use, you consent to service of process for any action that could be brought against Geyser, for any reason.',
            )}
          </TermsParagraph>
        </TermsSection>

        <TermsSection title={t('Limitation of Liability')}>
          <TermsParagraph>
            {t(
              "To the fullest extent permitted by law, in no event will Geyser, its directors, employees, partners, suppliers, agents, successors, affiliates, assigns, or content providers be liable for any indirect, incidental, punitive, consequential, special, or exemplary damages of any kind, including but not limited to damages (i) resulting from your access to, use of, or inability to access or use the Services; (ii) for any lost profits, data loss, or cost of procurement or substitute goods or services; or (iii) for any conduct of content of any third party on the Site. In no event shall Geyser's liability for direct damages be in excess of (in the aggregate) one hundred U.S. dollars ($100.00).",
            )}
          </TermsParagraph>
        </TermsSection>

        <TermsSection title={t('Dispute Resolution and Governing Law')}>
          <TermsParagraph>
            {t(
              "We at Geyser encourage you to contact us if you're having an issue before resorting to the courts. Our Geyser support team is on hand and ready to answer your questions. You can reach out to hello@geyser.fund. These resources are easily accessible and free.",
            )}
          </TermsParagraph>
          <TermsParagraph>
            {t(
              "If you're a creator based in the European Union and, after contacting us through those channels, you still don't feel as if your issue has been resolved, we may agree with you to engage in mediation to resolve any complaints in good faith. You may address your complaint with one of these two mediation organizations:",
            )}
          </TermsParagraph>
          <UnorderedList spacing={2} pl={5}>
            <ListItem>
              <Body lineHeight={1.7}>{t('The Center for Effective Dispute Resolution (CEDR)')}</Body>
            </ListItem>
            <ListItem>
              <Body lineHeight={1.7}>
                <ChakraLink href="https://mediate.co.uk/" isExternal textDecoration="underline">
                  IPOS Mediation
                </ChakraLink>
              </Body>
            </ListItem>
          </UnorderedList>
          <TermsParagraph>
            {t(
              'In the unfortunate situation where legal action does arise, these Terms (and all other rules, policies, or guidelines incorporated by reference) will be governed by and construed in accordance with the laws of the State of Wyoming and the United States, without giving effect to any principles of conflicts of law, and without application of the Uniform Computer Information Transaction Act or the United Nations Convention of Controls for International Sale of Goods. You agree that Geyser and its Services are deemed a passive website that does not give rise to jurisdiction over Geyser or its parents, subsidiaries, affiliates, assigns, employees, agents, directors, officers, or shareholders, either specific or general, in any jurisdiction other than the State of Wyoming. You agree that any action at law or in equity arising out of or relating to these Terms, or your use or non-use of Geyser, shall be filed only in the state or federal courts located in the State of Wyoming, and you hereby consent and submit to the personal jurisdiction of these courts for the purposes of litigating any such action. You hereby irrevocably waive any right you may have to trial by jury in any dispute, action, or proceeding.',
            )}
          </TermsParagraph>
        </TermsSection>

        <TermsSection title={t('The Rest')}>
          <TermsParagraph>
            {t(
              "These Terms and the other material referenced in them are the entire agreement between you and Geyser with respect to the Services. They supersede all other communications and proposals (whether oral, written, or electronic) between you and Geyser with respect to the Services and govern our future relationship. If any provision of these Terms is found to be invalid under the law, that provision will be limited or eliminated to the minimum extent necessary so that the Terms otherwise will remain in full force and effect and enforceable. The failure of either you or Geyser to exercise any right provided for in these Terms in any way won't be deemed a waiver of any other rights.",
            )}
          </TermsParagraph>
          <TermsParagraph>
            {t(
              "These Terms are personal to you. You can't assign them, transfer them, or sublicense them unless you get Geyser's prior written consent. Geyser has the right to assign, transfer, or delegate any of its rights and obligations under these Terms without your consent. Geyser will provide you notice via email, written notice, or by conspicuously posting the notice on our Site.",
            )}
          </TermsParagraph>
        </TermsSection>
      </VStack>
    </>
  )
}
