import { Box, BoxProps, styled } from '@chakra-ui/react'
import { ThemeProvider } from '@remirror/react-components'
import { AllStyledComponent } from '@remirror/styles/emotion'
import { captureException } from '@sentry/react'
import { useEffect, useMemo } from 'react'
import { RemirrorThemeType } from 'remirror'

import { ID } from '../../../constants'
import { useCustomTheme } from '../../../utils'
import { tableCellStyles } from './typeMaps'

const Container = styled(Box, {
  baseStyle: {
    '& p, & iframe, & h1, & h2, & h3, & h4, & h5': {
      mt: 4,
    },
    '& table': {
      '& p': {
        margin: '0px',
      },
      ...tableCellStyles,
    },
    '& iframe': {
      minHeight: '28em',
    },
    '& div.remirror-iframe-custom': {
      width: '100% !important',
      height: 'auto !important',
      marginBottom: '20px',
    },
    '& a': {
      textDecoration: 'underline',
    },
    width: '100%',
  },
})

export const StyleProvider = ({
  children,
  flex,
  display,
  ...rest
}: { flex?: boolean } & Omit<BoxProps, 'flex'>) => {
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

  useEffect(() => {
    twttr.widgets
      .load(document.getElementById(ID.project.story.markdown.container))
      .catch((e: any) =>
        captureException(e, {
          tags: { area: 'twitter-widgets' },
        }),
      )
  }, [])

  return (
    <Container
      id={ID.project.story.markdown.container}
      sx={
        flex
          ? {
              display: display || 'flex',
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
              '& div.tableWrapper': {
                padding: '10px',
                paddingBottom: '20px',
                '& th, & td': {
                  paddingX: '5px',
                },
              },
            }
          : {}
      }
      {...rest}
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
    </Container>
  )
}
