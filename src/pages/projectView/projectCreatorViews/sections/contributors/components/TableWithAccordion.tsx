import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
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
  VStack,
} from '@chakra-ui/react'
import { useMemo } from 'react'

import { Body2 } from '../../../../../../components/typography'
import { halfStandardPadding, standardPadding } from '../../../../../../styles'
import { useMobileMode } from '../../../../../../utils'

export interface TableData<TItem> {
  header: string
  key: string | number
  render?: (val: TItem) => React.ReactNode
  value?: (val: TItem) => string | number
  colSpan?: number
  isMobile?: boolean
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
  const isMobile = useMobileMode()

  return (
    <TableContainer w="full">
      <Table variant={'unstyled'} layout={'fixed'}>
        <Thead>
          <Tr>
            {schema.map((item) => {
              if (isMobile && !item.isMobile) return null

              return (
                <Th
                  colSpan={item.colSpan || 1}
                  key={item.header}
                  fontSize="14px"
                  color="neutral.700"
                  fontWeight={500}
                  isTruncated
                  textTransform={'capitalize'}
                  px={halfStandardPadding}
                  _first={{ pl: standardPadding }}
                  _last={{ pr: standardPadding }}
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
  const isMobile = useMobileMode()

  const { isOpen, onToggle } = useDisclosure()

  const backgroundColor = index % 2 === 0 ? 'neutral.100' : 'neutral.0'
  const accordionColSpan = useMemo(
    () =>
      schema.reduce((sum, val) => {
        if (isMobile && !val.isMobile) return sum

        return sum + (val.colSpan || 1)
      }, 0),
    [schema, isMobile],
  )

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

          if (isMobile && !row.isMobile) return null

          return (
            <Td
              key={row.key}
              fontSize="14px"
              maxWidth="200px"
              height="38px"
              paddingY="10px"
              whiteSpace="pre-wrap"
              border="none"
              colSpan={row.colSpan}
              px={halfStandardPadding}
              _first={{ pl: standardPadding }}
              _last={{ pr: standardPadding }}
            >
              {row.key === 'dropdown' ? (
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
          colSpan={accordionColSpan}
          p={0}
          m={0}
          border="none"
          px={standardPadding}
          backgroundColor={backgroundColor}
        >
          <Accordion index={isOpen ? 0 : undefined}>
            <AccordionItem border="none">
              <AccordionButton display="none"></AccordionButton>
              <AccordionPanel
                padding={0}
                pb={4}
                maxWidth="100%"
                whiteSpace="normal"
              >
                {isMobile && (
                  <VStack w="full" pb="20px">
                    {schema.map((row) => {
                      if (!isMobile || row.isMobile) {
                        return null
                      }

                      let value: any = ''
                      if (row.value) {
                        value = row.value(item)
                      } else if (row.render) {
                        value = row.render(item)
                      } else {
                        value = item && item[row.key as keyof TItem]
                      }

                      return (
                        <HStack
                          w="full"
                          justifyContent={'space-between'}
                          key={row.header}
                          spacing="5px"
                        >
                          <Body2>{row.header}:</Body2>
                          <Body2>{value}</Body2>
                        </HStack>
                      )
                    })}
                  </VStack>
                )}

                {accordionContent(item)}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Td>
      )}
    </>
  )
}
