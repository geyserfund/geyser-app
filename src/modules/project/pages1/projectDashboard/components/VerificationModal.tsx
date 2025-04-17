import { ModalProps, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { UserVerificationLevelInput } from '@/types/index.ts'

import { SumSubVerification } from '../views/wallet/components/SumSubVerification.tsx'
import { useUserVerificationModal } from '../views/wallet/hooks/useUserVerificationModal.ts'
import { VerificationDetails } from './VerificationDetails.tsx'

/** Props for the verification modal component */
type VerificationModalProps = Omit<ModalProps, 'children'> & {
  /** Callback function when user clicks the continue button */
  onContinue?: () => void
}

/** Modal component that explains creator verification benefits and process */
export const VerificationModal = ({ onContinue, ...props }: VerificationModalProps) => {
  const { t } = useTranslation()

  const { userVerificationModal, userVerificationToken, startVerification, generateVerificationTokenLoading } =
    useUserVerificationModal()

  return (
    <Modal {...props} size="xl" title={t('Creator Verification')} bodyProps={{ as: VStack, gap: 4 }}>
      {!userVerificationModal.isOpen ? (
        <>
          <VerificationDetails
            onContinue={() => startVerification(UserVerificationLevelInput.Level_3)}
            onLoading={generateVerificationTokenLoading}
          />
        </>
      ) : (
        <SumSubVerification
          accessToken={userVerificationToken?.token || ''}
          verificationLevel={userVerificationToken?.verificationLevel}
          onComplete={() => {
            userVerificationModal.onClose()
            props.onClose()
          }}
        />
      )}
    </Modal>
  )
}
