import { Button, HStack, Image, ListItem, ModalProps, UnorderedList, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { BecomeVerifiedCreatorIllustrationUrl } from '@/shared/constants/index.ts'

/** Props for the verification modal component */
type VerificationModalProps = Omit<ModalProps, 'children'> & {
  /** Callback function when user clicks the continue button */
  onContinue?: () => void
}

/** Modal component that explains creator verification benefits and process */
export const VerificationModal = ({ onContinue, ...props }: VerificationModalProps) => {
  const { t } = useTranslation()

  return (
    <Modal {...props} size="lg" title={t('Creator Verification')} bodyProps={{ as: VStack, gap: 4 }}>
      <HStack justifyContent="center" w="full">
        <Image maxHeight="250px" src={BecomeVerifiedCreatorIllustrationUrl} alt="Become Verified Creator" />
      </HStack>

      <Body>
        {t('Creator Verification allows you to unlock certain functionalities for all your projects on the platform:')}
      </Body>
      <UnorderedList>
        <ListItem>
          <Body as={'span'} bold>
            {t('Turn ON fiat contributions.')}
          </Body>
          {t(
            'Contributors will be able to spend fiat through their credit card, or local payment method, while you always receive Bitcoin on Lightning.',
          )}
        </ListItem>
        <ListItem>
          <Body as={'span'} bold>
            {t('A "Verified Creator" badge.')}
          </Body>
          {t('Helping you build trust with potential contributors.')}
        </ListItem>
      </UnorderedList>
      <Body>
        {t(
          'Verification requires only a government-issued ID and takes less than 2 minutes through our secure, trusted partner.',
        )}
      </Body>
      <HStack w="full">
        <Button variant="solid" colorScheme="primary1" width="full" onClick={onContinue}>
          {t('Continue to verification')}
        </Button>
      </HStack>
    </Modal>
  )
}
