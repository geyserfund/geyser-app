import {
  Box,
  HStack,
  Portal,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import {
  ButtonWithTooltip,
  editorInFocus$,
  editorInTable$,
  insertTable$,
  readOnly$,
  rootEditor$,
  useCellValue,
  usePublisher,
} from '@mdxeditor/editor'
import { t } from 'i18next'
import { FORMAT_ELEMENT_COMMAND, type LexicalEditor } from 'lexical'
import { useState } from 'react'
import { PiTable, PiTextAlignCenter, PiTextAlignLeft, PiTextAlignRight } from 'react-icons/pi'

import { Body } from '@/shared/components/typography'
import { useDebounce } from '@/shared/hooks/useDebounce.ts'

const TABLE_ROW_COUNT = 5
const TABLE_COLUMN_COUNT = 5

const tableBoxes = Array.from({ length: TABLE_ROW_COUNT }, (_, rowIndex) =>
  Array.from({ length: TABLE_COLUMN_COUNT }, (_, columnIndex) => `${rowIndex + 1}${columnIndex + 1}`),
)

type tablePosition = {
  row: number
  column: number
}

const getFocusedEditor = (editorInFocusRef: unknown, rootEditor: LexicalEditor | null): LexicalEditor | null => {
  if (editorInFocusRef && typeof (editorInFocusRef as LexicalEditor).dispatchCommand === 'function') {
    return editorInFocusRef as LexicalEditor
  }

  return rootEditor
}

/** Table insertion button with the legacy 5x5 hover picker used in the previous editor UI. */
export const MdxInsertTableButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const debouncedIsOpen = useDebounce(isOpen, 160)
  const insertTable = usePublisher(insertTable$)
  const isReadOnly = useCellValue(readOnly$)
  const isInTable = useCellValue(editorInTable$)
  const [currentPosition, setCurrentPosition] = useState<tablePosition>({ row: 0, column: 0 })

  const selectedCellColor = useColorModeValue('neutral1.4', 'neutral1.7')
  const unselectedCellColor = useColorModeValue('neutral1.10', 'neutral1.5')

  const isDisabled = isReadOnly || isInTable
  const shouldShowPicker = debouncedIsOpen && !isDisabled

  const handleTableCreate = ({ row, column }: tablePosition) => {
    insertTable({
      rows: row + 1,
      columns: column + 1,
    })

    onClose()
  }

  return (
    <Popover isOpen={shouldShowPicker} onClose={onClose} placement="bottom-start" closeOnBlur>
      <PopoverTrigger>
        <Box display="inline-flex" onMouseEnter={isDisabled ? undefined : onOpen} onMouseLeave={onClose}>
          <ButtonWithTooltip
            title={t('Insert table')}
            aria-label={t('Insert table')}
            disabled={isDisabled}
            onClick={() => {
              if (shouldShowPicker) {
                onClose()
                return
              }

              onOpen()
            }}
          >
            <PiTable size={16} />
          </ButtonWithTooltip>
        </Box>
      </PopoverTrigger>

      <Portal>
        <PopoverContent
          maxWidth="170px"
          borderColor="primary1.6"
          borderWidth="2px"
          borderRadius="10px"
          zIndex={20}
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
        >
          <PopoverArrow borderColor="primary1.6" />
          <PopoverBody padding={3}>
            <VStack spacing={2}>
              <VStack spacing="0px" _hover={{ cursor: 'pointer' }}>
                {tableBoxes.map((row, rowIndex) => (
                  <HStack key={rowIndex} spacing="0px">
                    {row.map((_, columnIndex) => (
                      <Box
                        key={columnIndex}
                        padding="3px"
                        onMouseEnter={() => setCurrentPosition({ row: rowIndex, column: columnIndex })}
                        onClick={() => handleTableCreate({ row: rowIndex, column: columnIndex })}
                      >
                        <Box
                          height="20px"
                          width="20px"
                          borderRadius="4px"
                          backgroundColor={
                            rowIndex <= currentPosition.row && columnIndex <= currentPosition.column
                              ? selectedCellColor
                              : unselectedCellColor
                          }
                          transition="background-color 0.1s ease-in-out"
                        />
                      </Box>
                    ))}
                  </HStack>
                ))}
              </VStack>
              <Body size="sm" medium>{`${currentPosition.row + 1}X${currentPosition.column + 1}`}</Body>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

/** Text alignment controls restored to the markdown toolbar (left, center, right). */
export const MdxTextAlignmentButtons = () => {
  const isReadOnly = useCellValue(readOnly$)
  const rootEditor = useCellValue(rootEditor$)
  const editorInFocus = useCellValue(editorInFocus$)

  const applyAlignment = (alignment: 'left' | 'center' | 'right') => {
    const editor = getFocusedEditor(editorInFocus?.editorRef, rootEditor)

    if (!editor || isReadOnly) {
      return
    }

    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment)
  }

  return (
    <>
      <ButtonWithTooltip
        title={t('Align left')}
        aria-label={t('Align left')}
        disabled={isReadOnly}
        onClick={() => applyAlignment('left')}
      >
        <PiTextAlignLeft size={16} />
      </ButtonWithTooltip>
      <ButtonWithTooltip
        title={t('Align center')}
        aria-label={t('Align center')}
        disabled={isReadOnly}
        onClick={() => applyAlignment('center')}
      >
        <PiTextAlignCenter size={16} />
      </ButtonWithTooltip>
      <ButtonWithTooltip
        title={t('Align right')}
        aria-label={t('Align right')}
        disabled={isReadOnly}
        onClick={() => applyAlignment('right')}
      >
        <PiTextAlignRight size={16} />
      </ButtonWithTooltip>
    </>
  )
}
