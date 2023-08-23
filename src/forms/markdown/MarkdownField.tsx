import { Box, Button, HStack, Text } from '@chakra-ui/react'
// import { ReactComponentExtension } from '@remirror/extension-react-component'
import { EditorComponent, Remirror, useRemirror } from '@remirror/react'
import { ForwardedRef, useCallback } from 'react'
import { Control } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BsGear } from 'react-icons/bs'
import { AnyExtension, InvalidContentHandler } from 'remirror'
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

import { useSignedUpload } from '../../hooks'
import { useMobileMode } from '../../utils'
import { ReactHookTextArea } from '../components/ReactHookTextArea'
import { PreviewRenderer } from './helpers/PreviewRenderer'
import { SaveModule } from './helpers/SaveModule'
import { StyleProvider } from './helpers/StyleProvider'
import { imageHandler } from './helpers/typeMaps'
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
        htmlToMarkdown(html) {
          console.log('checking html', html)
          return `${html}`
        },
        // htmlToMarkdown: (html) => turndownService.turndown(html),
      }),
      new BoldExtension(),
      new UnderlineExtension(),
      new ItalicExtension(),
      new HeadingExtension(),
      new BlockquoteExtension(),
      new OrderedListExtension(),
      new CodeExtension(),
      new IframeExtension(),
      new HardBreakExtension(),
      new TableExtension(),
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
        paragraph: ({ forwardRef }: { forwardRef: ForwardedRef<any> }) => (
          <Box mb={4} ref={forwardRef} />
        ),
        bulletList: ({ forwardRef }: { forwardRef: ForwardedRef<any> }) => (
          <Box pl={5} ref={forwardRef} />
        ),
        orderedList: ({ forwardRef }: { forwardRef: ForwardedRef<any> }) => (
          <Box pl={5} ref={forwardRef} />
        ),
        table: ({ forwardRef }: { forwardRef: ForwardedRef<any> }) => (
          <Box mb={4} ref={forwardRef} />
        ),
      },
    },
  })

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
      <StyleProvider flex={flex} display={isEditorMode ? 'none' : undefined}>
        <EditorComponent />
      </StyleProvider>
      <SaveModule name={name} control={control} />
    </Remirror>
  )
}
