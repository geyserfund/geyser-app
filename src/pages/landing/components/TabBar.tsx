import { useMatch, useNavigate } from 'react-router-dom'

import { CardLayout, CardLayoutProps } from '../../../components/layouts'
import { ButtonComponent } from '../../../components/ui'
import { getPath } from '../../../constants'
import { useFilterContext } from '../../../context'

type TabBarProps = CardLayoutProps

export const TabBar = (props: TabBarProps) => {
  const { clearFilter } = useFilterContext()
  const navigate = useNavigate()

  const isCurrentTabProjects = useMatch(getPath('landingPage'))

  const handleProjectsClick = () => {
    if (isCurrentTabProjects) {
      clearFilter()
      return
    }

    navigate(getPath('landingPage'))
  }

  const handleActivityClick = () => {
    navigate(getPath('landingFeed'))
  }

  return (
    <CardLayout padding="10px" direction="row" width="100%" {...props}>
      <ButtonComponent
        noBorder
        size="sm"
        flex={1}
        textAlign="center"
        backgroundColor={isCurrentTabProjects ? 'brand.neutral100' : 'white'}
        borderRadius="8px"
        padding="5px"
        onClick={handleProjectsClick}
      >
        Projects
      </ButtonComponent>
      <ButtonComponent
        noBorder
        size="sm"
        flex={1}
        textAlign="center"
        borderRadius="8px"
        padding="5px"
        backgroundColor={!isCurrentTabProjects ? 'brand.neutral100' : 'white'}
        onClick={handleActivityClick}
      >
        Activity
      </ButtonComponent>
    </CardLayout>
  )
}
