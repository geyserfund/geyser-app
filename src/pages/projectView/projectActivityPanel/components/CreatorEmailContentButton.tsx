import { CopyIcon } from '@chakra-ui/icons'
import { HStack, StackProps, Text, VStack } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useProjectContext } from '../../../../context'
import { copyTextToClipboard } from '../../../../utils'

export const CreatorEmailContentButton = ({ ...props }: StackProps) => {
  const { t } = useTranslation()
  const [isCopied, setCopied] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  const {
    project,
    fundingFlow: { fundingTx },
    fundForm: { state },
  } = useProjectContext()

  const handleCopyContent = () => {
    const content = ref.current?.innerText || ''
    copyTextToClipboard(content)

    if (content) {
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 1000)
    }
  }

  const rewards = project ? project.rewards : []

  const rewardEntries = state.rewardsByIDAndCount
    ? Object.entries(state.rewardsByIDAndCount)
    : []

  if (!fundingTx) {
    return null
  }

  return (
    <HStack
      w="100%"
      ref={ref}
      px={2}
      py={4}
      justifyContent="start"
      alignItems="center"
      maxHeight="auto"
      height="auto"
      cursor="pointer"
      border="2px solid"
      borderRadius="8px"
      _hover={{ borderColor: 'primary.400' }}
      bg={isCopied ? 'primary.100' : 'neutral.0'}
      borderColor={isCopied ? 'primary.400' : 'neutral.200'}
      onClick={handleCopyContent}
      {...props}
    >
      <VStack flexGrow={1} textAlign="left" alignItems="start">
        <Text display="block" variant="caption">
          {t('Hi,\nI just purchased the following items on Geyser:')}{' '}
          <b>
            {rewardEntries.map(([key, value], index) => {
              const reward = rewards.find(({ id }) => id === key)
              if (reward) {
                return (
                  <span key={key}>
                    {reward.name} x{value}
                    {index < rewardEntries.length - 1 ? ', ' : ''}
                  </span>
                )
              }
            })}
          </b>
        </Text>
        <Text display="block" variant="caption">
          {t('This is my reference code:')}
        </Text>
        <Text display="block" variant="caption" fontWeight="bold">
          {fundingTx.uuid}
        </Text>
        <Text display="block" variant="caption">
          {t('I’d like it to be shipped to the following address:')}
        </Text>
        <Text display="block" variant="caption" fontWeight="bold">
          {'<'}
          {t('ADD RECEIVING POSTAL ADDRESS')}
          {'>'}
        </Text>

        <Text display="block" variant="caption">
          {t('Cheers,')}
        </Text>
      </VStack>
      <CopyIcon />
    </HStack>
  )
}
