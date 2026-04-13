import { Box } from '@chakra-ui/react'
import {
  codeBlockPlugin,
  diffSourcePlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  MDXEditorMethods,
  quotePlugin,
  tablePlugin,
  toolbarPlugin,
} from '@mdxeditor/editor'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Control, useController } from 'react-hook-form'

import { useSignedUpload } from '@/shared/hooks/useSignedUpload.tsx'

import { decodeMarkdownWhitespaceFromEditor, encodeMarkdownWhitespaceForEditor } from './markdownWhitespace.ts'
import { mdxEditorIconComponentFor } from './MdxEditorIcons.tsx'
import { MdxEditorImageDialog } from './MdxEditorImageDialog.tsx'
import { MdxEditorToolbar } from './MdxEditorToolbar.tsx'
import {
  getMdxMarkdownContentStyles,
  MDX_EDITOR_CONTENT_CLASS_NAME,
  MdxMarkdownPreview,
} from './MdxMarkdownPreview.tsx'

const DEFAULT_MIN_HEIGHT = '120px'
const DEFAULT_MARKDOWN_PLACEHOLDER =
  'Traveling to 15 LATAM & CARICOM countries using Bitcoin, this journey aims to showcase the widespread adoption of Bitcoin through engaging travel vlogs..'
const MDX_EDITOR_CLASS_NAME = 'geyser-mdx-editor'
const MDX_EDITOR_TOOLBAR_CLASS_NAME = 'geyser-mdx-toolbar'
const MDX_EDITOR_MODE_TOGGLE_CLASS_NAME = 'geyser-mdx-mode-toggle'

export type MdxMarkdownEditorProps = {
  mode?: 'edit' | 'preview'
  value?: string
  onChange?: (value: string) => void
  control?: Control<any, any>
  name?: string
  placeholder?: string
  autoFocus?: boolean
  minHeight?: string | number
  fontFamily?: string
}

type MdxMarkdownEditorInternalProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  autoFocus?: boolean
  minHeight: string | number
  fontFamily?: string
}

/** Shared MDX markdown editor with a unified sticky-top toolbar and source-mode toggle. */
export const MdxMarkdownEditor = ({
  mode = 'edit',
  value,
  onChange,
  control,
  name,
  placeholder,
  autoFocus,
  minHeight,
  fontFamily,
}: MdxMarkdownEditorProps) => {
  const resolvedMinHeight = minHeight ?? (mode === 'preview' ? '0px' : DEFAULT_MIN_HEIGHT)
  const [localValue, setLocalValue] = useState(value || '')

  useEffect(() => {
    if (onChange) {
      setLocalValue(value || '')
    }
  }, [onChange, value])

  if (mode === 'preview') {
    return <MdxMarkdownPreview value={value || ''} minHeight={resolvedMinHeight} fontFamily={fontFamily} />
  }

  if (control && name) {
    return (
      <MdxMarkdownEditorWithHookForm
        control={control}
        name={name}
        placeholder={placeholder}
        autoFocus={autoFocus}
        minHeight={resolvedMinHeight}
        fontFamily={fontFamily}
      />
    )
  }

  return (
    <MdxMarkdownEditorInternal
      value={onChange ? value || '' : localValue}
      onChange={onChange || setLocalValue}
      placeholder={placeholder}
      autoFocus={autoFocus}
      minHeight={resolvedMinHeight}
      fontFamily={fontFamily}
    />
  )
}

const MdxMarkdownEditorWithHookForm = ({
  control,
  name,
  placeholder,
  autoFocus,
  minHeight,
  fontFamily,
}: {
  control: Control<any, any>
  name: string
  placeholder?: string
  autoFocus?: boolean
  minHeight: string | number
  fontFamily?: string
}) => {
  const {
    field: { value, onChange },
  } = useController({
    control,
    name,
    defaultValue: '',
  })

  return (
    <MdxMarkdownEditorInternal
      value={typeof value === 'string' ? value : ''}
      onChange={onChange}
      placeholder={placeholder}
      autoFocus={autoFocus}
      minHeight={minHeight}
      fontFamily={fontFamily}
    />
  )
}

