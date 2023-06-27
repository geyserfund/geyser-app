import { Box, Text, Textarea, TextareaProps } from '@chakra-ui/react'
import { forwardRef, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { createUseStyles } from 'react-jss'

import { AppTheme } from '../../context'
import { useListenerState } from '../../hooks'
import { toInt } from '../../utils'

const useStyles = createUseStyles(({ colors }: AppTheme) => ({
  inputElement: {
    borderRadius: '8px',
    borderWidth: '2px',
    '&:focus': {
      borderColor: `${colors.neutral[500]} !important`,
      boxShadow: `0 0 0 1px ${colors.neutral[500]}`,
    },
    '&:hover': {
      borderColor: colors.neutral[400],
    },
  },
}))

interface ITextBoxProps extends TextareaProps {
  error?: React.ReactNode
  supportMarkup?: boolean
}

const HEIGHT_DIFFERENCE_BETWEEN_SCROLL_OFFSET = 4
let minTextToReturnBackTo = 5

export const TextArea = forwardRef<HTMLTextAreaElement, ITextBoxProps>(
  (
    { children, error, minHeight, maxHeight, supportMarkup, value, ...rest },
    forwardedRef,
  ) => {
    const { t } = useTranslation()
    const classes = useStyles()

    const [dynamicHeight, setDynamicHeight] = useListenerState(minHeight)

    const ownRef = useRef<HTMLTextAreaElement>(null)

    const getIntFromHeight = (val: any) => toInt(`${val}`.split('px')[0])

    const handleDynamicHeight = (target: HTMLTextAreaElement) => {
      const { scrollHeight, offsetHeight, textLength } = target
      if (textLength < minTextToReturnBackTo) {
        setDynamicHeight(minHeight)
      }

      if (
        minHeight &&
        maxHeight &&
        scrollHeight > offsetHeight &&
        scrollHeight <= getIntFromHeight(maxHeight)
      ) {
        if (!minTextToReturnBackTo) {
          minTextToReturnBackTo = textLength - 1
        }

        setDynamicHeight(
          `${scrollHeight + HEIGHT_DIFFERENCE_BETWEEN_SCROLL_OFFSET}px`,
        )
      }
    }

    useEffect(() => {
      if (ownRef?.current) {
        handleDynamicHeight(ownRef.current)
      }
    }, [value])

    return (
      <Box width="100%">
        <Textarea
          ref={forwardedRef || ownRef}
          isInvalid={Boolean(error)}
          className={classes.inputElement}
          minHeight={minHeight ? dynamicHeight.current : undefined}
          value={value}
          {...rest}
        >
          {children}
        </Textarea>
        {error ? (
          typeof error === 'object' ? (
            error
          ) : (
            <Text color="secondary.red" fontSize="12px" width="100%">
              {t(`${error}`)}
            </Text>
          )
        ) : null}
      </Box>
    )
  },
)
