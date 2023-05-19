import { Box } from '@chakra-ui/react'
import { useDebouncedCallback } from '@react-hookz/web'
import {
  EditorComponent,
  Remirror,
  RemirrorRenderer,
  ThemeProvider,
  useHelpers,
  useRemirror,
  useRemirrorContext,
  WysiwygToolbar,
} from '@remirror/react'
import { AllStyledComponent } from '@remirror/styles/emotion'
import { PropsWithChildren, useCallback } from 'react'
import { Control, useController } from 'react-hook-form'
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
  ListItemExtension,
  MarkdownExtension,
  OrderedListExtension,
  PlaceholderExtension,
  TableExtension,
  UnderlineExtension,
} from 'remirror/extensions'
import TurndownService from 'turndown'

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
}

export const MarkdownField = ({
  preview,
  content,
  placeholder,
  initialContent,
  initialContentReady = true,
  name,
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
      new ListItemExtension(),
      new CodeExtension(),
      new IframeExtension(),
      new HardBreakExtension(),
      new TableExtension(),
      new BulletListExtension(),
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
  })

  if (preview) {
    return (
      <RemirrorStyleProvider>
        <RemirrorRenderer
          json={getRemirrorJSON(
            manager.createState({
              content: content?.replaceAll('\n', '<br>'),
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
    <RemirrorStyleProvider>
      <Remirror autoFocus manager={manager} initialContent={initialContent?.()}>
        <WysiwygToolbar />
        <EditorComponent />
        <SaveModule name={name} />
      </Remirror>
    </RemirrorStyleProvider>
  )
}

const RemirrorStyleProvider = ({ children }: PropsWithChildren) => {
  return (
    <Box width="100%">
      <AllStyledComponent>
        <ThemeProvider>{children}</ThemeProvider>
      </AllStyledComponent>
    </Box>
  )
}

function SaveModule(props: { control?: Control; name?: string }) {
  const {
    field: { onChange },
  } = useController({
    control: props.control,
    name: props.name ?? 'content',
  })

  const { getMarkdown } = useHelpers()

  const changeCallback = useDebouncedCallback(
    (ctx) => onChange(getMarkdown(ctx.state)),
    [],
    500,
  )

  useRemirrorContext(changeCallback)

  return <></>
}
