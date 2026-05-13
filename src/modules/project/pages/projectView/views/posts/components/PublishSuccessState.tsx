import { Box, Button, HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiArrowSquareOut, PiCheck, PiCopy, PiPencilSimple } from 'react-icons/pi'
import { useNavigate } from 'react-router'

import { useProjectAtom } from '@/modules/project/hooks/useProjectAtom'
import { getProjectPostViewUrl } from '@/modules/project/tools/generateProjectJsonLD.ts'
import { Body, H2 } from '@/shared/components/typography'
import { getPath } from '@/shared/constants/index.ts'
import { useCopyToClipboard } from '@/shared/utils/hooks/useCopyButton'

type PublishSuccessStateProps = {
  /** The published post id */
  postId: number
  /** Caption / description text used to build share copy */
  description: string
  onWriteAnother: () => void
  onClose: () => void
}

/** Shown inside WriteUpdateModal after a successful publish. */
export const PublishSuccessState = ({ postId, description, onWriteAnother, onClose }: PublishSuccessStateProps) => {
  const navigate = useNavigate()
  const { project } = useProjectAtom()

  const postUrl = getProjectPostViewUrl(project.name, postId)
  const { onCopy, hasCopied } = useCopyToClipboard(postUrl)

  const handleViewPost = () => {
    onClose()
    navigate(getPath('projectPostView', project.name, String(postId)))
  }

  return (
    <VStack w="full" spacing={6} py={2}>
      {/* Celebration icon */}
      <VStack spacing={3}>
        <Box
          w="56px"
          h="56px"
          borderRadius="16px"
          bg="primary1.9"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="28px"
        >
          🚀
        </Box>
        <VStack spacing={1}>
          <H2 size="xl" bold>
            {t('Your update is published!')}
          </H2>
          <Body size="sm" muted textAlign="center">
            {t('Your supporters can now see this update.')}
          </Body>
        </VStack>
      </VStack>

      {/* Public link */}
      <VStack w="full" alignItems="start" spacing={2}>
        <Body size="xs" medium muted textTransform="uppercase" letterSpacing="wider">
          {t('Public link')}
        </Body>
        <HStack w="full" border="1px solid" borderColor="neutral1.6" borderRadius="8px" overflow="hidden">
          <Body size="sm" flex={1} px={3} py={2} isTruncated color="utils.text">
            {postUrl}
          </Body>
          <Button
            size="sm"
            variant="ghost"
            colorScheme={hasCopied ? 'primary1' : 'neutral1'}
            borderLeft="1px solid"
            borderColor="neutral1.6"
            borderRadius={0}
            px={3}
            h="full"
            minH="40px"
            rightIcon={hasCopied ? <PiCheck /> : <PiCopy />}
            onClick={onCopy}
            aria-label={t('Copy link')}
          >
            {hasCopied ? t('Copied!') : t('Copy')}
          </Button>
        </HStack>
      </VStack>

      {/* Action buttons */}
      <VStack w="full" spacing={2}>
        <Button
          w="full"
          size="lg"
          variant="solid"
          colorScheme="primary1"
          rightIcon={<PiArrowSquareOut />}
          onClick={handleViewPost}
        >
          {t('View post')}
        </Button>
        <HStack w="full" spacing={2}>
          <Button
            flex={1}
            size="md"
            variant="soft"
            colorScheme="neutral1"
            rightIcon={<PiPencilSimple />}
            onClick={onWriteAnother}
          >
            {t('Write another')}
          </Button>
          <Button flex={1} size="md" variant="ghost" colorScheme="neutral1" onClick={onClose}>
            {t('Close')}
          </Button>
        </HStack>
      </VStack>
    </VStack>
  )
}
