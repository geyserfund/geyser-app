import { VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { H3 } from '../../../../../../components/typography'
import {
  Gift3DImageUrl,
  TextMessage3DImageUrl,
} from '../../../../../../constants'
import { LearnDisplayCards } from '../elements'

export const LearnComponent = () => {
  const { t } = useTranslation()
  return (
    <VStack spacing="10px" w="full">
      <H3 alignSelf="start">{t('Learn')}</H3>
      <LearnDisplayCards
        image={Gift3DImageUrl}
        title={t('How do I sell merch')}
        description={t(
          'Sell merch, perks, and rewards related to your project',
        )}
      />
      <LearnDisplayCards
        image={TextMessage3DImageUrl}
        title={t('Engage my community')}
        description={t(
          'Keep your supporters up-to-date with Entries on Geyser',
        )}
      />
    </VStack>
  )
}
