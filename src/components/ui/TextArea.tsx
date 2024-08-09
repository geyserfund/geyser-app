import { Box, Textarea, TextareaProps } from '@chakra-ui/react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { Body } from '@/shared/components/typography'
import useAutosizeTextArea from '@/utils/tools/useAutosizeTextArea'

interface TextBoxProps extends TextareaProps {
  error?: React.ReactNode
}

export const TextArea = ({ children, error, value, ...rest }: TextBoxProps) => {
  const { t } = useTranslation()

  const ownRef = useRef<HTMLTextAreaElement>(null)

  useAutosizeTextArea(ownRef.current, value)

  return (
    <Box width="100%">
      <Textarea ref={ownRef} isInvalid={Boolean(error)} value={value} borderRadius="8px" borderWidth="1px" {...rest}>
        {children}
      </Textarea>
      {error ? (
        typeof error === 'object' ? (
          error
        ) : (
          <Body size="xs" color="error.9" fontSize="12px" width="100%">
            {t(`${error}`)}
          </Body>
        )
      ) : null}
    </Box>
  )
}
