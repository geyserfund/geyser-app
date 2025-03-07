import { VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Trans } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'

import { GuardianBody, GuardianHeader } from '../GuardiansMainPage.tsx'

export const Promotion = () => {
  return (
    <VStack
      spacing={8}
      background="guardians.textBackground"
      borderTop="5px solid"
      borderColor="guardians.text"
      paddingX={{ base: '32px', lg: '48px', '2xl': '64px' }}
      paddingY={{ base: '24px', lg: '32px', '2xl': '48px' }}
    >
      <GuardianHeader color="guardians.text">{t('Guardians Fuel Bitcoin Adoption')}</GuardianHeader>
      <GuardianBody>
        <Trans i18nKey="By becoming a Geyser Guardian, you directly fuel the Bitcoin ecosystem! <1>21% of each Guardian purchased goes to </1><2>Geyser Grants.</2>">
          {'By becoming a Geyser Guardian, you directly fuel the Bitcoin ecosystem! '}
          <strong>21% of each Guardian purchased goes to </strong>
          <Link to={getPath('grants')}>
            <Body as="span" color="guardians.text" textDecoration={'underline'} fontWeight={'bold'}>
              Geyser Grants.
            </Body>
          </Link>
        </Trans>
      </GuardianBody>
      <GuardianBody>
        {t(
          'So far Geyser Grants have awarded  12 grants and more than 3 BTC in funding to a dozens of Bitcoin projects and initiatives focused on culture, education, and community engagement, helping spread Bitcoin to more people around the world. ',
        )}
      </GuardianBody>
    </VStack>
  )
}
