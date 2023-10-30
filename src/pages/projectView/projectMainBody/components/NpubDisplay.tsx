import { HStack, StackProps, Tooltip } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { NostrSvgIcon } from '../../../../components/icons'
import { Body2 } from '../../../../components/typography'
import { copyTextToClipboard } from '../../../../utils'

interface NpubDisplayProps extends StackProps {
  npub: string
}

export const NpubDisplay = ({ npub, ...rest }: NpubDisplayProps) => {
  const { t } = useTranslation()
  const [copy, setCopy] = useState(false)

  const handleCopyPubkey = () => {
    copyTextToClipboard(npub)
  }

  const handleOnCopy = () => {
    handleCopyPubkey()
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 1000)
  }

  const text = `${npub.slice(0, 10)}...${npub.slice(-4)}`

  return (
    <Tooltip
      label={copy ? t('Copied!') : t('Copy')}
      placement="top-start"
      closeOnClick={false}
    >
      <HStack
        padding="5px 10px"
        justifyContent="space-between"
        _hover={{ cursor: 'pointer' }}
        {...rest}
      >
        <HStack overflow="hidden">
          {
            <NostrSvgIcon
              boxSize={5}
              onClick={handleOnCopy}
              color={'neutral.600'}
            />
          }
          <Body2 isTruncated onClick={handleOnCopy} color={'neutral.600'}>
            {`${text}`}
          </Body2>
        </HStack>
      </HStack>
    </Tooltip>
  )
}
