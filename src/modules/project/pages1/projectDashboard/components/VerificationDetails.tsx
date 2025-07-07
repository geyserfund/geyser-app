import { Button, HStack, Image, ListItem, UnorderedList, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'

import { LegalEntitySelection } from '@/modules/profile/pages/profileSettings/views/ProfileSettingsVerification/components/LegalEntitySelection.tsx'
import { userTaxProfileAtom } from '@/modules/profile/pages/profileSettings/views/ProfileSettingsVerification/state/taxProfileAtom.ts'
import { Body } from '@/shared/components/typography/Body.tsx'
import { VerificationIllustrationUrl } from '@/shared/constants/platform/url.ts'

type VerificationDetailsProps = {
  onContinue: () => void
  onLoading: boolean
}

export const VerificationDetails = ({ onContinue, onLoading }: VerificationDetailsProps) => {
  const taxProfile = useAtomValue(userTaxProfileAtom)

  const hasIdentity = taxProfile

  return (
    <VStack w="full" gap={4}>
      <HStack justifyContent="center" w="full">
        <Image src={VerificationIllustrationUrl} maxHeight="150px" alt="verification" />
      </HStack>

      <Body>
        {t('Creator Verification allows you to unlock certain functionalities for all your projects on the platform:')}
      </Body>
      <UnorderedList>
        <ListItem>
          <Body as={'span'} bold>
            {t('Enable fiat contributions')}:{' '}
          </Body>
          {t(
            'Contributors will be able to spend fiat through their credit card, or local payment method, while you always receive Bitcoin on Lightning.',
          )}
        </ListItem>
        <ListItem>
          <Body as={'span'} bold>
            {t('A verified creator badge')}:{' '}
          </Body>
          {t('To help you build trust with potential contributors.')}
        </ListItem>
      </UnorderedList>
      <Body>
        {t(
          'Verification requires only a government-issued ID and takes less than 2 minutes through our secure, trusted partner.',
        )}
      </Body>

      <HStack w="full">
        <Button
          variant="solid"
          colorScheme="primary1"
          width="full"
          onClick={onContinue}
          isLoading={onLoading}
          isDisabled={!hasIdentity}
        >
          {t('Continue verification')}
        </Button>
      </HStack>
    </VStack>
  )
}
