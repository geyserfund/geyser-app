import { Box, HStack, Link, Text, useBreakpointValue } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

import { Body1 } from '../../../../../../../components/typography'
import { getPath } from '../../../../../../../constants'
import { UserAvatarWithLink } from '../../../../../../../shared/components/display/UserAvatar'
import { useProjectContext } from '../../../../../context'
import { useExternalAccountsButtons } from '../../../../../pages1/projectView/views/body/sections/header/components/getExternalAccountsButtons'
import { NpubDisplay } from '../components/NpubDisplay'

export const CreatorSocial = () => {
  const isMd = useBreakpointValue({ base: true, sm: false, md: false, lg: true, xl: false }, { ssr: false })
  const { project } = useProjectContext()

  const user = project?.owners[0]?.user

  const accountButtonProps = useExternalAccountsButtons({
    accounts: user?.externalAccounts,
  })

  if (!user) {
    return null
  }

  return (
    <HStack spacing={2} px={1} py={1} borderRadius="8px" background="neutral.100">
      <Box>
        <UserAvatarWithLink height="30px" width="30px" user={user} seed={project.id} />
      </Box>
      <Link textDecoration="none" as={NavLink} to={getPath('userProfile', user.id)}>
        <Body1 semiBold color="neutral.600">
          {user.username}
        </Body1>
      </Link>
      <HStack>
        {accountButtonProps.map(({ username, icon, color, props, key }, index) => {
          if (!icon || !props) {
            return
          }

          if (key === 'nostr') {
            return <NpubDisplay key={index} npub={username} iconOnly={isMd} />
          }

          return (
            <Text
              key={index}
              {...props}
              whiteSpace="nowrap"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="8px"
              color="neutral.600"
              textDecoration={'none'}
              px={3}
              py={1}
            >
              {icon}
              {!isMd ? (
                <Body1 semiBold ml={2} maxW="12em" isTruncated>
                  {username}
                </Body1>
              ) : null}
            </Text>
          )
        })}
      </HStack>
    </HStack>
  )
}
