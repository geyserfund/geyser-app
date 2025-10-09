import { ListItem, UnorderedList, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { TextArea } from '@/components/ui'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H1 } from '@/shared/components/typography'
import { Feedback, FeedBackVariant } from '@/shared/molecules'
import { PrivateCommentPrompt } from '@/types'

const privateCommentPromptMap: Record<PrivateCommentPrompt, string> = {
  [PrivateCommentPrompt.NostrNpub]: t('Provide your Nostr public address (npub)'),
  [PrivateCommentPrompt.LightningAddress]: t('Provide your Lightning Address for a full or partial refund'),
  [PrivateCommentPrompt.ProjectRewardSpecs]: t('Add your product specifications (eg. T-shirt size)'),
}

export const FundingDetailsPrivateCommentPrompt = () => {
  const { rewards } = useRewardsAtom()

  const {
    formState: { privateComment, rewardsByIDAndCount },
    setTarget,
    setErrorstate,
    fundingFormError,
  } = useFundingFormAtom()

  const selectedRewards = rewards.filter((reward) => rewardsByIDAndCount && rewardsByIDAndCount[reward.id])

  const mergedPrivateCommentPrompts = Array.from(
    new Set(selectedRewards.flatMap((reward) => reward.privateCommentPrompts || [])),
  )
  return (
    <CardLayout width="100%" mobileDense>
      <H1 size="2xl" bold>
        {t('Private comments')}
      </H1>
      <Body size="md" light>
        {t('Leave a private message to the creator.')}
      </Body>
      {mergedPrivateCommentPrompts.length > 0 && (
        <Feedback variant={FeedBackVariant.WARNING} title={t('Do not close this window')}>
          <VStack alignItems="flex-start">
            <Body size="md">{t('The creator has requested: ')}</Body>

            <UnorderedList>
              {mergedPrivateCommentPrompts.map((prompt) => (
                <ListItem key={prompt}>{privateCommentPromptMap[prompt]}</ListItem>
              ))}
            </UnorderedList>
          </VStack>
        </Feedback>
      )}
      <TextArea
        data-testid="funding-private-comment-input"
        placeholder={t('Enter your comment here...')}
        fontSize="16px"
        resize="none"
        value={privateComment}
        maxLength={280}
        minHeight="128px"
        name="privateComment"
        backgroundColor={'utils.pbg'}
        onChange={setTarget}
        isInvalid={Boolean(fundingFormError.privateComment)}
        onFocus={() => setErrorstate({ key: 'privateComment', value: '' })}
      />
    </CardLayout>
  )
}
