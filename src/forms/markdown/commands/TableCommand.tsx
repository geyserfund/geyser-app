import {
  Box,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useCommands } from '@remirror/react'
import { useState } from 'react'
import { BsTable } from 'react-icons/bs'

import { MonoBody2 } from '../../../components/typography'
import { useDebounce } from '../../../hooks'
import { ToolbarCommandButton } from './ToolbarCommandButton'

interface TableCommandProps {
  isDisabled?: boolean
}

const TABLE_ROW_COUNT = 5
const TABLE_COLUMN_COUNT = 5

const tableBoxes = Array.from({ length: TABLE_ROW_COUNT }, (_, i) =>
  Array.from({ length: TABLE_COLUMN_COUNT }, (_, j) => `${i + 1}${j + 1}`),
)

export const TableCommand = ({ isDisabled }: TableCommandProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
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
            onClick={onOpen}
            onMouseOver={onOpen}
            onMouseLeave={onClose}
          >
            <BsTable />
          </ToolbarCommandButton>
        </PopoverTrigger>
        <PopoverContent
          maxWidth="170px"
          onMouseOver={onOpen}
          onMouseLeave={onClose}
        >
          <PopoverArrow />
          <PopoverBody>
            <VStack>
              <VStack spacing="0px" _hover={{ cursor: 'pointer' }}>
                {tableBoxes.map((row, i) => (
                  <HStack key={i} spacing="0px">
                    {row.map((_, j) => (
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
              <MonoBody2 semiBold>{`${currentPosition.i + 1}X${
                currentPosition.j + 1
              }`}</MonoBody2>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  )
}
