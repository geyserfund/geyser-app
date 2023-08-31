import { useState } from 'react'
import { HStack, StackProps, Icon, Tooltip, Box } from '@chakra-ui/react'
import { CheckIcon, CopyIcon, CloseIcon } from '@chakra-ui/icons'
import { BsTwitter } from 'react-icons/bs'

import { BoltSvgIcon, NostrSvgIcon } from '../../../components/icons'
import { Body2 } from '../../../components/typography'
import { socialColors } from '../../../styles'
import { ExternalAccountType } from '../../auth'
import { useNotification } from '../../../utils'

const externalAccountColorMap = {
  [ExternalAccountType.twitter]: socialColors.twitter,
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
  handleCopy?: () => void
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
  handleCopy,
  isLoading,
  ...rest
}: ExternalAccountBodyProps) => {
  const [copy, setCopy] = useState(false)
  const Icon = externalAccountIconMap[type]
  const { toast } = useNotification()

  const handleOnCloseClick = handleDelete
    ? (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        handleDelete()
      }
    : undefined

  const handleOnCopy = handleCopy
    ? () => {
        handleCopy()
        setCopy(true)
        toast({
          title: 'Copied!',
        })
        setTimeout(() => {
          setCopy(false)
        }, 1000)
      }
    : undefined

  const text =
    type === ExternalAccountType.nostr
      ? `${username.slice(0, 10)}...${username.slice(-4)}`
      : username

  return (
    <>
      <HStack
        w="100%"
        color={externalAccountColorMap[type]}
        padding="5px 10px"
        justifyContent="space-between"
        _hover={{ cursor: 'pointer' }}
        {...rest}
      >
        <HStack overflow="hidden">
          <Icon boxSize={5} />
          <Body2 isTruncated fontWeight="bold">
            {text}
          </Body2>
          {handleOnCopy && (
            <Icon
              as={copy ? CheckIcon : CopyIcon}
              boxSize={3}
              onClick={handleOnCopy}
            />
          )}
          {handleOnCloseClick && (
            <Icon as={CloseIcon} boxSize={2} onClick={handleOnCloseClick} />
          )}
        </HStack>
      </HStack>
    </>
  )
}
