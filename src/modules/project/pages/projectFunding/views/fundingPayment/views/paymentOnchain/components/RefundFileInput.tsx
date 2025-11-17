import { Box } from '@chakra-ui/react'
import { useSetAtom } from 'jotai'
import QrScanner from 'qr-scanner'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'

import { UploadBox } from '@/components/ui'
import { currentSwapIdAtom } from '@/modules/project/funding/state'
import { currentSwapAtom } from '@/modules/project/funding/state/swapAtom.ts'
import { FieldContainer } from '@/shared/components/form'
import { ContributionStatus, PaymentStatus, PaymentType, useContributionForRefundGetLazyQuery } from '@/types/index.ts'

export type ImageFieldProps = {
  name: string
  caption?: string
  label?: string
  required?: boolean
}

export const RefundFileInput = ({ name, caption, required, label }: ImageFieldProps) => {
  const { t } = useTranslation()

  const setCurrentSwapId = useSetAtom(currentSwapIdAtom)
  const setCurrentSwapData = useSetAtom(currentSwapAtom)
  const [isInvalid, setIsInvalid] = useState(false)

  const [getContributionForRefund] = useContributionForRefundGetLazyQuery()

  /** Validate contribution status and payments */
  const validateContribution = useCallback((contribution: any): boolean => {
    if (contribution?.status !== ContributionStatus.Pledged || contribution?.payments?.length === 0) {
      return false
    }

    const getPaidPayment = contribution?.payments?.find((payment: any) => payment?.status === PaymentStatus.Paid)

    return Boolean(getPaidPayment)
  }, [])

  /** Handle swap data based on payment type */
  const handlePaymentType = useCallback(
    (getPaidPayment: any, json: any): boolean => {
      if (getPaidPayment?.paymentType === PaymentType.LightningToRskSwap) {
        setCurrentSwapData(json.lightningToRsk, json.lightningToRsk.id)
        setCurrentSwapId(json.lightningToRsk.id)
        return true
      }

      if (getPaidPayment?.paymentType === PaymentType.OnChainToRskSwap) {
        setCurrentSwapData(json.onChainToRsk, json.onChainToRsk.id)
        setCurrentSwapId(json.onChainToRsk.id)
        return true
      }

      return false
    },
    [setCurrentSwapData, setCurrentSwapId],
  )

  /** Handle AON refund file validation */
  const handleAonRefund = useCallback(
    async (json: any): Promise<boolean> => {
      const contributionId =
        json.lightningToRsk?.contributionInfo?.contributionId || json.onChainToRsk?.contributionInfo?.contributionId
      if (!contributionId) {
        return false
      }

      try {
        const response = await getContributionForRefund({ variables: { contributionId } })
        const contribution = response.data?.contribution

        if (!validateContribution(contribution)) {
          return false
        }

        const getPaidPayment = contribution?.payments?.find((payment: any) => payment?.status === PaymentStatus.Paid)

        if (!getPaidPayment) {
          return false
        }

        return handlePaymentType(getPaidPayment, json)
      } catch (e) {
        console.log('ERROR GETTING CONTRIBUTION FOR REFUND', e)
        return false
      }
    },
    [getContributionForRefund, validateContribution, handlePaymentType],
  )

  /** Handle regular swap file validation */
  const handleRegularSwapFile = useCallback(
    (json: any): boolean => {
      if ('id' in json && json.id !== undefined) {
        const valid = ['id', 'privateKey'].every((key) => key in json)

        if (valid) {
          setCurrentSwapData(json, json.id)
          setCurrentSwapId(json.id)
          return true
        }
      }

      return false
    },
    [setCurrentSwapData, setCurrentSwapId],
  )

  const checkRefundJsonKeys = useCallback(
    async (json: any) => {
      console.log('REFUND FILE JSON', json)

      if ('isAonRefund' in json && json.isAonRefund) {
        const isValid = await handleAonRefund(json)
        if (!isValid) {
          setIsInvalid(true)
        }

        return
      }

      const isValid = handleRegularSwapFile(json)
      if (!isValid) {
        setIsInvalid(true)
      }
    },
    [handleAonRefund, handleRegularSwapFile],
  )

  const handleFile = useCallback(
    (inputFile: File) => {
      console.log('INPUT FILE', inputFile)
      if (inputFile.type === 'image/png') {
        QrScanner.scanImage(inputFile, { returnDetailedScanResult: true })
          .then((result) => {
            console.log('RESULT', result)
            checkRefundJsonKeys(JSON.parse(result.data))
          })
          .catch((e) => {
            console.log('QR SCAN ERROR', e)
            setIsInvalid(true)
          })
      } else {
        inputFile
          .text()
          .then(async (result) => {
            await checkRefundJsonKeys(JSON.parse(result))
          })
          .catch((e) => {
            setIsInvalid(true)
          })
      }
    },
    [checkRefundJsonKeys],
  )

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const inputFile = acceptedFiles[0]
      if (!inputFile) return
      handleFile(inputFile)
    },
    [handleFile],
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      application: ['json'],
      image: ['png'],
    },
  })

  return (
    <FieldContainer
      title={
        <>
          {label || name}
          {required ? '*' : ''}
        </>
      }
      subtitle={caption}
      error={isInvalid ? t('Invalid refund file') : null}
    >
      <Box flexGrow={1} {...getRootProps()} _hover={{ cursor: 'pointer' }} w="full">
        <input {...getInputProps()} />
        <UploadBox w="full" h={10} title={t('Upload refund file')} />
      </Box>
    </FieldContainer>
  )
}
