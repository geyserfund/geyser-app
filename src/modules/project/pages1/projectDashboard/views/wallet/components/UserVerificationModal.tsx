import { Button, HStack, Image, ListItem, UnorderedList, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useState } from 'react'

import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/index.ts'
import {
  SuccessfullPhoneVerificationIllustrationUrl,
  SuccessfullyVerifiedIllustrationUrl,
} from '@/shared/constants/platform/url.ts'
import { UseModalReturn } from '@/shared/hooks/useModal.tsx'
import { UserVerificationLevel, UserVerificationLevelInput } from '@/types/index.ts'

import { useUserVerificationModal } from '../hooks/useUserVerificationModal.ts'
import { SumSubVerification } from './SumSubVerification.tsx'

export const UserVerificationModal = ({
  userVerificationModal,
  accessToken,
  verificationLevel,
}: {
  userVerificationModal: UseModalReturn
  accessToken: string
  verificationLevel?: UserVerificationLevel
}) => {
  const [level2Complete, setLevel2Complete] = useState(false)
  const [level3Complete, setLevel3Complete] = useState(false)

  const [title, setTitle] = useState(t('Identity verification'))

  useEffect(() => {
    if (verificationLevel && verificationLevel === UserVerificationLevel.Level_2) {
      setTitle(t('Phone verification'))
    }
  }, [verificationLevel])

  /** Shows success message after phone verification is completed */

  const handleComplete = () => {
    if (verificationLevel && verificationLevel === UserVerificationLevel.Level_2) {
      setLevel2Complete(true)
      return
    }

    if (verificationLevel && verificationLevel === UserVerificationLevel.Level_3) {
      setLevel3Complete(true)
    }
  }

  const handleClose = () => {
    userVerificationModal.onClose()
    setLevel2Complete(false)
    setLevel3Complete(false)
  }

  const renderContent = () => {
    if (level3Complete) {
      return <Level3SuccessMessage onClose={handleClose} />
    }

    if (level2Complete) {
      return <Level2SuccessMessage onClose={handleClose} setTitle={setTitle} />
    }

    return <SumSubVerification accessToken={accessToken} onComplete={handleComplete} />
  }

  return (
    <Modal
      {...userVerificationModal}
      onClose={handleClose}
      title={title}
      bodyProps={{ as: VStack, justifyContent: 'center', minHeight: { base: '70vh', lg: '60vh' } }}
    >
      {renderContent()}
    </Modal>
  )
}

const Level2SuccessMessage = ({ onClose, setTitle }: { onClose: () => void; setTitle: (title: string) => void }) => {
  const { userVerificationModal, userVerificationToken, startVerification } = useUserVerificationModal()

  const [complete, setComplete] = useState(false)

  const handleComplete = () => {
    setComplete(true)
  }

  const handleVerificationStart = () => {
    setTitle(t('Verify your identity'))
    startVerification(UserVerificationLevelInput.Level_3)
  }

  if (complete) {
    return <Level3SuccessMessage onClose={onClose} />
  }

  if (userVerificationModal.isOpen) {
    return <SumSubVerification accessToken={userVerificationToken?.token || ''} onComplete={handleComplete} />
  }

  return (
    <VStack spacing={6} w="full" align="flex-start" p={4}>
      <HStack w="full" justifyContent="center">
        <Image maxHeight="200px" src={SuccessfullPhoneVerificationIllustrationUrl} alt="Successfully verified" />
      </HStack>
      <VStack align="flex-start">
        <Body medium>{t('You have successfully completed the phone verification.')}</Body>

        <Body light>{t('Your project can now receive up to 100k dollars.')}</Body>
      </VStack>

      <VStack align="flex-start">
        <Body>{t('Complete the identity verification to:')}</Body>
        <UnorderedList>
          <ListItem>
            <Body light>{t('Remove raising limits on your project')}</Body>
          </ListItem>
          <ListItem>
            <Body light>{t('Enable fiat contributions')}</Body>
          </ListItem>
          <ListItem>
            <Body light>{t('Receive a "Verified Creator" badge')}</Body>
          </ListItem>
        </UnorderedList>
      </VStack>

      <HStack w="full" spacing={4} pt={4}>
        <Button variant="outline" colorScheme="neutral1" onClick={onClose}>
          {t('Not now')}
        </Button>
        <Button variant={'solid'} colorScheme="green" onClick={handleVerificationStart}>
          {t('Complete Identity Verification')}
        </Button>
      </HStack>
    </VStack>
  )
}

const Level3SuccessMessage = ({ onClose }: { onClose: () => void }) => {
  return (
    <VStack spacing={8} w="full" align="flex-start" p={4}>
      <HStack w="full" justifyContent="center">
        <Image maxHeight="200px" src={SuccessfullyVerifiedIllustrationUrl} alt="Successfully verified" />
      </HStack>
      <VStack align="flex-start">
        <Body medium>{t('You have successfully completed the document verification!')}</Body>

        <Body light>{t('You can now raise more than $100k in contributions for your project.')}</Body>
        <Body light>
          {t('You have also earned a “Verified Creator” badge, and enabled fiat contributions on your project.')}
        </Body>
      </VStack>
    </VStack>
  )
}
