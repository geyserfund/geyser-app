import { Box, HStack, Link, Text } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

import { CardLayout } from '../../../../components/layouts'
import { UserAvatarWithLink } from '../../../../components/ui/UserAvatar'
import { getPath } from '../../../../constants'
import { useProjectContext } from '../../../../context'
import { useExternalAccountsButtons } from '../../../../hooks/useExternalAccountsButtons'
import { useMobileMode } from '../../../../utils'

export const CreatorSocial = () => {
  const isMobile = useMobileMode()
  const { project } = useProjectContext()

  const user = project?.owners[0]?.user

  const accountButtonProps = useExternalAccountsButtons({
    accounts: user?.externalAccounts,
  })

  if (!user) {
    return null
  }

  return (
    <CardLayout>
      <HStack spacing={4}>
        <Box>
          <UserAvatarWithLink
            height="40px"
            width="40px"
            user={user}
            seed={project.id}
          />
        </Box>
        <Link
          textDecoration="none"
          as={NavLink}
          to={getPath('userProfile', user.id)}
        >
          <Text variant="h3">{user.username}</Text>
        </Link>
        <HStack ml={2}>
          {accountButtonProps.map(({ key, username, icon, color, props }) => {
            if (!icon || !props) {
              return
            }

            return (
              <Text
                {...props}
                color={color}
                whiteSpace="nowrap"
                display="flex"
                justifyContent="center"
                alignItems="center"
                borderRadius="8px"
                px={3}
                py={1}
                key={key}
                variant="body"
                fontWeight={500}
                bg="neutral.100"
              >
                <Box as="span" pr={2}>
                  {icon}
                </Box>
                {isMobile ? null : (
                  <Text variant="body" maxW="12em" isTruncated>
                    {username}
                  </Text>
                )}
              </Text>
            )
          })}
        </HStack>
      </HStack>
    </CardLayout>
  )
}
