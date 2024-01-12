/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react'
import {
  EditorComponent,
  Remirror,
  TableComponents,
  useCommands,
  useKeymap,
  useRemirror,
} from '@remirror/react'
import { ForwardedRef, useCallback } from 'react'
import { Control } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BsGear } from 'react-icons/bs'
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

import { SkeletonLayout } from '../../components/layouts'
import { useSignedUpload } from '../../hooks'
import { useMobileMode } from '../../utils'
import { ReactHookTextArea } from '../components/ReactHookTextArea'
import { TableCellMenuComponent } from '../components/TableCellMenuComponent'
import {
  FrameHandler,
  imageHandler,
  PreviewRenderer,
  SaveModule,
  StyleProvider,
} from './helpers'
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
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  const onError: InvalidContentHandler = useCallback(
    ({ json, invalidContent, transformers }) => {
      // Automatically remove all invalid nodes and marks.
      return transformers.remove(json, invalidContent)
    },
    [],
  )

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
      new BoldExtension(),
      new UnderlineExtension(),
      new ItalicExtension(),
      new HeadingExtension(),
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
      new TrailingNodeExtension(),
      new BulletListExtension(),
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
      exts.push(new NodeFormattingExtension())
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
        bulletList: ({ forwardRef }: { forwardRef: ForwardedRef<any> }) => (
          <Box pl={5} ref={forwardRef} />
        ),
        orderedList: ({ forwardRef }: { forwardRef: ForwardedRef<any> }) => (
          <Box pl={5} ref={forwardRef} />
        ),
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
      placeholder={t('The story of the project goes here...')}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="start"
        mb={2}
        sx={
          stickyToolbar !== undefined && stickyToolbar !== false
            ? {
                position: 'sticky',
                top: stickyToolbar || 0,
                backgroundColor: 'neutral.50',
                borderBottom: { base: '1px solid', lg: 'none' },
                borderTop: { base: '1px solid', lg: 'none' },
                borderColor: 'neutral.200',
                zIndex: 11,
              }
            : {}
        }
      >
        <MarkdownToolbar isDisabled={isEditorMode} />
        <HStack mt={1} justifyContent={'center'}>
          <Button
            my={1}
            size={{ base: 'xs', md: 'md' }}
            variant={'secondary'}
            isActive={isEditorMode}
            onClick={toggleEditorMode}
          >
            {<BsGear />}{' '}
            {!isMobile && <Text paddingLeft="5px">{t('Edit')}</Text>}
          </Button>
        </HStack>
      </Box>
      {isEditorMode && control && (
        <ReactHookTextArea
          name="description"
          control={control}
          value={content}
          height="100%"
          formControlProps={{ height: '100%' }}
          fieldContainerProps={{ height: '100%' }}
        />
      )}
      <StyleProvider
        flex={flex}
        flexGrow={1}
        display={isEditorMode ? 'none' : undefined}
        minHeight={'40vh'}
      >
        <EditorComponent />
        <TableComponents
          tableCellMenuProps={{ Component: TableCellMenuComponent }}
        />
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
