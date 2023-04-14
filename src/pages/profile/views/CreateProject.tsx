import { Link } from 'react-router-dom'

import { CardLayout, CardLayoutProps } from '../../../components/layouts'
import { Body2, H2 } from '../../../components/typography'
import { ButtonComponent } from '../../../components/ui'
import { getPath } from '../../../constants'

export const CreateProject = (props: CardLayoutProps) => {
  return (
    <CardLayout padding="20px" spacing="15px" {...props}>
      <H2>Launch your project</H2>
      <Body2 color="neutral.700">
        It only takes 2 minutes! If you’re not sure whether your idea is ready
        you can start and launch it later.
      </Body2>
      <ButtonComponent
        marginTop="20px "
        as={Link}
        to={getPath('privateProjectLaunch')}
        primary
      >
        Create Project
      </ButtonComponent>
    </CardLayout>
  )
}
