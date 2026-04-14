import { BoxProps, HStack, VStack } from '@chakra-ui/react'
import { Control } from 'react-hook-form'

import { SkeletonLayout } from '../../shared/components/layouts'
import { MdxMarkdownEditor } from './MdxMarkdownEditor.tsx'

export type MarkdownFieldProps = {
  autoFocus?: boolean
  preview?: boolean
  content?: string
  onChange?: (value: string) => void
  placeholder?: string
  initialContent?: () => string
  initialContentReady?: boolean
  name?: string
  control?: Control<any, any>
  flex?: boolean
  stickyToolbar?: string | number
  toolbarWrapperProps?: BoxProps
  editorWrapperProps?: Omit<BoxProps, 'flex'> & { minHeight?: string | number }
  markdownRawEditorProps?: { minHeight?: string | number }
  enableRawMode?: boolean
  isEditorMode?: boolean
  toggleEditorMode?: () => void
  isFloatingToolbar?: boolean
  noFloatingToolbar?: boolean
  toolbarMaxWidth?: number | string
  fontFamily?: string
}

/** Legacy compatibility bridge from Remirror-based props to the shared MDX editor API. */
export const MarkdownField = ({
  autoFocus,
  preview,
  content,
  onChange,
  placeholder,
  initialContent,
  initialContentReady = true,
  name,
  control,
  editorWrapperProps,
  markdownRawEditorProps,
  fontFamily,
}: MarkdownFieldProps) => {
  const minHeight = markdownRawEditorProps?.minHeight ?? editorWrapperProps?.minHeight ?? (preview ? '0px' : '120px')

  if (!preview && !initialContentReady) {
    return null
  }

  const resolvedValue = content ?? (initialContentReady ? initialContent?.() : undefined) ?? ''

  if (preview) {
    return <MdxMarkdownEditor mode="preview" value={resolvedValue} minHeight={minHeight} fontFamily={fontFamily} />
  }

  if (control) {
    return (
      <MdxMarkdownEditor
        mode="edit"
        control={control}
        name={name || 'description'}
        autoFocus={autoFocus}
        placeholder={placeholder}
        minHeight={minHeight}
        fontFamily={fontFamily}
      />
    )
  }

  if (onChange) {
    return (
      <MdxMarkdownEditor
        mode="edit"
        value={resolvedValue}
        onChange={onChange}
        autoFocus={autoFocus}
        placeholder={placeholder}
        minHeight={minHeight}
        fontFamily={fontFamily}
      />
    )
  }

  return (
    <MdxMarkdownEditor
      mode="edit"
      value={resolvedValue}
      autoFocus={autoFocus}
      placeholder={placeholder}
      minHeight={minHeight}
      fontFamily={fontFamily}
    />
  )
}

export const MarkdownFieldSkeleton = () => {
  return (
    <VStack w="full" p="10px" spacing="40px">
      <HStack w="full">
        <SkeletonLayout h="40px" w="80px" />
        <SkeletonLayout h="40px" w="160px" />
        <SkeletonLayout h="40px" w="120px" />
        <SkeletonLayout h="40px" w="160px" />
        <SkeletonLayout h="40px" w="80px" />
        <SkeletonLayout h="40px" w="160px" />
      </HStack>
      <SkeletonLayout h="400px" w="full" />
    </VStack>
  )
}
