import { Avatar, Box, ButtonProps, Text, VStack } from '@chakra-ui/react'
import { useMatch, useNavigate } from 'react-router-dom'

import { CardLayout, CardLayoutProps } from '../../../components/layouts'
import { ButtonComponent } from '../../../components/ui'
import { getPath } from '../../../constants'
import {
  useActivitySubsciptionContext,
  useAuthContext,
  useFilterContext,
} from '../../../context'

type TabBarProps = CardLayoutProps

export const TabBar = (props: TabBarProps) => {
  const { clearFilter } = useFilterContext()
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { activities } = useActivitySubsciptionContext()

  const isCurrentTabActivity = useMatch(getPath('landingFeed'))

  const handleProjectsClick = () => {
    if (!isCurrentTabActivity) {
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
        backgroundColor={!isCurrentTabActivity ? 'brand.neutral100' : 'white'}
        onClick={handleProjectsClick}
      >
        Projects
      </ButtonComponent>
      <ButtonComponent
        noBorder
        {...buttonStyles}
        backgroundColor={isCurrentTabActivity ? 'brand.neutral100' : 'white'}
        onClick={handleActivityClick}
      >
        {user.imageUrl ? (
          <Avatar height="23px" width="23px" src={user.imageUrl} mr="10px" />
        ) : (
          ''
        )}
        <VStack
          h="100%"
          position="relative"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="16px">Activity</Text>
          {activities.length > 0 && (
            <Box
              height="10px"
              width="10px"
              top="-10px"
              right="-10px"
              borderRadius="50%"
              position="absolute"
              backgroundColor="primary.600"
            />
          )}
        </VStack>
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
