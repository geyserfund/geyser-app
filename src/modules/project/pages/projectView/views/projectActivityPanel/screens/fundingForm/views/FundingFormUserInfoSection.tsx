import { Input, VStack } from '@chakra-ui/react'
import { MouseEventHandler } from 'react'
import { useTranslation } from 'react-i18next'

import { FieldContainer } from '../../../../../../../../../forms/components/FieldContainer'
import { useFundingContext } from '../../../../../../../context'
import { SectionTitleBlock } from '../../../components/SectionTitleBlock'
import { ProjectFundingFormCommentField } from '../components/ProjectFundingFormCommentField'

type Props = {
  onBackClick: MouseEventHandler<HTMLButtonElement>
}

export const FundingFormUserInfoSection = ({ onBackClick }: Props) => {
  const { t } = useTranslation()
  const {
    fundForm: {
      setState,
      setTarget,
      needsShipping,
      hasSelectedRewards,
      state: { comment, email },
    },
  } = useFundingContext()

  return (
    <VStack alignItems="start" width="100%" flexGrow={1} spacing={5}>
      <SectionTitleBlock title={t('Checkout')} onBackClick={onBackClick} />

      {hasSelectedRewards ? (
        <>
          {needsShipping ? (
            <FieldContainer
              title={t('Shipping details')}
              subtitle={t(
                'To receive the selected rewards, please send your shipping details to the creator’s email, which will be revealed in the success screen.',
              )}
              boldTitle={true}
            />
          ) : null}
          <FieldContainer title="Your email*" subtitle="The seller may want to reach out.">
            <Input type="email" name="email" placeholder="funderemail@gmail.com" value={email} onChange={setTarget} />
          </FieldContainer>
        </>
      ) : null}

      <FieldContainer title={t('Public comment')} boldTitle={true}>
        <ProjectFundingFormCommentField comment={comment} setTarget={setTarget} setFormState={setState} width="full" />
      </FieldContainer>
    </VStack>
  )
}
