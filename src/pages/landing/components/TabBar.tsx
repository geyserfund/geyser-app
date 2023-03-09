import { Avatar, ButtonProps } from '@chakra-ui/react'
import { useMatch, useNavigate } from 'react-router-dom'

import { CardLayout, CardLayoutProps } from '../../../components/layouts'
import { ButtonComponent } from '../../../components/ui'
import { getPath } from '../../../constants'
import { useAuthContext, useFilterContext } from '../../../context'

type TabBarProps = CardLayoutProps

export const TabBar = (props: TabBarProps) => {
  const { clearFilter } = useFilterContext()
  const navigate = useNavigate()
  const { user } = useAuthContext()

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
        {...buttonStyles}
        backgroundColor={isCurrentTabProjects ? 'brand.neutral100' : 'white'}
        onClick={handleProjectsClick}
      >
        Projects
      </ButtonComponent>
      <ButtonComponent
        noBorder
        {...buttonStyles}
        backgroundColor={!isCurrentTabProjects ? 'brand.neutral100' : 'white'}
        onClick={handleActivityClick}
      >
        {user.imageUrl ? (
          <Avatar height="23px" width="23px" src={user.imageUrl} mr="10px" />
        ) : (
          ''
        )}
        Activity
      </ButtonComponent>
    </CardLayout>
  )
}

const buttonStyles: ButtonProps = {
  size: 'sm',
  flex: 1,
  textAlign: 'center',
  borderRadius: '8px',
  padding: '5px',
  fontSize: '16px',
}
