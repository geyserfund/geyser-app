import { CopyIcon } from '@chakra-ui/icons'
import { Button, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { CampaignContent, useProjectShare } from '../../../../../hooks/useProjectShare'

interface CopyProjectLinkProps {
  showCopy?: boolean
  projectName: string
}

export const CopyProjectLink = ({ showCopy }: CopyProjectLinkProps) => {
  const { t } = useTranslation()
  const { copied, copyProjectLinkToClipboard } = useProjectShare()

  if (!showCopy) return null
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
        onClick={() => copyProjectLinkToClipboard({ clickedFrom: CampaignContent.successScreen })}
      >
        {copied ? t('Project link copied!') : t('Copy link')}
      </Button>
    </VStack>
  )
}
