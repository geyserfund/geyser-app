import { Button, Checkbox, Code, Divider, HStack, Icon, Link, useDisclosure, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { PiCheck, PiCopy, PiDownloadSimple, PiWarning } from 'react-icons/pi'

import { anonymousRecoveryCodeAtom } from '@/modules/project/funding/state/fundingContributionCreateInputAtom.ts'
import { createRecoveryKey } from '@/modules/project/funding/utils/recoveryKey.ts'
import { Modal } from '@/shared/components/layouts/Modal.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { GeyserOnChainGuideUrl } from '@/shared/constants/index.ts'
import { Feedback, FeedBackVariant } from '@/shared/molecules/Feedback.tsx'
import { useCopyToClipboard } from '@/shared/utils/hooks/useCopyButton.ts'
import { useNotification } from '@/utils/index.ts'

import { PaymentDownloadRefundFile } from './PaymentDownloadRefundFile.tsx'

type PaymentRecoveryKeyProps = {
  contributionId: string
  isPrismContribution?: boolean
  onComplete: () => void
}

/** PaymentRecoveryKey: lets anonymous contributors copy the key needed to recover refunds later. */
export const PaymentRecoveryKey = ({ contributionId, isPrismContribution, onComplete }: PaymentRecoveryKeyProps) => {
  const toast = useNotification()
  const recoveryCode = useAtomValue(anonymousRecoveryCodeAtom)
  const downloadDisclosure = useDisclosure()
  const [hasSavedRecoveryKey, setHasSavedRecoveryKey] = useState(false)
  const [showRefundFileDownload, setShowRefundFileDownload] = useState(false)
  const recoveryKey = recoveryCode ? createRecoveryKey(contributionId, recoveryCode) : ''
  const { hasCopied, onCopy } = useCopyToClipboard(recoveryKey)

  const handleCopy = () => {
    if (!recoveryKey) return

    onCopy()
    setHasSavedRecoveryKey(true)
    toast.success({
      title: t('Recovery key copied'),
    })
  }

  const handleDownloadFallback = () => {
    downloadDisclosure.onClose()
    setShowRefundFileDownload(true)
  }

  if (showRefundFileDownload) {
    return <PaymentDownloadRefundFile isPrismContribution={isPrismContribution} onComplete={onComplete} />
  }

  return (
    <VStack w="full" spacing={4}>
      <Feedback variant={FeedBackVariant.WARNING} icon={<PiWarning fontSize="24px" />}>
        <VStack w="full" alignItems="start">
          <Body size="lg" medium>
            {t('Copy your recovery key before proceeding')}
          </Body>
          <Body size="sm">
            {isPrismContribution
              ? t(
                  'If the contribution fails, this recovery key lets you claim a refund without downloading a refund file.',
                )
              : t(
                  'If this project does not reach its goal, this recovery key lets you claim a refund without downloading a refund file.',
                )}{' '}
            <Link isExternal href={GeyserOnChainGuideUrl} color="primary1.11">
              {t('More info')}.
            </Link>
          </Body>
          <Divider />
          <Body size="sm">{t('Geyser cannot recover this key for you. Store it somewhere private and secure.')}</Body>
        </VStack>
      </Feedback>

      <VStack w="full" spacing={3} alignItems="stretch">
        <Code
          whiteSpace="normal"
          wordBreak="break-all"
          borderRadius="8px"
          color="neutral1.12"
          bg="neutral1.3"
          p={3}
          fontSize="sm"
        >
          {recoveryKey || t('Preparing recovery key')}
        </Code>

        <Button
          leftIcon={<Icon as={hasCopied ? PiCheck : PiCopy} />}
          size="lg"
          colorScheme="primary1"
          onClick={handleCopy}
          isDisabled={!recoveryKey}
        >
          {hasCopied ? t('Copied') : t('Copy recovery key')}
        </Button>

        <Checkbox isChecked={hasSavedRecoveryKey} onChange={(event) => setHasSavedRecoveryKey(event.target.checked)}>
          <Body as="span" size="sm">
            {t('I saved this recovery key somewhere secure')}
          </Body>
        </Checkbox>

        <Button size="lg" colorScheme="primary1" variant="solid" onClick={onComplete} isDisabled={!hasSavedRecoveryKey}>
          {t('Continue')}
        </Button>

        <Button
          leftIcon={<Icon as={PiDownloadSimple} />}
          size="md"
          variant="ghost"
          colorScheme="primary1"
          onClick={downloadDisclosure.onOpen}
        >
          {t('Download refund file instead')}
        </Button>
      </VStack>

      <Modal isOpen={downloadDisclosure.isOpen} onClose={downloadDisclosure.onClose} title={t('Download refund file')}>
        <VStack spacing={4} alignItems="start">
          <Body size="md">
            {t(
              'Refund-file downloads may fail inside in-app browsers such as X or Twitter. To download the file, open this page in your system browser from the in-app browser menu, then continue funding. You can use the recovery key above instead.',
            )}
          </Body>
          <HStack w="full" justifyContent="end">
            <Button variant="ghost" onClick={downloadDisclosure.onClose}>
              {t('Cancel')}
            </Button>
            <Button colorScheme="primary1" onClick={handleDownloadFallback}>
              {t('Continue to download')}
            </Button>
          </HStack>
        </VStack>
      </Modal>
    </VStack>
  )
}
