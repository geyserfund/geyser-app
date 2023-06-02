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

  return (
    <Box
      sx={
        flex
          ? {
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              '& p': {
                mt: 4,
              },
              width: '100%',
              '& div.remirror-editor-wrapper, & div.remirror-editor, & div.remirror-theme':
                {
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                },
            }
          : {
              '& p': {
                mt: 4,
              },
              width: '100%',
            }
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