const MdxMarkdownEditorInternal = ({
  value,
  onChange,
  placeholder,
  autoFocus,
  minHeight,
  fontFamily,
}: MdxMarkdownEditorInternalProps) => {
  const editorRef = useRef<MDXEditorMethods>(null)
  const lastEmittedValueRef = useRef<string>('')
  const resolvedPlaceholder = placeholder || DEFAULT_MARKDOWN_PLACEHOLDER

  const { uploadFile } = useSignedUpload()

  const initialMarkdown = useMemo(() => encodeMarkdownWhitespaceForEditor(value), [value])

  const plugins = useMemo(
    () => [
      toolbarPlugin({
        toolbarContents: () => <MdxEditorToolbar />,
        toolbarClassName: MDX_EDITOR_TOOLBAR_CLASS_NAME,
      }),
      headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
      listsPlugin(),
      quotePlugin(),
      linkPlugin(),
      linkDialogPlugin(),
      tablePlugin(),
      imagePlugin({
        ImageDialog: MdxEditorImageDialog,
        async imageUploadHandler(image) {
          const upload = await uploadFile(image)
          return upload.src
        },
      }),
      codeBlockPlugin(),
      markdownShortcutPlugin(),
      diffSourcePlugin({ viewMode: 'rich-text' }),
    ],
    [uploadFile],
  )

  const handleChange = useCallback(
    (markdown: string, initialMarkdownNormalize: boolean) => {
      const decodedMarkdown = decodeMarkdownWhitespaceFromEditor(markdown)

      if (initialMarkdownNormalize && decodedMarkdown === value) {
        return
      }

      lastEmittedValueRef.current = decodedMarkdown
      onChange(decodedMarkdown)
    },
    [onChange, value],
  )

  useEffect(() => {
    const editor = editorRef.current

    if (!editor) {
      return
    }

    if (lastEmittedValueRef.current === value) {
      return
    }

    const nextMarkdown = encodeMarkdownWhitespaceForEditor(value)

    if (editor.getMarkdown() !== nextMarkdown) {
      editor.setMarkdown(nextMarkdown)
    }
  }, [value])

  return (
    <Box
      width="full"
      backgroundColor="utils.pbg"
      sx={{
        '& .mdxeditor': {
          border: 'none',
        },
        '& .mdxeditor [class*="editorWrapper"]': {
          border: 'none',
        },
        [`& .${MDX_EDITOR_TOOLBAR_CLASS_NAME}[role='toolbar']`]: {
          '--spacing-36': '100px',
          border: 'none',
          borderRadius: '8px',
          minHeight: '40px',
          paddingBlock: '4px',
          paddingInline: '8px',
          position: 'sticky',
          top: 0,
          zIndex: 2,
          backgroundColor: 'neutral1.3',
        },
        [`& .${MDX_EDITOR_TOOLBAR_CLASS_NAME}[role='toolbar'] [class*='toolbarNodeKindSelectTrigger']`]: {
          width: '100px',
        },
        [`& .${MDX_EDITOR_TOOLBAR_CLASS_NAME}[role='toolbar'] [data-toolbar-item='true']:not([disabled]):not([data-disabled])`]:
          {
            cursor: 'pointer',
          },
        [`& .${MDX_EDITOR_TOOLBAR_CLASS_NAME}[role='toolbar'] button:not([disabled]):not([data-disabled])`]: {
          cursor: 'pointer',
        },
        [`& .${MDX_EDITOR_TOOLBAR_CLASS_NAME}[role='toolbar'] [data-disabled], & .${MDX_EDITOR_TOOLBAR_CLASS_NAME}[role='toolbar'] button:disabled`]:
          {
            cursor: 'not-allowed',
          },
        [`& .${MDX_EDITOR_MODE_TOGGLE_CLASS_NAME}`]: {
          border: '1px solid',
          borderColor: 'neutral1.6',
          borderRadius: '8px',
        },
        [`& .${MDX_EDITOR_MODE_TOGGLE_CLASS_NAME}[data-source-mode='true']`]: {
          borderColor: 'primary1.9',
          color: 'primary1.9',
        },
        '& .mdxeditor-root-contenteditable': {
          minHeight,
          border: 'none',
        },
        [`& .${MDX_EDITOR_CONTENT_CLASS_NAME}[class*='_placeholder_']`]: {
          color: 'neutral1.9',
        },
        ...getMdxMarkdownContentStyles({ minHeight, fontFamily }),
      }}
    >
      <MDXEditor
        ref={editorRef}
        markdown={initialMarkdown}
        plugins={plugins}
        onChange={handleChange}
        placeholder={resolvedPlaceholder}
        autoFocus={autoFocus}
        className={MDX_EDITOR_CLASS_NAME}
        contentEditableClassName={MDX_EDITOR_CONTENT_CLASS_NAME}
        iconComponentFor={mdxEditorIconComponentFor}
      />
    </Box>
  )
}
