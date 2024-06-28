import { Avatar, Button, HStack } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

import { getPath } from '../../../../../../../../../constants'
import { useProjectAtom } from '../../../../../../../hooks/useProjectAtom'
import { getExternalAccountsButtons } from './getExternalAccountsButtons'

export const CreatorSocial = () => {
  const { projectOwner } = useProjectAtom()

  const user = projectOwner?.user

  const accountButtonProps = getExternalAccountsButtons({
    accounts: user?.externalAccounts,
  })

  if (!user) {
    return null
  }

  return (
    <HStack spacing={0.5}>
      <Button
        as={NavLink}
        to={getPath('userProfile', user.id)}
        size="xs"
        variant="outline"
        colorScheme="neutral1"
        leftIcon={<Avatar p={0} h="14px" w="14px" src={user.imageUrl || ''} />}
      >
        {user.username}
      </Button>

      {accountButtonProps.map(({ icon, props, key }) => {
        if (!icon || !props) {
          return
        }

        return (
          <Button
            key={key}
            aria-label={`user-external-account-link-${key}`}
            size={'xs'}
            minWidth="20px"
            variant="outline"
            colorScheme="neutral1"
            p={'0'}
            {...props}
          >
            {icon}
          </Button>
        )
      })}
    </HStack>
  )
}
