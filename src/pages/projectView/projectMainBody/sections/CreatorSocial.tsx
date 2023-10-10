import { Box, HStack, Link, Text, useBreakpointValue } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

import { Body1 } from '../../../../components/typography'
import { UserAvatarWithLink } from '../../../../components/ui/UserAvatar'
import { getPath } from '../../../../constants'
import { useProjectContext } from '../../../../context'
import { useExternalAccountsButtons } from '../../../../hooks/useExternalAccountsButtons'

export const CreatorSocial = () => {
  const isMd = useBreakpointValue({ base: false, md: true }, { ssr: false })
  const { project } = useProjectContext()

  const user = project?.owners[0]?.user

  const accountButtonProps = useExternalAccountsButtons({
    accounts: user?.externalAccounts,
  })

  if (!user) {
    return null
  }

  return (
    <HStack
      spacing={2}
      px={1}
      py={1}
      borderRadius="8px"
      background="neutral.100"
    >
      <Box>
        <UserAvatarWithLink
          height="30px"
          width="30px"
          user={user}
          seed={project.id}
        />
      </Box>
      <Link
        textDecoration="none"
        as={NavLink}
        to={getPath('userProfile', user.id)}
      >
        <Body1 semiBold color="neutral.600">
          {user.username}
        </Body1>
      </Link>
      <HStack>
        {accountButtonProps.map(({ username, icon, color, props }, index) => {
          if (!icon || !props) {
            return
          }

          return (
            <Text
              key={index}
              {...props}
              color={color}
              whiteSpace="nowrap"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="8px"
              px={3}
              py={1}
              variant="body"
              fontWeight={500}
              bg="neutral.100"
            >
              {icon}
              {isMd ? (
                <Text ml={2} variant="body" maxW="12em" isTruncated>
                  {username}
                </Text>
              ) : null}
            </Text>
          )
        })}
      </HStack>
    </HStack>
  )
}
