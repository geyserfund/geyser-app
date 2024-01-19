import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'

export interface TableData<TItem> {
  header: string
  key: string | number
  render?: (val: TItem) => React.ReactNode
  value?: (val: TItem) => string | number
  colSpan?: number
}

interface TableProps<TItem> {
  items: TItem[]
  schema: TableData<TItem>[]
  footerContent?: React.ReactNode
  accordionContent?: (item: TItem) => React.ReactNode
}

export function TableWithAccordion<TItem>({
  items,
  schema,
  accordionContent,
  footerContent,
}: TableProps<TItem>) {
  return (
    <TableContainer w="full">
      <Table variant={'unstyled'} layout={'fixed'}>
        <Thead>
          <Tr>
            {schema.map((item) => {
              return (
                <Th
                  colSpan={item.colSpan || 1}
                  key={item.header}
                  fontSize="14px"
                  color="neutral.700"
                  fontWeight={500}
                  isTruncated
                  textTransform={'capitalize'}
                >
                  {item.header}
                </Th>
              )
            })}
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item, index) => {
            return (
              <TableItemWithAccordion<TItem>
                key={index}
                schema={schema}
                item={item}
                accordionContent={accordionContent}
                index={index}
              />
            )
          })}
        </Tbody>
        {footerContent && <Tfoot>{footerContent}</Tfoot>}
      </Table>
    </TableContainer>
  )
}

export function TableItemWithAccordion<TItem>({
  schema,
  item,
  index,
  accordionContent,
}: {
  schema: TableData<TItem>[]
  item: TItem
  index: number
  accordionContent?: (item: TItem) => React.ReactNode
}) {
  const { isOpen, onToggle } = useDisclosure()
  const backgroundColor = index % 2 === 0 ? 'neutral.100' : 'neutral.0'

  return (
    <>
      <Tr backgroundColor={backgroundColor}>
        {schema.map((row) => {
          let value: any = ''
          if (row.value) {
            value = row.value(item)
          } else if (row.render) {
            value = row.render(item)
          } else {
            value = item && item[row.key as keyof TItem]
          }

          return (
            <Td
              key={row.key}
              fontSize="14px"
              maxWidth="200px"
              height="38px"
              paddingY="10px"
              whiteSpace="pre-wrap"
              colSpan={row.colSpan}
            >
              {row.key === 'action' ? (
                <IconButton
                  aria-label="dropdown"
                  variant="ghost"
                  icon={<ChevronDownIcon fontSize={'30px'} />}
                  onClick={onToggle}
                />
              ) : (
                value
              )}
            </Td>
          )
        })}
      </Tr>
      {accordionContent && (
        <Td
          colSpan={schema.reduce((sum, val) => sum + (val.colSpan || 1), 0)}
          p={0}
          m={0}
          border="none"
        >
          <Accordion index={isOpen ? 0 : undefined}>
            <AccordionItem border="none">
              <AccordionButton display="none"></AccordionButton>
              <AccordionPanel
                pb={4}
                maxWidth="100%"
                whiteSpace="normal"
                backgroundColor={backgroundColor}
              >
                {accordionContent(item)}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Td>
      )}
    </>
  )
}
