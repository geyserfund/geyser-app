/* eslint-disable react-hooks/rules-of-hooks */
import { Box, HStack, IconButton, VStack } from '@chakra-ui/react'
import { TableComponents } from '@remirror/extension-react-tables'
import { EditorComponent, Remirror, useCommands, useKeymap, useRemirror, useRemirrorContext } from '@remirror/react'
import { ForwardedRef, useCallback, useEffect } from 'react'
import { Control } from 'react-hook-form'
import { PiMarkdownLogo } from 'react-icons/pi'
import {
  AnyExtension,
  ExtensionPriority,
  findParentNodeOfType,
  getCursor,
  InvalidContentHandler,
  KeyBindingProps,
} from 'remirror'
import {
  BlockquoteExtension,
  BoldExtension,
  BulletListExtension,
  CodeExtension,
  HardBreakExtension,
  HeadingExtension,
  IframeExtension,
  ImageExtension,
  ItalicExtension,
  LinkExtension,
  MarkdownExtension,
  NodeFormattingExtension,
  OrderedListExtension,
  PlaceholderExtension,
  TableExtension,
  TextExtension,
  TrailingNodeExtension,
  UnderlineExtension,
} from 'remirror/extensions'
import TurndownService from 'turndown'

import { SkeletonLayout } from '../../shared/components/layouts'
import { useMobileMode } from '../../utils'

import { ReactHookTextArea } from './components/ReactHookTextArea'
import { TableCellMenuComponent } from './components/TableCellMenuComponent'
import { FrameHandler, imageHandler, PreviewRenderer, SaveModule, StyleProvider } from './helpers'
import { MarkdownToolbar } from './MarkdownToolbar'
import { useSignedUpload } from '../hooks'

const turndownService = new TurndownService()
turndownService.keep(['iframe'])

interface Props {
  autoFocus?: boolean
  preview?: boolean
  content?: string
  placeholder?: string
  initialContent?: () => string
  initialContentReady?: boolean
  name?: string
  control?: Control<any, any>
  flex?: boolean
  stickyToolbar?: string | number
  enableRawMode?: boolean
  isEditorMode?: boolean
  toggleEditorMode?: () => void
  isFloatingToolbar?: boolean
  toolbarMaxWidth?: number | string
}

