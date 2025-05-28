import { Box, BoxProps, styled } from '@chakra-ui/react'
import { ThemeProvider } from '@remirror/react-components'
import { AllStyledComponent } from '@remirror/styles/emotion'
import { captureException } from '@sentry/react'
import { useEffect, useMemo } from 'react'
import { RemirrorThemeType } from 'remirror'

import { ID } from '../../../shared/constants'
import { useCustomTheme } from '../../../utils'
import { tableCellStyles } from './typeMaps'

const Container = styled(Box, {
  baseStyle: {
    '& .remirror-is-empty': {
      fontStyle: 'normal !important',
      fontSize: '16px !important',
      color: 'var(--chakra-colors-neutral1-9) !important',
      '&::before': {
        color: 'var(--chakra-colors-neutral1-9) !important',
        fontStyle: 'normal !important',
      },
    },
    '& p, & iframe, & h1, & h2, & h3, & h4, & h5': {
      mt: 6,
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
    '& div.ql-container': {
      border: 'none !important',
    },
    '& a': {
      textDecoration: 'underline',
      fontWeight: '600',
    },
    '& code': {
      lineBreak: 'anywhere',
    },
    width: '100%',
  },
})

export const StyleProvider = ({
  children,
  flex,
  display,
  fontFamily,
  ...rest
}: { flex?: boolean } & Omit<BoxProps, 'flex'>) => {
  const { colors } = useCustomTheme()

  const remirrorTheme: RemirrorThemeType = useMemo(
    () => ({
      color: {
        text: colors.utils.text,
        background: colors.neutral[0],
        foreground: colors.utils.text,
        primary: colors.primary1[9],
        primaryText: colors.utils.text,
        hover: {
          background: colors.neutral1[3],
          primary: colors.primary1[9],
        },
        secondary: colors.primary1[9],
        secondaryText: colors.utils.text,
        border: 'transparent',
        outline: 'none',
        focus: {
          outline: 'none',
          border: 'none',
          boxShadow: 'none',
        },
      },
      fontFamily: {
        default: fontFamily ? `'${fontFamily}'` : undefined,
      },
    }),
    [colors, fontFamily],
  )

  useEffect(() => {
    try {
      twttr.widgets.load(document.getElementById(ID.project.story.markdown.container))
    } catch (e) {
      captureException(e, {
        tags: { area: 'twitter-widgets' },
      })
    }
  }, [])

  return (
    <Container
      id={ID.project.story.markdown.container}
      paddingBottom="0px !important"
      sx={
        flex
          ? {
              display: display || 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              '& p': {
                color: 'utils.text',
              },
              '& div.remirror-editor-wrapper': {
                padding: 0,
                m: 0,
              },
              '& div.remirror-theme': {
                pt: 0,
                m: 0,
              },
              '& div.remirror-editor-wrapper, & div.remirror-editor, & div.remirror-theme': {
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
              },
              '& div.remirror-image-loader': {
                justifySelf: 'center',
                height: '60px',
                width: '60px',
                borderTopWidth: '16px',
                borderTopColor: 'primary1.9',
              },
              '& div.remirror-editor': {
                padding: '0px !important',
                overflowY: 'visible !important',
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
