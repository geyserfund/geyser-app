import { Box } from '@chakra-ui/react'
import { ThemeProvider } from '@remirror/react-components'
import { AllStyledComponent } from '@remirror/styles/emotion'
import { PropsWithChildren, useMemo } from 'react'
import { RemirrorThemeType } from 'remirror'

import { useCustomTheme } from '../../../utils'

export const StyleProvider = ({
  children,
  flex,
}: PropsWithChildren<{ flex?: boolean }>) => {
  const { colors } = useCustomTheme()

  const remirrorTheme: RemirrorThemeType = useMemo(
    () => ({
      color: {
        text: colors.neutral[900],
        background: colors.neutral[0],
        foreground: colors.neutral[900],
        primary: colors.primary[400],
        primaryText: colors.neutral[900],
        hover: {
          background: colors.neutral[100],
          primary: colors.primary[400],
        },
        secondary: colors.primary[400],
        secondaryText: colors.neutral[900],
        border: colors.neutral[200],
        outline: colors.primary[400],
      },
    }),
    [colors],
  )

  const sx = {
    '& p, & iframe': {
      mt: 4,
    },
    '& a': {
      textDecoration: 'underline',
    },
    width: '100%',
  }

  return (
    <Box
      sx={
        flex
          ? {
              ...sx,
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              '& div.remirror-editor-wrapper': {
                px: 1,
                pt: '2px',
                m: 0,
              },
              '& div.remirror-theme': {
                pt: 0,
                m: 0,
              },
              '& div.remirror-editor-wrapper, & div.remirror-editor, & div.remirror-theme':
                {
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                },
            }
          : sx
      }
    >
      <AllStyledComponent
        theme={remirrorTheme}
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <ThemeProvider theme={remirrorTheme}>{children}</ThemeProvider>
      </AllStyledComponent>
    </Box>
  )
}
