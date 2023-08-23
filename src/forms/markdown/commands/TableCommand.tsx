import {
  Box,
  Checkbox,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useCommands } from '@remirror/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsTable } from 'react-icons/bs'
import {
  RiDeleteColumn,
  RiDeleteRow,
  RiInsertColumnRight,
  RiInsertRowBottom,
} from 'react-icons/ri'

import { Body2, MonoBody2 } from '../../../components/typography'
import { useDebounce } from '../../../hooks'
import { ToolbarCommandButton } from './ToolbarCommandButton'

interface TableCommandProps {
  isDisabled?: boolean
}

const tableBoxes = [
  [1, 2, 3, 4, 5, 6],
  [1, 2, 3, 4, 5, 6],
  [1, 2, 3, 4, 5, 6],
  [1, 2, 3, 4, 5, 6],
  [1, 2, 3, 4, 5, 6],
]

export const TableCommand = ({ isDisabled }: TableCommandProps) => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [hasHeader, setHasHeader] = useState(true)

  const commands = useCommands()

  const debouncedIsOpen = useDebounce(isOpen, 200)

  const [currentPosition, setCurrentPosition] = useState({ i: 0, j: 0 })

  const handleTableCreate = ({ i, j }: { i: number; j: number }) => {
    if (!commands.createTable) return
    commands.createTable({
      rowsCount: i + 1,
      columnsCount: j + 1,
    })
    onClose()
  }

  return (
    <>
      <Popover
        isOpen={debouncedIsOpen}
        onClose={onClose}
        placement={'bottom'}
        closeOnBlur
      >
        <PopoverTrigger>
          <ToolbarCommandButton
            isDisabled={isDisabled}
            name="table"
            label="Table"
            onMouseOver={onOpen}
            onMouseLeave={onClose}
          >
            <BsTable />
          </ToolbarCommandButton>
        </PopoverTrigger>
        <PopoverContent
          maxWidth="200px"
          onMouseOver={onOpen}
          onMouseLeave={onClose}
        >
          <PopoverArrow />
          <PopoverBody>
            <VStack>
              <HStack w="full" spacing="5px">
                <ToolbarCommandButton
                  isDisabled={isDisabled}
                  name="addTableRowAfter"
                  label="add row below selected"
                  onClick={commands.addTableRowAfter}
                >
                  <RiInsertRowBottom />
                </ToolbarCommandButton>
                <ToolbarCommandButton
                  isDisabled={isDisabled}
                  name="addTableColumnAfter"
                  label="add column to right of selected"
                  onClick={commands.addTableColumnAfter}
                >
                  <RiInsertColumnRight />
                </ToolbarCommandButton>
                <ToolbarCommandButton
                  isDisabled={isDisabled}
                  name="deleteTableRow"
                  label="delete selected row"
                  onClick={commands.deleteTableRow}
                >
                  <RiDeleteRow />
                </ToolbarCommandButton>
                <ToolbarCommandButton
                  isDisabled={isDisabled}
                  name="deleteTableColumn"
                  label="delete selected column"
                  onClick={commands.deleteTableColumn}
                >
                  <RiDeleteColumn />
                </ToolbarCommandButton>
              </HStack>
              <VStack spacing="0px" _hover={{ cursor: 'pointer' }}>
                {tableBoxes.map((row, i) => (
                  <HStack key={i} spacing="0px">
                    {row.map((col, j) => (
                      <Box
                        key={j}
                        padding="5px"
                        onMouseEnter={() => setCurrentPosition({ i, j })}
                        onClick={() => handleTableCreate({ i, j })}
                      >
                        <Box
                          height="20px"
                          width="20px"
                          borderRadius="4px"
                          backgroundColor={
                            i <= currentPosition.i && j <= currentPosition.j
                              ? 'neutral.300'
                              : 'neutral.800'
                          }
                          transition="background-color 0.1s ease-in-out"
                        />
                      </Box>
                    ))}
                  </HStack>
                ))}
              </VStack>
              <HStack w="full" justifyContent="space-between" spacing="0">
                <Checkbox
                  size="sm"
                  isChecked={hasHeader}
                  onChange={(e) => setHasHeader(e.target.checked)}
                >
                  <MonoBody2 semiBold> {t('headers')} </MonoBody2>
                </Checkbox>
                <MonoBody2 semiBold>{`${currentPosition.i + 1}X${
                  currentPosition.j + 1
                }`}</MonoBody2>
              </HStack>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  )
}
