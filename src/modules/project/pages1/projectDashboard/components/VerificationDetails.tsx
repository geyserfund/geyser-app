import { Button, HStack, Image, ListItem, UnorderedList, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { BecomeVerifiedCreatorIllustrationUrl } from '@/shared/constants/index.ts'

export const VerificationDetails = ({ onContinue, onLoading }: { onContinue: () => void; onLoading: boolean }) => {
  return (
    <VStack w="full" gap={4}>
      <HStack justifyContent="center" w="full">
        <Image maxHeight="250px" src={BecomeVerifiedCreatorIllustrationUrl} alt="Become Verified Creator" />
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
            {t('A "Verified Creator" badge')}:{' '}
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
        <Button variant="solid" colorScheme="primary1" width="full" onClick={onContinue} isLoading={onLoading}>
          {t('Continue to verification')}
        </Button>
      </HStack>
    </VStack>
  )
}
