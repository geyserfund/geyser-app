import {
  Box,
  Divider,
  HStack,
  Image,
  ListItem,
  ListProps,
  OrderedList,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  UnorderedList,
} from '@chakra-ui/react'
import {
  Callout,
  CodeBlock,
  createLinkHandler,
  Doc,
  Heading,
  MarkMap,
  NodeViewComponentProps,
  TextHandler,
} from '@remirror/react'

export const imageHandler = ({
  node: {
    attrs: { src, alt },
  },
}: NodeViewComponentProps) => {
  return <Image my={4} borderRadius="8px" src={src} alt={alt} />
}

export const unorderedListHandler = ({ children }: ListProps) => {
  return <UnorderedList>{children}</UnorderedList>
}

export const listItemHandler = ({ children }: ListProps) => {
  return <ListItem>{children}</ListItem>
}

export const tableCellStyles = {
  '& th, & td': {
    padding: '3px 8px',
    border: '1px solid',
    borderColor: 'neutral.200',
    height: '30px',
  },
}

export const tableHandler = (props: any) => {
  const hasHeader =
    props?.children[0]?.props?.json?.content[0]?.type === 'tableHeaderCell'

  return (
    <Table
      w="full"
      variant="simple"
      borderColor="neutral.200"
      sx={{
        ...tableCellStyles,
      }}
    >
      {hasHeader && <Thead>{props.children[0]}</Thead>}

      {
        <Tbody>
          {props.children.map((child: any, index: number) => {
            if (hasHeader && index === 0) {
              return null
            }

            return child
          })}
        </Tbody>
      }
    </Table>
  )
}

export const FrameHandler = (props: any) => {
  const colorMode = localStorage.getItem('chakra-ui-color-mode')

  const newSrc = `${props.node.attrs.src}`.replace(
    /theme=dark|theme=light/,
    `theme=${colorMode || 'light'}`,
  )

  const splitValues =
    `${props.node.attrs.style}`
      .replaceAll(/"|\{|\}/g, '')
      .replaceAll(',', ';')
      .split(';') || []

  const newStyle = {} as { [key: string]: string | number }

  splitValues.map((acc: any) => {
    const [key, value] = acc.split(':')
    if (key && value) {
      newStyle[key.trim()] = value.trim()
    }
  })

  const isTwitter = newSrc.toLowerCase().includes('twitter')

  return (
    <HStack w="full" justifyContent="center">
      <Box
        w="full"
        h="full"
        minHeight={'450px'}
        maxWidth={isTwitter ? '540px' : '100%'}
        display="flex"
        borderRadius="12px"
        overflowY="auto"
        position="relative"
      >
        <iframe
          id={newSrc}
          src={newSrc}
          height={props.node.attrs.height}
          width={props.node.attrs.width}
          style={{
            ...newStyle,
            height: '100%',
            margin: '0px',
            overflow: 'hidden',
          }}
          allowFullScreen
        />
      </Box>
    </HStack>
  )
}

export const typeMap = {
  blockquote: 'blockquote',
  bulletList: unorderedListHandler,
  callout: Callout,
  codeBlock: CodeBlock,
  doc: Doc,
  hardBreak: 'br',
  heading: Heading,
  horizontalRule: Divider,
  iframe: FrameHandler,
  image: imageHandler,
  listItem: listItemHandler,
  paragraph: 'p',
  orderedList: OrderedList,
  text: TextHandler,
  table: tableHandler,
  tableHeader: Thead,
  tableHeaderCell: Th,
  tbody: Tbody,
  tableRow: Tr,
  tableCell: Td,
} satisfies MarkMap

export const markMap = {
  italic: 'em',
  bold: 'strong',
  code: 'code',
  link: createLinkHandler({ target: '_blank' }),
  underline: 'u',
  table: 'table',
  tableHeader: 'thead',
  tableHeaderCell: 'th',
  tbody: 'tbody',
  tableRow: 'tr',
  tableCell: 'td',
} satisfies MarkMap
