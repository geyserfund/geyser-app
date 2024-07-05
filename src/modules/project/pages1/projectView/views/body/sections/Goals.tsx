import { useTranslation } from 'react-i18next'

import { RenderGoals } from '../../goals/RenderGoals'
import { BodySectionLayout } from '../components'

export const Goals = () => {
  const { t } = useTranslation()

  return (
    <BodySectionLayout title={t('Goals')}>
      <RenderGoals />
    </BodySectionLayout>
  )
}
