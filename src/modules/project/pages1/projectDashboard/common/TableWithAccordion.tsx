import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  HStack,
  IconButton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { Fragment, useMemo } from 'react'
import { BsCaretDownFill } from 'react-icons/bs'
import { PiCaretDown, PiCaretUp } from 'react-icons/pi'

import { Body } from '@/shared/components/typography'

import { halfStandardPadding, standardPadding } from '../../../../../styles'
import { OrderByDirection, OrderByOptions } from '../../../../../types'
import { useMobileMode } from '../../../../../utils'

export type TableSortOnColumn = {
  order: OrderByOptions
  updateOrder?: () => void
}

export interface TableData<TItem> {
  header: string
  sort?: { order: OrderByOptions | OrderByDirection; updateOrder: () => void }
  key: string | number
  render?: (val: TItem) => React.ReactNode
  value?: (val: TItem) => string | number
  colSpan?: number
  isMobile?: boolean
  isAccordion?: boolean
}

interface TableProps<TItem> {
  items: TItem[]
  schema: TableData<TItem>[]
  footerContent?: React.ReactNode
  accordionContent?: (item: TItem) => React.ReactNode
}

export function TableWithAccordion<TItem>({ items, schema, accordionContent, footerContent }: TableProps<TItem>) {
  const isMobile = useMobileMode()

  return (
    <TableContainer w="full">
      <Table variant={'unstyled'} layout={'fixed'}>
        <Thead>
          <Tr>
            {schema.map((item) => {
              if ((isMobile && !item.isMobile) || item.isAccordion) return null

              return (
                <Th
                  colSpan={item.colSpan || 1}
                  key={item.header}
                  fontSize="12px"
                  color="neutral.700"
                  fontWeight={500}
                  isTruncated
                  textTransform={'capitalize'}
                  px={halfStandardPadding}
                  _first={{ pl: standardPadding }}
                  _last={{ pr: standardPadding }}
                >
                  {item.header}
                  {item.sort && (
                    <IconButton
                      variant="ghost"
                      aria-label="sort-icon"
                      ml={'10px'}
                      _hover={{}}
                      icon={
                        <BsCaretDownFill
                          transform={item.sort.order === OrderByOptions.Asc ? 'rotate(180)' : undefined}
                        />
                      }
                      onClick={item.sort.updateOrder}
                    />
                  )}
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
  const isMobile = useMobileMode()

  const { isOpen, onToggle } = useDisclosure()

  const tableSchema = useMemo(() => schema.filter((val) => !val.isAccordion), [schema])

  const accordionSchema = useMemo(() => schema.filter((val) => val.isAccordion), [schema])

  const accordionColSpan = useMemo(
    () =>
      tableSchema.reduce((sum, val) => {
        if (isMobile && !val.isMobile) return sum

        return sum + (val.colSpan || 1)
      }, 0),
    [tableSchema, isMobile],
  )

  const showAccordion = accordionSchema.length > 0 || accordionContent

  return (
    <>
      <Tr>
        {tableSchema.map((row) => {
          if (isMobile && !row.isMobile) return null

          const value = getValueFromTableItem({ row, item })

          return (
            <Td
              key={row.key}
              fontSize="12px"
              maxWidth="200px"
              height="38px"
              paddingY="10px"
              whiteSpace="pre-wrap"
              border="none"
              color="utils.text"
              colSpan={row.colSpan}
              px={halfStandardPadding}
              _first={{ pl: standardPadding }}
              _last={{ pr: standardPadding }}
              textAlign={row.key === 'dropdown' ? 'right' : 'left'}
            >
              {row.key === 'dropdown' ? (
                <IconButton
                  size="sm"
                  alignSelf={'center'}
                  aria-label="dropdown"
                  variant="ghost"
                  colorScheme="neutral1"
                  icon={isOpen ? <PiCaretUp fontSize={'16px'} /> : <PiCaretDown fontSize={'16px'} />}
                  onClick={onToggle}
                />
              ) : (
                value
              )}
            </Td>
          )
        })}
      </Tr>
      {showAccordion && (
        <Td colSpan={accordionColSpan} p={0} m={0} border="none" px={standardPadding}>
          <Accordion index={isOpen ? 0 : undefined}>
            <AccordionItem border="none">
              <AccordionButton display="none"></AccordionButton>
              <AccordionPanel
                padding={0}
                pb={4}
                maxWidth="100%"
                whiteSpace="normal"
                borderBottom="1px solid"
                borderColor="neutral1.6"
              >
                <Stack
                  w="full"
                  direction={{ base: 'column', lg: 'row' }}
                  justifyContent="flex-end"
                  alignItems="flex-start"
                  spacing="20px"
                >
                  {accordionContent ? accordionContent(item) : null}

                  {isMobile && (
                    <VStack w="full" pb="20px" spacing="10px">
                      {tableSchema.map((row) => {
                        if (!isMobile || row.isMobile) {
                          return null
                        }

                        const value = getValueFromTableItem({ row, item })
                        return (
                          <HStack w="full" justifyContent={'space-between'} key={row.header} spacing="5px">
                            <Body size="xs">{row.header}:</Body>
                            <Body size="xs">{value}</Body>
                          </HStack>
                        )
                      })}
                    </VStack>
                  )}

                  {accordionSchema.length > 0 &&
                    accordionSchema.map((row) => {
                      const value = getValueFromTableItem({ row, item })
                      return <Fragment key={row.header}>{value}</Fragment>
                    })}
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Td>
      )}
    </>
  )
}

export function getValueFromTableItem<TItem>({ row, item }: { row: TableData<TItem>; item: TItem }): React.ReactNode {
  if (row.value) {
    return row.value(item)
  }

  if (row.render) {
    return row.render(item)
  }

  if (item) {
    return item[row.key as keyof TItem] as React.ReactNode
  }

  return null
}
