import { HStack, StackProps } from '@chakra-ui/react'
import { BsTwitter } from 'react-icons/bs'

import { CloseIconButton } from '../../../components/buttons'
import { BoltSvgIcon, NostrSvgIcon } from '../../../components/icons'
import { Body2 } from '../../../components/typography'
import { colors } from '../../../styles'
import { ExternalAccountType } from '../../auth'

const externalAccountColorMap = {
  [ExternalAccountType.twitter]: colors.twitter,
  [ExternalAccountType.lightning]: colors.lightning,
  [ExternalAccountType.nostr]: colors.nostr,
} as { [key: string]: string }

const externalAccountIconMap = {
  [ExternalAccountType.twitter]: BsTwitter,
  [ExternalAccountType.lightning]: BoltSvgIcon,
  [ExternalAccountType.nostr]: NostrSvgIcon,
} as { [key: string]: any }

interface ExternalAccountBodyProps extends StackProps {
  type: ExternalAccountType
  username: string
  handleDelete?: () => void
  isLoading?: boolean
  as?: any
  to?: string
  href?: string
  isExternal?: boolean
}

export const ExternalAccountBody = ({
  type,
  username,
  handleDelete,
  isLoading,
  ...rest
}: ExternalAccountBodyProps) => {
  const Icon = externalAccountIconMap[type]

  const handleOnCloseClick = handleDelete
    ? (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        handleDelete()
      }
    : undefined

  return (
    <>
      <HStack
        w="100%"
        backgroundColor="neutral.100"
        borderRadius="8px"
        color={externalAccountColorMap[type]}
        padding="5px 10px"
        justifyContent="space-between"
        _hover={{ cursor: 'pointer' }}
        {...rest}
      >
        <HStack overflow="hidden">
          <Icon height="20px" width="20px" />
          <Body2 isTruncated>{username}</Body2>
        </HStack>
        {handleOnCloseClick && <CloseIconButton onClick={handleOnCloseClick} />}
      </HStack>
    </>
  )
}