export const MarkdownField = ({
  autoFocus,
  preview,
  content,
  placeholder,
  initialContent,
  initialContentReady = true,
  name,
  control,
  flex,
  stickyToolbar,
  enableRawMode,
  isEditorMode,
  toggleEditorMode,
  isFloatingToolbar,
  toolbarMaxWidth,
}: Props) => {
  const isMobile = useMobileMode()

  const onError: InvalidContentHandler = useCallback(({ json, invalidContent, transformers }) => {
    // Automatically remove all invalid nodes and marks.
    return transformers.remove(json, invalidContent)
  }, [])

  const { uploadFile } = useSignedUpload()

  const extensions = useCallback<() => AnyExtension[]>(() => {
    const exts = [
      new PlaceholderExtension({ placeholder }),
      new LinkExtension({
        autoLink: true,
        defaultTarget: '_blank',
        extraAttributes: {
          rel: 'noopener noreferrer',
        },
      }),
      new MarkdownExtension({
        copyAsMarkdown: true,
      }),
      new BoldExtension({}),
      new UnderlineExtension(),
      new ItalicExtension(),
      new HeadingExtension({}),
      new BlockquoteExtension(),
      new OrderedListExtension(),
      new CodeExtension(),
      new IframeExtension({
        enableResizing: false,
        extraAttributes: {
          width: '100%',
          scolling: 'no',
          style: {
            default: JSON.stringify({ width: '100%', height: '400px' }),
            parseDOM: (domNode) => domNode.getAttribute('style'),
            toDOM: (attrs) => ['style', (attrs.style as string) || ''],
          },
        },
      }),
      new HardBreakExtension(),
      new TableExtension({
        resizable: false,
      }),
      new TrailingNodeExtension({}),
      new BulletListExtension({}),
      new TextExtension(),
      new ImageExtension({
        uploadHandler(files) {
          return files.map(
            (file) => () =>
              uploadFile(file.file).then((data) => ({
                src: data.src,
                fileName: data.filename,
              })),
          )
        },
        enableResizing: false,
      }),
    ] as AnyExtension[]

    if (!preview) {
      exts.push(new NodeFormattingExtension({}))
    }

    return exts
  }, [placeholder, uploadFile])

  const { manager } = useRemirror({
    extensions,
    stringHandler: 'markdown',
    onError,
    react: {
      nodeViewComponents: {
        image: imageHandler,
        bulletList: ({ forwardRef }: { forwardRef: ForwardedRef<any> }) => <Box pl={5} ref={forwardRef} />,
        orderedList: ({ forwardRef }: { forwardRef: ForwardedRef<any> }) => <Box pl={5} ref={forwardRef} />,
        iframe: (props: any) => FrameHandler(props),
      },
    },
  })

  const hooks = [
    () => {
      const { selectText } = useCommands()

      useKeymap(
        'Tab',
        (params: KeyBindingProps) => {
          const nodeMatch = findParentNodeOfType({
            types: ['tableCell', 'tableHeaderCell'],
            selection: params.tr.selection,
          })

          if (!nodeMatch) {
            return false
          }

          const position = getCursor(params.state.selection)

          const newPosition = position?.after()

          if (newPosition) {
            selectText(newPosition)
            return true
          }

          return false
        },
        ExtensionPriority.Highest,
      )
    },
  ]

  if (preview) {
    return (
      <StyleProvider flex={flex}>
        <PreviewRenderer content={content} manager={manager} />
      </StyleProvider>
    )
  }

  if (!initialContentReady) {
    return null
  }

  return (
    <Remirror
      autoFocus={autoFocus}
      manager={manager}
      initialContent={initialContent?.()}
      hooks={hooks}
      placeholder={
        'Traveling to 15 LATAM & CARICOM countries using Bitcoin, this journey aims to showcase the widespread adoption of Bitcoin through engaging travel vlogs..'
      }
    >
      <VStack
        w="full"
        id="markdown-toolbar-wrapper"
        alignItems="center"
        backgroundColor="utils.pbg"
        {...(isFloatingToolbar &&
          !isMobile && {
            position: 'fixed',
            zIndex: 2,
            bottom: stickyToolbar ? `calc(${stickyToolbar} + 16px)` : '16px',
            left: 0,
          })}
      >
        <Box
          width="full"
          maxWidth={{ base: 'unset', lg: toolbarMaxWidth }}
          display="flex"
          justifyContent="space-between"
          alignItems="start"
          mb={2}
          gap={2}
          border="1px solid"
          borderRadius="6px"
          borderColor="neutral1.6"
          padding="10px"
          background="utils.pbg"
          {...(isMobile && {
            zIndex: 2,
            borderLeftWidth: '0px',
            borderRightWidth: '0px',
            borderTopWidth: '1px',
            borderTopStyle: 'solid',
            borderRadius: '0px',
            padding: '12px 12px 20px',
            position: 'fixed',
            bottom: stickyToolbar || 0,
            overflowX: 'auto',
            overflowY: 'hidden',
            marginBottom: '0px',
          })}
        >
          <MarkdownToolbar isDisabled={isEditorMode} />
          <HStack justifyContent={'center'}>
            {enableRawMode && (
              <IconButton
                aria-label="Edit-markdown"
                variant={'surface'}
                size="sm"
                colorScheme={isEditorMode ? 'primary1' : 'neutral1'}
                icon={<PiMarkdownLogo fontSize="16px" />}
                onClick={toggleEditorMode}
              />
            )}
          </HStack>
        </Box>
      </VStack>

      {enableRawMode && isEditorMode && control && (
        <ReactHookTextArea
          name={name || 'description'}
          control={control}
          value={content}
          height="100%"
          minHeight="120px"
          border="none"
          padding={0}
          formControlProps={{ height: '100%' }}
          fieldContainerProps={{ height: '100%' }}
        />
      )}
      <StyleProvider
        id={'remirror-style-provider'}
        flex={flex}
        flexGrow={1}
        display={isEditorMode ? 'none' : undefined}
        minHeight={'120px'}
        paddingBottom={0}
      >
        <Editor focusEditor={autoFocus} />
        <TableComponents tableCellMenuProps={{ Component: TableCellMenuComponent }} />
      </StyleProvider>
      <SaveModule name={name} control={control} />
    </Remirror>
  )
}

const Editor = ({ focusEditor }: { focusEditor?: boolean }) => {
  const { focus } = useRemirrorContext()

  useEffect(() => {
    if (focusEditor) {
      focus()
    }
  }, [focusEditor, focus])

  return <EditorComponent />
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
