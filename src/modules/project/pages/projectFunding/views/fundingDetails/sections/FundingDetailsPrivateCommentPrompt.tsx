import { t } from 'i18next'

import { TextArea } from '@/components/ui'
import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { Body, H1 } from '@/shared/components/typography'

export const FundingDetailsPrivateCommentPrompt = () => {
  const {
    formState: { privateComment },
    setTarget,
    setErrorstate,
    fundingFormError,
  } = useFundingFormAtom()

  return (
    <CardLayout width="100%" mobileDense>
      <H1 size="2xl" bold sx={{ textWrap: 'balance' }}>
        {t('Private comments')}
      </H1>
      <Body size="md" light>
        {t('Leave a private message to the creator.')}
      </Body>
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
