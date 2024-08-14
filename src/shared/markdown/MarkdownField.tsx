/* eslint-disable react-hooks/rules-of-hooks */
import { Box, HStack, IconButton, VStack } from '@chakra-ui/react'
import { EditorComponent, Remirror, TableComponents, useCommands, useKeymap, useRemirror } from '@remirror/react'
import { ForwardedRef, useCallback } from 'react'
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
import { useSignedUpload } from '../../shared/hooks'
import { useMobileMode } from '../../utils'
import { ReactHookTextArea } from './components/ReactHookTextArea'
import { TableCellMenuComponent } from './components/TableCellMenuComponent'
import { FrameHandler, imageHandler, PreviewRenderer, SaveModule, StyleProvider } from './helpers'
import { MarkdownToolbar } from './MarkdownToolbar'

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
  stickyToolbar?: string | number | boolean // top value if string or number (Ex: "48px")
  isEditorMode?: boolean
  toggleEditorMode?: () => void
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
  isEditorMode,
  toggleEditorMode,
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
        'Traveling to 15 LATAM & CARICOM countries using Bitcoin, this journey aims to showcase the widespread adoption of Bitcoin through engaging travel vlogs. The main objectives include organizing Bitcoin meetups to raise awareness and demonstrate the benevolence of humanity.'
      }
    >
      <VStack w="full" id="markdown-toolbar-wrapper">
        <Box
          width="full"
          display="flex"
          justifyContent="space-between"
          alignItems="start"
          mb={2}
          {...(isMobile && {
            borderTop: '1px solid',
            position: 'fixed',
            background: 'utils.pbg',
            zIndex: 2,
            bottom: 0,
            mb: 0,
            padding: 3,
          })}
        >
          <MarkdownToolbar isDisabled={isEditorMode} />
          <HStack mt={1} justifyContent={'center'}>
            <IconButton
              aria-label="Edit-markdown"
              my={1}
              variant={'surface'}
              colorScheme={isEditorMode ? 'primary1' : 'neutral1'}
              icon={<PiMarkdownLogo fontSize="25px" />}
              onClick={toggleEditorMode}
              padding="1"
            />
          </HStack>
        </Box>
      </VStack>

      {isEditorMode && control && (
        <ReactHookTextArea
          name="description"
          control={control}
          value={content}
          height="100%"
          minHeight="350px"
          formControlProps={{ height: '100%' }}
          fieldContainerProps={{ height: '100%', paddingBottom: { base: '120px', lg: '40px' } }}
        />
      )}
      <StyleProvider
        flex={flex}
        flexGrow={1}
        display={isEditorMode ? 'none' : undefined}
        minHeight={'40vh'}
        paddingBottom={{
          base: '120px',
          lg: '40px',
        }}
      >
        <EditorComponent />
        <TableComponents tableCellMenuProps={{ Component: TableCellMenuComponent }} />
      </StyleProvider>
      <SaveModule name={name} control={control} />
    </Remirror>
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
