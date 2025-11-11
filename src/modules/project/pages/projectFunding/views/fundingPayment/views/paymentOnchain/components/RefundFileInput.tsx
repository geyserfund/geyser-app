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

  const checkRefundJsonKeys = useCallback(
    async (json: any) => {
      console.log('REFUND FILE JSON', json)
      if ('id' in json && json.id !== undefined) {
        const valid = ['id', 'privateKey'].every((key) => key in json)

        if (valid) {
          setCurrentSwapData(json, json.id)
          setCurrentSwapId(json.id)
          return
        }
      }

      setIsInvalid(true)
    },
    [setCurrentSwapData, setCurrentSwapId],
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
