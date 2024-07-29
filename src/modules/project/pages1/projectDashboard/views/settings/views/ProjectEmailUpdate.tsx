import { useTranslation } from 'react-i18next'

import { TextInputBox } from '@/components/ui'
import { useAuthContext } from '@/context'
import { FieldContainer } from '@/shared/components/form'
import { Body } from '@/shared/components/typography'

export const ProjectEmailUpdate = () => {
  const { t } = useTranslation()

  const { user } = useAuthContext()

  return (
    <FieldContainer title={t('Email')}>
      <TextInputBox isDisabled={true} name="email" value={user.email || ''} />
      <Body size="xs">
        {t(
          "Project notifications and updates are sent to the project creator's email. This email can be edited from the creator's profile Settings.",
        )}
      </Body>
    </FieldContainer>
  )
}
