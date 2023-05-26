import {
  Box,
  Divider,
  Image,
  ListItem,
  ListProps,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react'
import { useDebouncedCallback } from '@react-hookz/web'
import {
  Callout,
  CodeBlock,
  createIFrameHandler,
  createLinkHandler,
  Doc,
  EditorComponent,
  Heading,
  MarkMap,
  NodeViewComponentProps,
  Remirror,
  RemirrorRenderer,
  TextHandler,
  ThemeProvider,
  useHelpers,
  useRemirror,
  useRemirrorContext,
  WysiwygToolbar,
} from '@remirror/react'
import { AllStyledComponent } from '@remirror/styles/emotion'
import { ForwardedRef, PropsWithChildren, useCallback } from 'react'
import { Control, useController, useFormContext } from 'react-hook-form'
import { getRemirrorJSON, InvalidContentHandler } from 'remirror'
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
  OrderedListExtension,
  PlaceholderExtension,
  TableExtension,
  TextExtension,
  TrailingNodeExtension,
  UnderlineExtension,
} from 'remirror/extensions'
import TurndownService from 'turndown'

import { remirrorTheme } from '../../config'
import { useSignedUpload } from '../../hooks'

const turndownService = new TurndownService()
turndownService.keep(['iframe'])

interface Props {
  preview?: boolean
  content?: string
  placeholder?: string
  initialContent?: () => string
  initialContentReady?: boolean
  name?: string
  control?: Control<any, any>
  flex?: boolean
}

export const MarkdownField = ({
  preview,
  content,
  placeholder,
  initialContent,
  initialContentReady = true,
  name,
  control,
  flex,
}: Props) => {
  const onError: InvalidContentHandler = useCallback(
    ({ json, invalidContent, transformers }) => {
      // Automatically remove all invalid nodes and marks.
      return transformers.remove(json, invalidContent)
    },
    [],
  )

  const { uploadFile } = useSignedUpload()

  const extensions = useCallback(
    () => [
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
        htmlToMarkdown: (html) => turndownService.turndown(html),
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
    ],
    [placeholder, uploadFile],
  )

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
      },
    },
  })

  if (preview) {
    return (
      <RemirrorStyleProvider flex={flex}>
        <RemirrorRenderer
          typeMap={typeMap}
          markMap={markMap}
          json={getRemirrorJSON(
            manager.createState({
              content,
              stringHandler: 'markdown',
            }),
          )}
        />
      </RemirrorStyleProvider>
    )
  }

  if (!initialContentReady) {
    return null
  }

  return (
    <RemirrorStyleProvider flex={flex}>
      <Remirror autoFocus manager={manager} initialContent={initialContent?.()}>
        <WysiwygToolbar />
        <EditorComponent />
        <SaveModule name={name} control={control} />
      </Remirror>
    </RemirrorStyleProvider>
  )
}

const RemirrorStyleProvider = ({
  children,
  flex,
}: PropsWithChildren<{ flex?: boolean }>) => {
  return (
    <Box
      sx={
        flex
          ? {
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              '& p': {
                mb: 4,
              },
              width: '100%',
              '& div.remirror-editor-wrapper, & div.remirror-editor, & div.remirror-theme':
                {
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                },
            }
          : {
              '& p': {
                mb: 4,
              },
              width: '100%',
            }
      }
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
    </Box>
  )
}

const imageHandler = ({
  node: {
    attrs: { src, alt },
  },
}: NodeViewComponentProps) => {
  return <Image my={4} borderRadius="8px" src={src} alt={alt} />
}

const unorderedListHandler = ({ children }: ListProps) => {
  return <UnorderedList>{children}</UnorderedList>
}

const listItemHandler = ({ children }: ListProps) => {
  return <ListItem>{children}</ListItem>
}

const typeMap = {
  blockquote: 'blockquote',
  bulletList: unorderedListHandler,
  callout: Callout,
  codeBlock: CodeBlock,
  doc: Doc,
  hardBreak: 'br',
  heading: Heading,
  horizontalRule: Divider,
  iframe: createIFrameHandler(),
  image: imageHandler,
  listItem: listItemHandler,
  paragraph: 'p',
  orderedList: OrderedList,
  text: TextHandler,
} satisfies MarkMap

const markMap = {
  italic: 'em',
  bold: 'strong',
  code: 'code',
  link: createLinkHandler({ target: '_blank' }),
  underline: 'u',
} satisfies MarkMap

function SaveModule(props: { control?: Control; name?: string }) {
  const {
    field: { onChange },
  } = useController({
    control: props.control,
    name: props.name ?? 'content',
  })

  const { trigger } = useFormContext()

  const { getMarkdown } = useHelpers()

  const changeCallback = useDebouncedCallback(
    (ctx) => {
      onChange(getMarkdown(ctx.state))
      trigger(props.name ?? 'content')
    },
    [],
    500,
  )

  useRemirrorContext(changeCallback)

  return <></>
}
