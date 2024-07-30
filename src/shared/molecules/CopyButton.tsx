import { Button, ButtonProps } from '@chakra-ui/react'
import { t } from 'i18next'
import { useState } from 'react'

type CopyButtonProps = {
  copyText: string
} & ButtonProps

export const CopyButton = ({ copyText, children, ...props }: CopyButtonProps) => {
  const [copy, setCopy] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText)
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 1000)
  }

  return (
    <Button
      {...props}
      leftIcon={copy ? undefined : props.leftIcon}
      rightIcon={copy ? undefined : props.rightIcon}
      onClick={handleCopy}
    >
      {copy ? t('Copied!') : children}
    </Button>
  )
}
