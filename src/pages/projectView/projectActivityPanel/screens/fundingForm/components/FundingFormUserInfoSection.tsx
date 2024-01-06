import { ArrowBackIcon } from '@chakra-ui/icons'
import { Button, HStack, Input, VStack } from '@chakra-ui/react'
import { MouseEventHandler } from 'react'
import { useTranslation } from 'react-i18next'

import { SectionTitle } from '../../../../../../components/ui'
import { useProjectContext } from '../../../../../../context'
import { FieldContainer } from '../../../../../../forms/components/FieldContainer'
import { ProjectFundingFormCommentField } from '../../../../projectMainBody/components'

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
  } = useProjectContext()
  return (
    <VStack alignItems="start" width="100%" flexGrow={1} px={1} spacing={5}>
      <HStack>
        <Button onClick={onBackClick} variant="transparent">
          <ArrowBackIcon />
        </Button>
        <SectionTitle>{t('Final details')}</SectionTitle>
      </HStack>

      {hasSelectedRewards ? (
          <>
            {needsShipping ? (
                <FieldContainer
                    title={t('Delivery Address')}
                    subtitle={t(
                        "To receive the selected items, you will need to send your shipping details to the creator's email. Which will be revealed in the success screen.",
                    )}
                    boldTitle={true}
                />
            ) : null}
            <FieldContainer
                title="Your email*"
                subtitle="The seller may want to reach out."
            >
              <Input
                  type="email"
                  name="email"
                  placeholder="funderemail@gmail.com"
                  value={email}
                  onChange={setTarget}
              />
            </FieldContainer>
          </>
      ) : null}

      <FieldContainer title={t('Public comment')} boldTitle={true}>
        <ProjectFundingFormCommentField
          comment={comment}
          setTarget={setTarget}
          setFormState={setState}
          width="full"
        />
      </FieldContainer>
    </VStack>
  )
}
