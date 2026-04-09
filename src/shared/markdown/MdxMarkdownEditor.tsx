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
import { MdxEditorToolbar } from './MdxEditorToolbar.tsx'
import {
  getMdxMarkdownContentStyles,
  MDX_EDITOR_CONTENT_CLASS_NAME,
  MdxMarkdownPreview,
} from './MdxMarkdownPreview.tsx'

const DEFAULT_MIN_HEIGHT = '120px'
const MDX_EDITOR_CLASS_NAME = 'geyser-mdx-editor'
const MDX_EDITOR_TOOLBAR_CLASS_NAME = 'geyser-mdx-toolbar'

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
      border="1px solid"
      borderColor="neutral1.6"
      borderRadius="8px"
      backgroundColor="utils.pbg"
      sx={{
        [`& .${MDX_EDITOR_TOOLBAR_CLASS_NAME}[role='toolbar']`]: {
          borderBottom: '1px solid',
          borderColor: 'neutral1.6',
          borderRadius: '8px 8px 0 0',
          position: 'sticky',
          top: 0,
          zIndex: 2,
          backgroundColor: 'utils.pbg',
        },
        '& .mdxeditor-root-contenteditable': {
          minHeight,
        },
        ...getMdxMarkdownContentStyles({ minHeight, fontFamily }),
      }}
    >
      <MDXEditor
        ref={editorRef}
        markdown={initialMarkdown}
        plugins={plugins}
        onChange={handleChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={MDX_EDITOR_CLASS_NAME}
        contentEditableClassName={MDX_EDITOR_CONTENT_CLASS_NAME}
        iconComponentFor={mdxEditorIconComponentFor}
      />
    </Box>
  )
}
