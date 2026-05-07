import { Box, BoxProps } from '@chakra-ui/react'
import {
  codeBlockPlugin,
  headingsPlugin,
  imagePlugin,
  linkPlugin,
  listsPlugin,
  MDXEditor,
  quotePlugin,
  tablePlugin,
} from '@mdxeditor/editor'
import * as Sentry from '@sentry/react'
import { useEffect, useMemo, useRef } from 'react'

import { mdxEditorIconComponentFor } from './MdxEditorIcons.tsx'

export const MDX_EDITOR_CONTENT_CLASS_NAME = 'geyser-mdx-content'

/** Shared markdown content styles used by edit and preview MDX rendering. */
export const getMdxMarkdownContentStyles = ({
  minHeight,
  fontFamily,
}: {
  minHeight: string | number
  fontFamily?: string
}): BoxProps['sx'] => ({
  [`& .${MDX_EDITOR_CONTENT_CLASS_NAME}`]: {
    minHeight,
    paddingBlock: '12px',
    paddingInline: 0,
    fontFamily: fontFamily ? `${fontFamily} !important` : undefined,
  },
  [`& .${MDX_EDITOR_CONTENT_CLASS_NAME} p:first-of-type`]: {
    marginTop: 0,
  },
  [`& .${MDX_EDITOR_CONTENT_CLASS_NAME} p, & .${MDX_EDITOR_CONTENT_CLASS_NAME} iframe`]: {
    marginTop: 6,
    color: 'utils.text',
  },
  [`& .${MDX_EDITOR_CONTENT_CLASS_NAME} h1, & .${MDX_EDITOR_CONTENT_CLASS_NAME} h2, & .${MDX_EDITOR_CONTENT_CLASS_NAME} h3, & .${MDX_EDITOR_CONTENT_CLASS_NAME} h4, & .${MDX_EDITOR_CONTENT_CLASS_NAME} h5`]:
    {
      color: 'utils.text',
      fontWeight: 700,
      letterSpacing: 0,
    },
  [`& .${MDX_EDITOR_CONTENT_CLASS_NAME} h1`]: {
    marginTop: 8,
    marginBottom: 3,
    fontSize: { base: '28px', md: '32px' },
    lineHeight: 1.18,
  },
  [`& .${MDX_EDITOR_CONTENT_CLASS_NAME} h2`]: {
    marginTop: 7,
    marginBottom: 2,
    fontSize: { base: '24px', md: '28px' },
    lineHeight: 1.22,
  },
  [`& .${MDX_EDITOR_CONTENT_CLASS_NAME} h3`]: {
    marginTop: 6,
    marginBottom: 2,
    fontSize: { base: '20px', md: '22px' },
    lineHeight: 1.28,
  },
  [`& .${MDX_EDITOR_CONTENT_CLASS_NAME} h4, & .${MDX_EDITOR_CONTENT_CLASS_NAME} h5`]: {
    marginTop: 5,
    marginBottom: 2,
    fontSize: '18px',
    lineHeight: 1.32,
  },
  [`& .${MDX_EDITOR_CONTENT_CLASS_NAME} a`]: {
    textDecoration: 'underline',
    fontWeight: 600,
  },
  [`& .${MDX_EDITOR_CONTENT_CLASS_NAME} code`]: {
    lineBreak: 'anywhere',
  },
  [`& .${MDX_EDITOR_CONTENT_CLASS_NAME} iframe`]: {
    width: '100%',
    minHeight: '28em',
    border: 0,
    borderRadius: '12px',
  },
  [`& .${MDX_EDITOR_CONTENT_CLASS_NAME} table`]: {
    width: '100%',
    marginTop: '20px',
    marginBottom: '20px',
    borderCollapse: 'collapse',
  },
  [`& .${MDX_EDITOR_CONTENT_CLASS_NAME} th, & .${MDX_EDITOR_CONTENT_CLASS_NAME} td`]: {
    padding: '3px 8px',
    border: '1px solid',
    borderColor: 'neutral.200',
    height: '30px',
  },
})

type MdxMarkdownPreviewProps = {
  value: string
  minHeight: string | number
  fontFamily?: string
}

/** Read-only markdown preview renderer using the shared MDX parsing/rendering pipeline. */
export const MdxMarkdownPreview = ({ value, minHeight, fontFamily }: MdxMarkdownPreviewProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const plugins = useMemo(
    () => [
      headingsPlugin(),
      listsPlugin(),
      quotePlugin(),
      linkPlugin(),
      tablePlugin(),
      imagePlugin(),
      codeBlockPlugin(),
    ],
    [],
  )

  useEffect(() => {
    if (!wrapperRef.current || !twttr?.widgets?.load) {
      return
    }

    try {
      twttr.widgets.load(wrapperRef.current)
    } catch (error) {
      Sentry.captureException(error, {
        tags: { area: 'twitter-widgets' },
      })
    }
  }, [value])

  return (
    <Box ref={wrapperRef} width="full" sx={getMdxMarkdownContentStyles({ minHeight, fontFamily })}>
      <MDXEditor
        key={value}
        markdown={value}
        readOnly
        trim={false}
        plugins={plugins}
        contentEditableClassName={MDX_EDITOR_CONTENT_CLASS_NAME}
        iconComponentFor={mdxEditorIconComponentFor}
      />
    </Box>
  )
}
