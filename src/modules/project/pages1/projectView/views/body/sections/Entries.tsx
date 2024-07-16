import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

import { useInitEntries } from '@/modules/project/hooks/useInitEntries'

import { useProjectAtom } from '../../../../../hooks/useProjectAtom'
import { RenderEntries } from '../../posts/RenderEntries'
import { BodySectionLayout } from '../components'

export const Entries = forwardRef<HTMLDivElement>((_, ref) => {
  const { t } = useTranslation()

  const { loading } = useProjectAtom()

  const { entriesLoading } = useInitEntries(true)

  if (loading || entriesLoading) {
    return null
  }

  return (
    <BodySectionLayout ref={ref} title={t('Posts')}>
      <RenderEntries />
    </BodySectionLayout>
  )
})
