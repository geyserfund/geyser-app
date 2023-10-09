import { Avatar, Heading, HStack, MenuItem } from '@chakra-ui/react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { Body2 } from '../../../components/typography'
import { getPath } from '../../../constants'
import { AuthContext } from '../../../context'

export const NavBarUserProfileMenuItem = () => {
  const { user } = useContext(AuthContext)

  return (
    <>
      <Body2
        fontSize={'10px'}
        xBold
        fontWeight={700}
        color={'neutral.500'}
        px={3}
      >
        Profile
      </Body2>
      <MenuItem
        as={Link}
        to={getPath('userProfile', user.id)}
        _focus={{ boxShadow: 'none' }}
        _hover={{ backgroundColor: 'neutral.200' }}
        width="100%"
        overflow="hidden"
      >
        <HStack spacing={1} overflow={'hidden'} width={'full'}>
          <Avatar height="22px" width="22px" src={user.imageUrl || ''} />

          <Heading fontWeight={600} fontSize="16px" as={'h6'} isTruncated>
            {user.username}
          </Heading>
        </HStack>
      </MenuItem>
    </>
  )
}
