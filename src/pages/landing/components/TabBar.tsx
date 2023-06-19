import { Avatar, Box, ButtonProps, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

  const { clearFilter } = useFilterContext()
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { hasNewActivity } = useActivitySubsciptionContext()

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
        backgroundColor={!isCurrentTabActivity ? 'neutral.100' : 'neutral.0'}
        onClick={handleProjectsClick}
        textTransform="capitalize"
      >
        {t('projects')}
      </ButtonComponent>
      <ButtonComponent
        noBorder
        {...buttonStyles}
        backgroundColor={isCurrentTabActivity ? 'neutral.100' : 'neutral.0'}
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
          <Text fontSize="16px" textTransform="capitalize">
            {t('activity')}
          </Text>
          {hasNewActivity && (
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
