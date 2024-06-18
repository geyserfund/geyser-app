import { CopyIcon } from '@chakra-ui/icons'
import { HStack, StackProps, VStack } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { MonoBody2 } from '../../../../../../../../../components/typography'
import { copyTextToClipboard } from '../../../../../../../../../utils'
import { useProjectContext } from '../../../../../../../context'
import { useFundingContext } from '../../../../../../../context/FundingProvider'

export const CreatorEmailContentButton = ({ ...props }: StackProps) => {
  const { t } = useTranslation()
  const [isCopied, setCopied] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  const { project } = useProjectContext()

  const {
    fundingTx,
    fundForm: { state },
  } = useFundingContext()

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

  const rewardEntries = state.rewardsByIDAndCount ? Object.entries(state.rewardsByIDAndCount) : []

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
        <MonoBody2 display="block" variant="caption">
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
        </MonoBody2>
        <MonoBody2 display="block" variant="caption">
          {t('This is my reference code:')}
        </MonoBody2>
        <MonoBody2 display="block" variant="caption" fontWeight="bold">
          {fundingTx.uuid}
        </MonoBody2>
        <MonoBody2 display="block" variant="caption">
          {t('Please send the goods to:')}
        </MonoBody2>
        <MonoBody2 display="block" variant="caption" fontWeight="bold">
          {'<'}
          {t('INCLUDE ADDRESS')}
          {'>'}
        </MonoBody2>

        <MonoBody2 display="block" variant="caption">
          {t('Cheers,')}
        </MonoBody2>
      </VStack>
      <CopyIcon />
    </HStack>
  )
}
