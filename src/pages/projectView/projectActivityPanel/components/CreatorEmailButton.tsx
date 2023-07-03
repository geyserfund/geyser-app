import { CopyIcon } from '@chakra-ui/icons'
import { Box, Button, ButtonProps } from '@chakra-ui/react'
import { useState } from 'react'

import { copyTextToClipboard } from '../../../../utils'

export const CreatorEmailButton = ({
  email,
  ...props
}: { email: string } & ButtonProps) => {
  const [isEmailCopied, setEmailCopied] = useState(false)

  const handleCopyEmail = () => {
    copyTextToClipboard(email)

    setEmailCopied(true)
    setTimeout(() => {
      setEmailCopied(false)
    }, 1000)
  }

  return (
    <Button
      w="100%"
      justifyContent="start"
      isActive={isEmailCopied}
      onClick={handleCopyEmail}
      variant="secondary"
      rightIcon={<CopyIcon />}
      {...props}
    >
      <Box as="span" flexGrow={1} textAlign="left">
        {email}
      </Box>
    </Button>
  )
}
