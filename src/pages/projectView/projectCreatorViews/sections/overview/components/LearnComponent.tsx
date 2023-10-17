import { Button, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import { Body1, H3 } from '../../../../../../components/typography'
import {
  Gift3DImageUrl,
  LearnAboutCrowdfundingUrl,
  TextMessage3DImageUrl,
} from '../../../../../../constants'
import { LearnDisplayCards } from '../elements'

export const LearnComponent = () => {
  const { t } = useTranslation()
  return (
    <VStack spacing="10px" w="full" alignItems="start">
      <H3 alignSelf="start">{t('Tips')}</H3>
      <LearnDisplayCards
        image={Gift3DImageUrl}
        title={t('How do I sell merch')}
        description={t(
          'Sell merch, perks, and rewards related to your project',
        )}
        maxWidth="350px"
      />
      <LearnDisplayCards
        maxWidth="350px"
        image={TextMessage3DImageUrl}
        title={t('Engage my community')}
        description={t(
          'Keep your supporters up-to-date with Entries on Geyser',
        )}
      />
      <Button
        as={Link}
        to={LearnAboutCrowdfundingUrl}
        variant="ghost"
        leftIcon={<BsBoxArrowUpRight />}
      >
        <Body1>{t('Learn more about crowdfunding')}</Body1>
      </Button>
    </VStack>
  )
}
