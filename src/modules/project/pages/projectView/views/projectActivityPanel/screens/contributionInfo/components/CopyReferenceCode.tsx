import { CopyIcon } from '@chakra-ui/icons'
import { Button, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { copyTextToClipboard } from '../../../../../../../../../utils'

interface CopyReferenceCodeProps {
  referenceCode?: string | null
  projectName: string
}

export const CopyReferenceCode = ({ referenceCode, projectName }: CopyReferenceCodeProps) => {
  const [copy, setCopy] = useState(false)

  const { t } = useTranslation()

  const handleCopyReferenceCode = () => {
    if (copy === false) {
      copyTextToClipboard(`${window.location.origin}/project/${projectName}`)
      setCopy(true)
      setTimeout(() => {
        setCopy(false)
      }, 2000)
    }
  }

  if (!referenceCode) return null
  return (
    <VStack align={'flex-start'} mt={2}>
      <Text color="neutral.900" fontWeight="bold" fontSize={'16px'}>
        {t('Share')}
      </Text>
      <Text color="neutral.900" fontWeight="medium" fontSize={'14px'}>
        {t('Consider sharing the project on social media to help the project reach even more people!')}
      </Text>
      <Button
        size="sm"
        color="neutral.900"
        leftIcon={<CopyIcon height="16px" color={'neutral.600'} />}
        variant="secondary"
        fontWeight={'medium'}
        fontSize={'16px'}
        width="100%"
        onClick={handleCopyReferenceCode}
      >
        {t('Copy link')}
      </Button>
    </VStack>
  )
}
