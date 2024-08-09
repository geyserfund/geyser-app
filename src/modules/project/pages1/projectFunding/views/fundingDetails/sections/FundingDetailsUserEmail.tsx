import { Input } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { useFundingFormAtom } from '@/modules/project/funding/hooks/useFundingFormAtom'
import { Feedback, FeedBackVariant } from '@/shared/molecules'

import { FieldContainer } from '../../../../../../../shared/components/form/FieldContainer'

export const FundingDetailsUserEmail = () => {
  const { t } = useTranslation()

  const {
    formState: { email, needsShipping },
    hasSelectedRewards,
    setTarget,
  } = useFundingFormAtom()

  if (!hasSelectedRewards) {
    return null
  }

  return (
    <>
      <FieldContainer
        title={t('Your email')}
        subtitle={t('This email will be used by the seller to reach out to you.')}
      >
        <Input type="email" name="email" placeholder="funderemail@gmail.com" value={email} onChange={setTarget} />
      </FieldContainer>
      {needsShipping && (
        <Feedback
          variant={FeedBackVariant.WARNING}
          text={t(
            'To receive the selected rewards, please send your shipping details to the creator’s email, which will be revealed in the success screen.',
          )}
        />
      )}
    </>
  )
}
