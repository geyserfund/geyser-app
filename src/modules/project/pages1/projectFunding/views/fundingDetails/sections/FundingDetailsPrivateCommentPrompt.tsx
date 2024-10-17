import { ListItem, UnorderedList } from '@chakra-ui/react'
import { t } from 'i18next'

import { TextArea } from '@/components/ui'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { useRewardsAtom } from '@/modules/project/hooks/useProjectAtom'
import { CardLayout } from '@/shared/components/layouts'
import { Body, H1 } from '@/shared/components/typography'
import { PrivateCommentPrompt } from '@/types'

const privateCommentPromptMap: Record<PrivateCommentPrompt, string> = {
  [PrivateCommentPrompt.NostrNpub]: t('Provide your Nostr public address (npub)'),
  [PrivateCommentPrompt.LightningAddress]: t('Provide your Lightning Address for a full or partial refund'),
  [PrivateCommentPrompt.ProjectRewardSpecs]: t(
    'Specify your desired options for each reward, as mentioned on the rewards page.',
  ),
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

  console.log(fundingFormError)
  return (
    <CardLayout width="100%" mobileDense>
      <H1 size="2xl" bold>
        {t('Private message')}
      </H1>
      <Body size="md" light>
        {t(
          'Send a private message to the creator with a thank you note, feedback, or special requests. Sometimes, if you don’t provide these creator won’t be able to send you your reward.',
        )}
      </Body>
      {mergedPrivateCommentPrompts.length > 0 && (
        <>
          <Body size="md">
            {t('The creator has requested the following information from you. Make sure you add in the message box:')}
          </Body>

          <UnorderedList>
            {mergedPrivateCommentPrompts.map((prompt) => (
              <ListItem key={prompt}>{privateCommentPromptMap[prompt]}</ListItem>
            ))}
          </UnorderedList>
        </>
      )}
      <TextArea
        data-testid="funding-private-comment-input"
        placeholder={t('Enter your message here...')}
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
