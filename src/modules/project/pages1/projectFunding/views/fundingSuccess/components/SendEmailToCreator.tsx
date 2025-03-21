import { Button, IconButton, Input, InputGroup, InputRightElement, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { PiCopy, PiPaperPlaneTilt } from 'react-icons/pi'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { fundingContributionAtom } from '@/modules/project/funding/state/fundingContributionAtom.ts'
import { Body } from '@/shared/components/typography'
import { useCopyToClipboard } from '@/shared/utils/hooks/useCopyButton'

export const SendEmailToCreator = () => {
  const fundingContribution = useAtomValue(fundingContributionAtom)
  const { hasSelectedRewards } = useFundingFormAtom()

  const { hasCopied, onCopy } = useCopyToClipboard(fundingContribution.creatorEmail || '')

  if (!fundingContribution.creatorEmail || !hasSelectedRewards) {
    return null
  }

  return (
    <VStack w="full" spacing={1} alignItems={'start'}>
      <Stack direction={{ base: 'column', lg: 'row' }} w="full">
        <VStack flex={1} spacing={1}>
          <InputGroup>
            <Input value={fundingContribution.creatorEmail} isDisabled _disabled={{ color: 'neutral1.12' }} />
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
        <Button
          variant="soft"
          size="lg"
          colorScheme="neutral1"
          border="1px solid"
          borderColor="neutral1.3"
          width="40px"
          height="40px"
          bg="white"
        >
          <PiPaperPlaneTilt style={{ transform: 'rotate(45deg)' }} fontSize={20} />
        </Button>
      </Stack>
    </VStack>
  )
}
