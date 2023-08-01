import { useTranslation } from 'react-i18next'

import { CardLayout, CardLayoutProps } from '../../../../components/layouts'
import { Body2, H2 } from '../../../../components/typography'
import { CreateAProjectButton } from '../../components'

export const CreateProject = (props: CardLayoutProps) => {
  const { t } = useTranslation()
  return (
    <CardLayout padding="20px" spacing="15px" {...props}>
      <H2>Projects</H2>
      <Body2 color="neutral.700">
        {t(
          'Launching a project only takes 2 minutes! If you’re not sure whether your idea is ready you can start and launch it later.',
        )}
      </Body2>
      <CreateAProjectButton />
    </CardLayout>
  )
}
