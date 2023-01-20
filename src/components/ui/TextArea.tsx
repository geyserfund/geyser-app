import { Box, Text, Textarea, TextareaProps } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { colors } from '../../constants';
import { useListenerState } from '../../hooks';
import { toInt } from '../../utils';

const useStyles = createUseStyles({
  inputElement: {
    borderWidth: '2px',
    '&:focus': {
      borderColor: `${colors.normalLightGreen} !important`,
      boxShadow: `0 0 0 1px ${colors.normalLightGreen}`,
    },
    '&:hover': {
      borderColor: colors.gray300,
    },
  },
});

interface ITextBoxProps extends TextareaProps {
  error?: React.ReactNode;
  supportMarkup?: boolean;
}

const HEIGHT_DIFFERENCE_BETWEEN_SCROLL_OFFSET = 4;
let minTextToReturnBackTo = 0;

export const TextArea = ({
  children,
  error,
  minHeight,
  maxHeight,
  supportMarkup,
  value,
  ...rest
}: ITextBoxProps) => {
  const classes = useStyles();

  const [dynamicHeight, setDynamicHeight] = useListenerState(minHeight);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const getIntFromHeight = (val: any) => toInt(`${val}`.split('px')[0]);

  const handleDynamicHeight = (target: HTMLTextAreaElement) => {
    const { scrollHeight, offsetHeight, textLength } = target;
    console.log('checking tagert', scrollHeight, offsetHeight, textLength);
    if (textLength > minTextToReturnBackTo) {
      if (
        minHeight &&
        maxHeight &&
        scrollHeight > offsetHeight &&
        scrollHeight <= getIntFromHeight(maxHeight)
      ) {
        if (!minTextToReturnBackTo) {
          minTextToReturnBackTo = textLength - 1;
        }

        setDynamicHeight(
          `${scrollHeight + HEIGHT_DIFFERENCE_BETWEEN_SCROLL_OFFSET}px`,
        );
      }
    } else {
      setDynamicHeight(minHeight);
    }
  };

  useEffect(() => {
    if (textAreaRef?.current) {
      handleDynamicHeight(textAreaRef.current);
    }
  }, [value]);

  return (
    <Box width="100%">
      <Textarea
        ref={textAreaRef}
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
          <Text color="brand.error" fontSize="12px" width="100%">
            {error}
          </Text>
        )
      ) : null}
    </Box>
  );
};
