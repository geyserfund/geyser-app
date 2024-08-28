import { Button, IconButton, Input, InputGroup, InputRightElement, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiCopy } from 'react-icons/pi'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { useFundingTxAtom } from '@/modules/project/funding/state'
import { Body } from '@/shared/components/typography'
import { useCopyToClipboard } from '@/shared/utils/hooks/useCopyButton'

export const SendEmailToCreator = () => {
  const { fundingTx } = useFundingTxAtom()
  const { hasSelectedRewards } = useFundingFormAtom()

  const { hasCopied, onCopy } = useCopyToClipboard(fundingTx.creatorEmail || '')

  if (!fundingTx.creatorEmail || !hasSelectedRewards) {
    return null
  }

  return (
    <VStack w="full" spacing={1} alignItems={'start'}>
      <Body size="2xl" bold>
        {t('Send email to the creator')}
      </Body>
      <Stack direction={{ base: 'column', lg: 'row' }} w="full">
        <VStack flex={1} spacing={1}>
          <InputGroup>
            <Input value={fundingTx.creatorEmail} isDisabled />
            <InputRightElement>
              <IconButton
                variant="soft"
                colorScheme={hasCopied ? 'primary1' : 'neutral1'}
                aria-label="copy-creator-email"
                icon={<PiCopy />}
                onClick={onCopy}
              />
            </InputRightElement>
          </InputGroup>
          <Body size="xs" light>
            {t(
              "To receive the selected items, you need to send your shipping details to the creator's email. Geyser does not want to store your private information for security reasons.",
            )}
          </Body>
        </VStack>
        <Button size="lg" variant="solid" colorScheme="primary1" width={{ base: 'full', lg: '210px' }}>
          {t('Send email')}
        </Button>
      </Stack>
    </VStack>
  )
}
