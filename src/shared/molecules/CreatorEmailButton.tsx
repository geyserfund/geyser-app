import { Box, Button, ButtonProps, Icon } from '@chakra-ui/react'
import { useState } from 'react'
import { PiCopy } from 'react-icons/pi'

import { copyTextToClipboard } from '../../utils'

export const CreatorEmailButton = ({ email, ...props }: { email: string } & ButtonProps) => {
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
      variant="outline"
      colorScheme="primary1"
      rightIcon={<Icon as={PiCopy} />}
      {...props}
    >
      <Box as="span" flexGrow={1} textAlign="left">
        {email}
      </Box>
    </Button>
  )
}
