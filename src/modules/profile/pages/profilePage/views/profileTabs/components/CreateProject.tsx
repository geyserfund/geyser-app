import { useTranslation } from 'react-i18next'

import { CardLayout, CardLayoutProps } from '@/shared/components/layouts/CardLayout'
import { Body, H2 } from '@/shared/components/typography'

import { CreateAProjectButton } from '../../../components'

export const CreateProject = (props: CardLayoutProps) => {
  const { t } = useTranslation()
  return (
    <CardLayout padding="20px" spacing="15px" {...props}>
      <H2 size="2xl" medium>
        Projects
      </H2>
      <Body size="sm" light>
        {t(
          'Launching a project only takes 2 minutes! If you’re not sure whether your idea is ready you can start and launch it later.',
        )}
      </Body>
      <CreateAProjectButton />
    </CardLayout>
  )
}
