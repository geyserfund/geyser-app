import { CheckIcon, CloseIcon, CopyIcon } from '@chakra-ui/icons'
import { HStack, Icon, StackProps, Tooltip } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsFacebook, BsGithub, BsGoogle } from 'react-icons/bs'
import { RiTwitterXLine } from 'react-icons/ri'

import { BoltSvgIcon, FountainIcon, NostrSvgIcon } from '../../../components/icons'
import { Body2 } from '../../../components/typography'
import { ExternalAccountType } from '../../auth'

const externalAccountIconMap = {
  [ExternalAccountType.github]: BsGithub,
  [ExternalAccountType.google]: BsGoogle,
  [ExternalAccountType.facebook]: BsFacebook,
  [ExternalAccountType.twitter]: RiTwitterXLine,
  [ExternalAccountType.lightning]: BoltSvgIcon,
  [ExternalAccountType.nostr]: NostrSvgIcon,
  [ExternalAccountType.fountain]: FountainIcon,
} as { [key: string]: any }

export interface ExternalAccountBodyProps extends StackProps {
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
  const { t } = useTranslation()
  const [copy, setCopy] = useState(false)
  const ExternalIcon = externalAccountIconMap[type] || null

  const handleOnCloseClick = handleDelete
    ? (event: React.MouseEvent<SVGElement>) => {
        event.preventDefault()
        handleDelete()
      }
    : undefined

  const handleOnCopy = handleCopy
    ? () => {
        handleCopy()
        setCopy(true)
        setTimeout(() => {
          setCopy(false)
        }, 1000)
      }
    : undefined

  const text = type === ExternalAccountType.nostr ? `${username.slice(0, 10)}...${username.slice(-4)}` : username

  const hasTooltip = handleCopy && type === ExternalAccountType.nostr

  const renderBody = () => (
    <HStack w="100%" padding="5px 10px" justifyContent="space-between" _hover={{ cursor: 'pointer' }} {...rest}>
      <HStack overflow="hidden">
        {ExternalIcon && <ExternalIcon boxSize={5} onClick={handleOnCopy} />}
        <Body2 isTruncated fontWeight="bold" onClick={handleOnCopy}>
          {`${text}`}
        </Body2>
        {handleOnCopy && <Icon as={copy ? CheckIcon : CopyIcon} boxSize={3} onClick={handleOnCopy} />}
        {handleOnCloseClick && <Icon as={CloseIcon} boxSize={2} onClick={handleOnCloseClick} />}
      </HStack>
    </HStack>
  )

  if (hasTooltip) {
    return (
      <Tooltip label={copy ? t('Copied!') : t('Copy')} placement="top-start" closeOnClick={false}>
        {renderBody()}
      </Tooltip>
    )
  }

  return <>{renderBody()}</>
}
