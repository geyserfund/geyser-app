import { Box, Text, Textarea, TextareaProps } from '@chakra-ui/react';
import React from 'react';
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
  onChange,
  supportMarkup,
  ...rest
}: ITextBoxProps) => {
  const classes = useStyles();

  const [dynamicHeight, setDynamicHeight] = useListenerState(minHeight);

  const getIntFromHeight = (val: any) => toInt(`${val}`.split('px')[0]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { scrollHeight, offsetHeight, textLength } = event.currentTarget;
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

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <Box width="100%">
      <Textarea
        isInvalid={Boolean(error)}
        className={classes.inputElement}
        minHeight={minHeight ? dynamicHeight.current : undefined}
        {...rest}
        onChange={handleChange}
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
