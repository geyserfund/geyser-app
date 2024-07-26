import { Box } from '@chakra-ui/react'
import { useSetAtom } from 'jotai'
import QrScanner from 'qr-scanner'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'

import { UploadBox } from '../../../../../../../../../../../components/ui'
import { FieldContainer } from '../../../../../../../../../../../shared/components/form/FieldContainer'
import { currentSwapIdAtom, useRefundFileAdd } from '../../../../../../../../../funding/state'

export type ImageFieldProps = {
  name: string
  caption?: string
  label?: string
  required?: boolean
}

export const RefundFileInput = ({ name, caption, required, label }: ImageFieldProps) => {
  const { t } = useTranslation()

  const addRefundFile = useRefundFileAdd()
  const setCurrentSwapId = useSetAtom(currentSwapIdAtom)

  const [isInvalid, setIsInvalid] = useState(false)

  const checkRefundJsonKeys = useCallback(
    async (json: any) => {
      if ('id' in json && json.id !== undefined) {
        const valid = ['id', 'asset', 'privateKey'].every((key) => key in json)

        if (valid) {
          setCurrentSwapId(json.id)
          addRefundFile(json)
          return
        }
      }

      setIsInvalid(true)
    },
    [addRefundFile, setCurrentSwapId],
  )

  const handleFile = useCallback(
    (inputFile: File) => {
      if (inputFile.type === 'image/png') {
        QrScanner.scanImage(inputFile, { returnDetailedScanResult: true })
          .then((result) => checkRefundJsonKeys(JSON.parse(result.data)))
          .catch((e) => {
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
